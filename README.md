# F.A.S.T: Futuristic AI Society of Tech

Official website for the F.A.S.T (Futuristic AI Society of Tech) club at SRMIST Kattankulathur. The site is built with React, Tailwind, and Framer Motion, with a lightweight Node/Express backend for live endpoints.

**Live:** https://f-a-s-t-website-one.vercel.app

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
Copy `.env.example` to `.env` and fill in your own values. `.env` is gitignored and must
never be committed.
```
cp .env.example .env
```

| Variable | Used by | Purpose |
|---|---|---|
| `GNEWS_API_KEY` | `server/index.js` only | GNews API key for `/api/news`, kept server-side |
| `PORT` | `server/index.js` | backend port (default 5174) |
| `VITE_API_BASE` | frontend | URL of the backend |

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

## License
MIT for the code (see `LICENSE`). Photos, logos and other media in `public/assets` are not covered.
