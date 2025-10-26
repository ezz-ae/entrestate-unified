# feature/whatsmap-workers (Scaffold)

Adds:
- Firebase Functions Gen2 worker processing `users/{uid}/jobs/{jobId}`
- Step implementations (stubs): searchProjects, analyzeMetrics, generatePDF, deliver, etc.
- Gemini planner example (`src/server/whatsmap/plan.gemini.ts`)

## Install
1) Copy `functions/` into your repo root (or merge with existing).
2) `cd functions && npm i && npm run build`
3) Deploy worker: `firebase deploy --only functions`

## Use
- Your Next `/api/whatsmap` should create a job doc with `plan.steps[]`.
- The worker executes steps in order, updates progress, and writes `result`.

## Extend
- Replace stubs with real implementations (Genkit/Gemini, Meta Marketing API, PDF generation).
- Add secrets via Firebase/Cloud Functions env or Secret Manager.
