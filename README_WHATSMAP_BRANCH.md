# feature/whatsmap-brain-live (Scaffold)

This branch adds:
- `/api/whatsmap` (planner endpoint -> creates jobId)
- `/api/wa/webhook` + `/api/wa/send` (WhatsApp Cloud API stubs)
- `src/server/whatsmap/plan.ts` (replace rules with Gemini schema call)
- `firestore.rules` + `firestore.indexes.json` (owner-only + jobs/assets indexes)
- `.env.local.example` + `server.env.example`

## How to use
1) Copy files into your repo root (keep folder structure).
2) Fill `.env.local` (Firebase) and set server secrets via Secret Manager.
3) `firebase deploy --only firestore:rules,firestore:indexes`
4) Start dev: `npm run dev`
5) POST `/api/whatsmap` with `{ text, uid }` from the WhatsMAP page.
6) Subscribe to `users/{uid}/jobs/{jobId}` to show progress.

## Next steps
- Build workers (Functions/Run) that read new jobs and execute `steps[]`.
- Replace planner heuristics with a Gemini call constrained by JSON schema.
- Wire `/whatsmap` page UI to use structured widgets (no free-text for actions).
