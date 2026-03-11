# FAST Backend (High-Level)

This is a lightweight Express backend that supports:

- `GET /api/health` - health check
- `GET /api/news` - proxy GNews (requires `GNEWS_API_KEY`)
- `GET /api/questions` - interview questions
- `POST /api/contact` - stub contact endpoint
- `POST /api/run/python` - placeholder for Python execution

## Environment

Create a `.env` file at the project root (or export variables in your host):

```
GNEWS_API_KEY=your_gnews_key_here
PORT=5174
```

## Run

From the project root:

```
npm install
npm run dev:server
```

This starts the backend on `http://localhost:5174`.

## Frontend integration

Use `VITE_API_BASE=http://localhost:5174` in your frontend `.env`
to point the React app at this backend.
