const express = require('express');
const cors = require('cors');
const path = require('path');
const Database = require('better-sqlite3');

const app = express();
const PORT = process.env.PORT || 3000;
const db = new Database(path.join(__dirname, 'careertrack.db'));

db.exec(`CREATE TABLE IF NOT EXISTS applications (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 company TEXT NOT NULL,
 role TEXT NOT NULL,
 location TEXT DEFAULT '',
 type TEXT DEFAULT 'Full-time',
 status TEXT DEFAULT 'Applied',
 salary TEXT DEFAULT '',
 applied_date TEXT NOT NULL,
 notes TEXT DEFAULT '',
 created_at TEXT DEFAULT CURRENT_TIMESTAMP
)`);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/applications', (req, res) => {
 const rows = db.prepare('SELECT * FROM applications ORDER BY applied_date DESC, id DESC').all();
 res.json(rows);
});

app.get('/api/stats', (req, res) => {
 const total = db.prepare('SELECT COUNT(*) c FROM applications').get().c;
 const interviews = db.prepare("SELECT COUNT(*) c FROM applications WHERE status='Interview'").get().c;
 const offers = db.prepare("SELECT COUNT(*) c FROM applications WHERE status='Offer'").get().c;
 const rejected = db.prepare("SELECT COUNT(*) c FROM applications WHERE status='Rejected'").get().c;
 const pending = db.prepare("SELECT COUNT(*) c FROM applications WHERE status IN ('Applied','Screening')").get().c;
 res.json({ total, interviews, offers, rejected, pending });
});

app.post('/api/applications', (req, res) => {
 const { company, role, location, type, status, salary, applied_date, notes } = req.body;
 if (!company || !role || !applied_date) return res.status(400).json({ error: 'Company, role and date are required.' });
 const result = db.prepare(`INSERT INTO applications (company,role,location,type,status,salary,applied_date,notes) VALUES (?,?,?,?,?,?,?,?)`)
  .run(company, role, location || '', type || 'Full-time', status || 'Applied', salary || '', applied_date, notes || '');
 res.status(201).json(db.prepare('SELECT * FROM applications WHERE id=?').get(result.lastInsertRowid));
});

app.patch('/api/applications/:id', (req, res) => {
 const allowed = ['company','role','location','type','status','salary','applied_date','notes'];
 const current = db.prepare('SELECT * FROM applications WHERE id=?').get(req.params.id);
 if (!current) return res.status(404).json({ error: 'Application not found.' });
 const next = { ...current };
 for (const key of allowed) if (req.body[key] !== undefined) next[key] = req.body[key];
 db.prepare(`UPDATE applications SET company=?,role=?,location=?,type=?,status=?,salary=?,applied_date=?,notes=? WHERE id=?`)
  .run(next.company,next.role,next.location,next.type,next.status,next.salary,next.applied_date,next.notes,next.id);
 res.json(next);
});

app.delete('/api/applications/:id', (req, res) => {
 const result = db.prepare('DELETE FROM applications WHERE id=?').run(req.params.id);
 if (!result.changes) return res.status(404).json({ error: 'Application not found.' });
 res.status(204).end();
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.listen(PORT, () => console.log(`CareerTrack running at http://localhost:${PORT}`));
