# Entrestate — Master Ecosystem
_Last updated: 2025-10-22 14:14 UTC_

**This is the one full source**. Frontend (Next.js) + API stubs + Firebase rules + Python backend in `/backend`.

## Frontend
```bash
cp ops/.env.sample .env
npm install
npm run dev
```

## Backend (optional)
```bash
cd backend
cp ../ops/.env.sample .env
python3 -m pip install -r requirements.txt
make run-flow
```
Artifacts land in `export/` at repo root.
