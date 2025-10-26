# Entrestate — System Docs (Unified)
_Last updated: 2025-10-22 02:33 UTC_

This document is the **single entry point** to understand and operate the Entrestate backend (no UI changes required).

## Contents
- Overview
- Directory Map
- Runtime (Jobs + Flows)
- Data Contracts (Exports)
- Gemini Integration
- Evaluation & Guardrails
- Operations (Make targets, Env, CI)
- Roadmap (TODO)

## Overview
Entrestate maintains a **UI-agnostic backend** that produces versioned snapshots in `export/`. The UI reads these as-is. The backend uses a simple **Job framework** (`src/jobs`) to run steps for enrichment, valuation, and export. Gemini can be enabled via environment keys but the system runs in a mock-safe mode without keys.

## Directory Map
```
src/jobs/            # planner + executor + CLI
flows/               # job implementations + flow.yml
providers/           # gemini client (optional)
agents/              # lightweight business logic stubs
prompts/             # prompt pack for LLM agents
data_sources/        # raw inputs (user-provided or ETL outputs)
kg/                  # assembled knowledge graph (optional)
export/              # final artifacts (JSON/MD) read by the UI
ops/                 # .env.sample and ops guides
docs/                # auxiliary docs (if any)
```
See also: `GEMINIATION.md` (architecture) and `README_BACKEND.md` (quickstart).

## Runtime (Jobs + Flows)
**Run a full pipeline**:
```bash
make install
make run-flow        # uses flows/flow.yml
```
Jobs included:
- `enrich_projects` → normalize/enrich seed projects → `export/projects.json`
- `valuate_projects` → compute indicative yields → `export/valuations.json`
- `export_snapshots` → bundle manifest → `export/snapshot_manifest.json`

Reports: `export/last_run_report.json`

## Data Contracts (Exports)
- `export/projects.json` — array of projects with stable fields
- `export/valuations.json` — array of valuation per project
- `export/snapshot_manifest.json` — list of produced artifacts

## Gemini Integration
Optional via `providers/gemini.py`:
- Set `GEMINI_API_KEY` and `GEMINI_MODEL` in `.env`.
- Enrichment steps will call Gemini to extract structured JSON. Without keys, the system runs in mock mode.

## Evaluation & Guardrails
- Prepare `eval/truthbench.jsonl` and scoring scripts in `eval/`.
- Add Auditor checks (PII, hallucination risk, citations) before exporting snapshots.

## Operations
- `.env`: copied from `ops/.env.sample`.\1- `make` targets: `jobs-list`, `run-job <name>`, `run-flow`.
- CI: add `.github/workflows/ci.yml` to run pipeline and attach `export/` as an artifact.

## Roadmap (TODO)
- Replace stubs with production ETL for `data_sources/` and `kg/`.
- Expand prompt pack to include summarizer/valuer policies.
- Implement Auditor & evaluation metrics; gate releases on score thresholds.
- Schedule nightly runs (cron / Cloud Scheduler).
- Add area-level and developer-level rollups.
