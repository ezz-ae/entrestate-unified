# PLACEHOLDERS & GAPS — Execution Tracker

This file lists all **placeholder content** or **incomplete flows** to finish.

## UI — Public Area
- [ ] `/solutions/[slug]`: sections scaffolded (Overview, Outcomes, How it works); populate real suite content.
- [ ] `/academy` + `/academy/[slug]`: connect to content source (Firestore or MDX); add categories & search.
- [ ] `/flows` + `/flows/[slug]`: list real flows from Firestore or `/backend/flows`; add “Run” button binding.

## UI — Workspace
- [ ] `/me`: real dashboard cards (active jobs, leads, notifications). Bind to `users/{uid}/jobs` in Firestore.
- [ ] `/me/flows`: list & run flows; subscribe to job status via Firestore.
- [ ] `/me/gem`: planner view (plan JSON, replay); usage & cost cards.
- [ ] `/me/dev`: connectors health, secrets checker, logs viewer.
- [ ] `/me/appstore`: install/uninstall toggles write to `users/{uid}/apps/{toolId}` and update sidebar.
- [ ] Suite pages (Listing Portal, Meta Intelligence): wire to APIs & Firestore docs.

## API — Stubs to Implement
- [ ] `POST /api/flows/execute`: call `/backend` runner (subprocess or queue) and write a `job` doc.
- [ ] `POST /api/pdf`: implement renderer worker; save to Storage; return signed URL.
- [ ] `GET /api/search`: add fast/smart/deep modes; connect to data layer.
- [ ] `GET /api/wa/webhook` + `POST /api/wa/send`: finish WA integration & auth mapping.

## Backend (Python)
- [ ] Replace stubs in `backend/agents/*` with production logic (or Vertex/Gemini).
- [ ] Add persistence: write results into Firestore (`users/{uid}/jobs/*`, `projects_catalog/*`).
- [ ] Add queue (Cloud Tasks / PubSub) for async job runs.
- [ ] Extend flows: ingestion (Bayut/PF), analysis, PDF generation, delivery.

## Firebase
- [ ] Choose hosting option and set **rewrites** (see `DEPLOYMENT_GUIDE.md`).
- [ ] Add Storage rules + PDF bucket path; connect to UI for downloads.

## Testing & QA
- [ ] Unit tests for `/api/*` and backend jobs.
- [ ] E2E: WhatsMAP → Plan → PDF → Deliver.
- [ ] Performance checks for Firestore queries.
