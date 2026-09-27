# BrainScan AI — AI-Based Brain MRI Analysis and Tumor Detection System

Final-year college project. A web application that lets patients upload brain MRI
scans, get an AI-generated tumor classification (Glioma / Meningioma / Pituitary
Tumor / No Tumor) with a confidence score and Grad-CAM heatmap, and lets doctors
review results and generate reports.

> ⚠️ Academic/research prototype. Not a medical diagnostic tool.

## Team

- **Web Development (3 members):** React frontend, Node/Express backend, MongoDB
- **AI/ML (2 members):** MRI classification model, served via a Python FastAPI service

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React.js + Vite |
| Backend | Node.js + Express.js |
| Database | MongoDB (Atlas) |
| Auth | JWT + bcrypt |
| AI Service | Python FastAPI (separate folder, built by AI/ML team) |

## Project Structure

```
brain-tumor-detection/
├── frontend/     # React + Vite app
├── backend/      # Node.js + Express API
├── ai-service/   # FastAPI AI service (AI/ML team)
├── docs/
└── README.md
```

## Getting Started (for every team member)

### 1. Clone the repo

```bash
git clone <repo-url>
cd brain-tumor-detection
```

### 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Now open `backend/.env` and fill in:

- `MONGO_URI` — ask a teammate for the shared Atlas connection string (or use your own DB user credentials on the shared cluster)
- `JWT_SECRET` — must be the **same value for everyone on the team**, ask whoever set it up first
- `SETUP_KEY` — temporary key for creating doctor/admin test accounts; same rule, get it from the team
- `PORT` — default `5000`, change only if that port is already in use on your machine (e.g. macOS AirPlay Receiver conflicts — see Troubleshooting below)
- `NODE_ENV` — keep as `development` locally

```bash
npm run dev
```

You should see `MongoDB connected` and `Server running on port 5000` in your terminal.

### 3. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env
```

Make sure `VITE_API_URL` in `frontend/.env` matches your backend's port (e.g. `http://localhost:5000/api`).

```bash
npm run dev
```

Open the URL Vite gives you (usually `http://localhost:5173`).

### 4. Create test accounts

- **Patient:** just use the Register page in the app.
- **Doctor / Admin:** use the temporary bootstrap endpoint (development only):

  ```
  POST http://localhost:5000/api/auth/create-staff
  ```
  ```json
  {
    "name": "Your Name",
    "email": "you@example.com",
    "password": "yourpassword",
    "role": "doctor",
    "setupKey": "<the shared SETUP_KEY value>"
  }
  ```

  Once at least one admin account exists, prefer creating further doctor accounts through the **Admin Dashboard → Doctors → Add Doctor** form in the app instead.

## Troubleshooting

- **"Access to localhost was denied" / 403 on port 5000 (Mac only):** macOS's AirPlay Receiver uses port 5000 by default. Either disable it in System Settings → General → AirDrop & Handoff, or change `PORT` in `backend/.env` (and `VITE_API_URL` in `frontend/.env` to match).
- **CORS errors in the browser console:** usually means the backend isn't actually running, or `CLIENT_URL` in `backend/.env` doesn't match the port your frontend is running on.
- **"No routes matched location" in console:** your local `AppRoutes.jsx` is out of date — pull the latest changes.
- **MongoDB connection fails:** check `MONGO_URI` is correct and your IP is allowed in Atlas under Network Access.

## Status

🚧 Under active development. Web app (auth, patient/doctor/admin dashboards, MRI upload,
mock AI analysis, reports) is functional. Pending: real AI model integration (replacing
the mock analysis service) once the AI/ML team's FastAPI service is ready.
