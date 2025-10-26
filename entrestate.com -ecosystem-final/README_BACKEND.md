# Entrestate Backend Execution Layer (Jobs + Flows)

This repo now includes a **no-UI-change** backend runner with a Job Planner, Executor, and sample Flows.

## Quickstart
```bash
make install
make jobs-list
make run-flow   # runs flows/flow.yml -> enrich -> valuate -> export
```

Artifacts land in `export/` (e.g., `projects.json`, `valuations.json`, `snapshot_manifest.json`).

See `GEMINIATION.md` and `TODO-GEMINI.md` for the broader plan.

## Enable Gemini (optional)
1. `cp ops/.env.sample .env` and set `GEMINI_API_KEY`.
2. `make install`
3. `make run-flow` (the enrich step will call Gemini if the key is present).
