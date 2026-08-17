# CareerTrack — Full-Stack Job Application Tracker

CareerTrack is a responsive full-stack web application for managing job applications from one dashboard. It demonstrates REST API design, CRUD operations, relational data persistence, filtering, status workflows and responsive frontend development.

## Features
- Add, view, update and delete job applications
- Application status workflow: Applied → Screening → Interview → Offer / Rejected
- Dashboard metrics for total applications, interviews, pending applications and offers
- Search by company or role
- Filter by application type and status
- Salary, location, notes and application-date tracking
- Responsive UI for desktop and mobile
- SQLite persistence with a clean REST API

## Tech Stack
**Frontend:** HTML5, CSS3, Vanilla JavaScript, Fetch API

**Backend:** Node.js, Express.js, REST APIs

**Database:** SQLite with better-sqlite3

**Tools:** Git, GitHub, npm

## Architecture
```text
Browser (HTML/CSS/JS)
        ↓ Fetch API
Express REST API (Node.js)
        ↓ SQL
SQLite Database
```

## API Endpoints
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/applications` | List applications |
| GET | `/api/stats` | Dashboard statistics |
| POST | `/api/applications` | Create application |
| PATCH | `/api/applications/:id` | Update application |
| DELETE | `/api/applications/:id` | Delete application |

## Run Locally
```bash
cd careertrack
npm install
npm start
```
Open `http://localhost:3000`.

For development:
```bash
npm run dev
```

## Resume Description
**CareerTrack — Full-Stack Job Application Tracker**  
Built a responsive full-stack job tracking application using Node.js, Express.js, JavaScript and SQLite. Implemented RESTful CRUD APIs, relational data persistence, dashboard analytics, search/filter functionality and a responsive UI.

## Interview Talking Points
1. **Why Express?** It provides a lightweight way to build REST APIs and middleware in Node.js.
2. **Why SQLite?** It is simple, serverless and reliable for a small-to-medium portfolio application.
3. **How does CRUD work?** The frontend calls POST, GET, PATCH and DELETE endpoints; the backend validates requests and executes SQL queries.
4. **How is data persisted?** SQLite stores records in `careertrack.db`, so data remains after restarting the server.
5. **How is the UI connected to the backend?** Vanilla JavaScript uses the Fetch API to call REST endpoints and updates the DOM with returned JSON.
6. **What would you add next?** Authentication, PostgreSQL, role-based access, deployment, automated tests and a React frontend.
