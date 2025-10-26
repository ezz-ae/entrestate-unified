# Entrestate Ecosystem — TODO (No-UI Changes)
_Last updated: 2025-10-22 02:33 UTC_

This is the **execution checklist** to Gemini‑enable the ecosystem without touching UI code.

## Phase 0 — Repo Hygiene

## Phase 1 — Data & KG

## Phase 2 — Enricher (Gemini)

## Phase 3 — Summarizer & Valuer

## Phase 4 — Lead Router

## Phase 5 — Evaluation & Guardrails

## Phase 6 — Ops & CI

## Phase 7 — Hand-off

## Next Steps
- [ ] Implement real ETL for data_sources/ with caching + ToS compliance
- [ ] Add Auditor agent + evaluation scorecards (`eval/`)
- [ ] Add CI workflow `.github/workflows/ci.yml` to run full pipeline on push
- [ ] Expand prompt pack for summarizer and valuer; wire optional Gemini calls
- [ ] Produce first real snapshots and validate UI reads them unchanged
