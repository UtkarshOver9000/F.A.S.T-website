# F.A.S.T — Futuristic AI Society of Tech

Official website for the F.A.S.T (Futuristic AI Society of Tech) club at SRMIST Kattankulathur. The site is built with React, Tailwind, and Framer Motion, with a lightweight Node/Express backend for live endpoints.

## Stack
- React + Vite
- TailwindCSS
- Framer Motion
- Node.js + Express (backend)

## Local Setup
### 1) Install dependencies
```bash
npm install
```

### 2) Run frontend (Vite)
```bash
npm run dev
```

### 3) Run backend (Express)
```bash
npm run dev:server
```

The frontend runs at `http://localhost:5173` and the backend at `http://localhost:5174`.

## Environment Variables
Create a `.env` in the project root:
```
VITE_API_BASE=http://localhost:5174
GNEWS_API_KEY=your_gnews_key
```

## Backend Endpoints
- `GET /api/health` — health check
- `GET /api/news` — GNews proxy
- `GET /api/questions` — interview questions
- `POST /api/chat` — chat stub
- `POST /api/query` — query form stub
- `POST /api/contact` — contact form stub
- `POST /api/run/python` — placeholder for a sandboxed Python runner

## Deployment
### Frontend (Static)
Build and deploy on any static host:
```bash
npm run build
```

### Backend
Deploy `server/index.js` to any Node hosting (Render, Railway, Fly.io, etc).  
Set environment variables on the host:
```
GNEWS_API_KEY=your_gnews_key
PORT=5174
```

Then update your frontend `.env` to point at the deployed backend:
```
VITE_API_BASE=https://your-backend-domain
```

## Notes
- The live code editor runs locally in the browser and does not execute Python.
- Add a secure sandbox backend if you want real Python execution.
