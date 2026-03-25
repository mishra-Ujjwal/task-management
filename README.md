Live Demo:https://assignment-wb26.onrender.com/

Demo Credentials:
Email: ujjwal@gmail.com 
Password: ujjwaltask

# Task Management System

A full-stack Task Tracker built with **React**, **Node.js + Express**, and **MongoDB**.

---

## Project Structure

```
taskflow/
├── backend/          # Express API
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
└── frontend/         # React App
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── hooks/
    │   ├── pages/
    │   └── utils/
    └── package.json
```

---

## Features

### Core
- JWT-based Authentication (Signup / Login)
- Full CRUD for Tasks (Create, Read, Update, Delete)
- Task fields: Title, Description, Status, Priority, Due Date
- Mark task as complete (toggle)
- Filter by status & priority
- Search by title
- Analytics dashboard (total, completed, pending, in-progress, overdue, completion %)

### Bonus
- Pagination (8 tasks per page)
- Sorting (by created date, due date, priority, title) with asc/desc toggle
- Fully responsive design (mobile-first)
- Global error handling middleware
- Optimized MongoDB indexes

---

## Setup

### Prerequisites
- Node.js v16+
- MongoDB running locally (or MongoDB Atlas URI)

---

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your values
npm run dev
```

**`.env` file:**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskflow
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d
```

Backend runs on: `http://localhost:5000`

---

### 2. Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs on: `http://localhost:3000`

> The frontend proxies API calls to `http://localhost:5000` via `package.json` `"proxy"` field.

---

## API Reference

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get current user |

### Tasks (all require Bearer token)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get tasks (supports filters, sort, pagination) |
| POST | `/api/tasks` | Create task |
| GET | `/api/tasks/:id` | Get single task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |
| PATCH | `/api/tasks/:id/complete` | Toggle complete |

**GET /api/tasks query params:**
- `status` — `todo` | `in-progress` | `done`
- `priority` — `low` | `medium` | `high`
- `search` — search by title
- `sortBy` — `createdAt` | `dueDate` | `priority` | `title`
- `order` — `asc` | `desc`
- `page` — page number (default 1)
- `limit` — items per page (default 8, max 50)

### Analytics (requires Bearer token)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/analytics` | Get task analytics |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6, Axios, CSS Modules |
| Backend | Node.js, Express 4 |
| Database | MongoDB with Mongoose |
| Auth | JWT + bcryptjs |
| Validation | express-validator |
