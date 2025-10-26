# Entrestate Ecosystem — Geminiation Plan
_Last updated: 2025-10-22 02:33 UTC_

This document lays out a **Gemini-powered system plan** for the Entrestate Ecosystem—covering agents, flows, prompts, datasets, evaluation, and CI/CD. It is designed to be **UI-agnostic** (no UI changes required) and can run purely as services, cron jobs, or CLI tasks behind the current repo.

---

## 1) Objectives

1. **Market Intelligence**: ingest Dubai/GCC real-estate data (developers, projects, units, payments, handovers, laws) into a normalized Knowledge Graph.
2. **Agentic Workflows**: Gemini-driven multi-agent flows for: listing enrichment, pricing intel, project summaries, buyer profiling, and lead-routing.
3. **Actionable Outputs**: JSON/CSV/Markdown deliverables the existing UI can read, without changing UI code.
4. **Evaluation & Guardrails**: automatic scoring for factuality, provenance, and safe outputs.
5. **Repeatable Ops**: cron + CI pipelines so daily refreshes just work.

---

## 2) System Topology

```
data_sources/               # raw pulls (CSV, JSON, HTML snapshots, API dumps)
  ├─ portals/               # Bayut, PropertyFinder, DXBInteract (respect ToS, caching only)
  ├─ gov/                   # DLD, RERA bulletins, fees, regulations
  └─ social/                # optional: dev posts, PRs, X/LinkedIn project news

kg/                         # knowledge graph assembled outputs
  ├─ nodes/                 # developers, projects, units, locations
  ├─ edges/                 # relations: dev→project, project→unit, unit→price
  └─ views/                 # denormalized query-friendly projections

agents/
  ├─ enricher/              # text normalizer + Gemini function-calls → structured fields
  ├─ summarizer/            # project/area one-pagers (md + json)
  ├─ valuer/                # pricing intelligence & comps
  ├─ router/                # lead scoring + assignment rules
  └─ auditor/               # policy, hallucination, PII/PHI guardrails

flows/
  ├─ nightly_etl.py         # scheduled ETL: fetch → clean → KG build
  ├─ enrich_pipeline.py     # batch calls to enricher + summarizer
  ├─ valuation_job.py       # comps, ROI, rent yield
  ├─ lead_router_job.py     # assigns leads via rules/LLM scores
  └─ export_snapshots.py    # JSON/CSV/MD exports for the current UI

eval/
  ├─ truthbench.jsonl       # Q/A with gold answers, references
  ├─ scorecards.py          # metrics: factuality, coverage, latency, cost
  └─ regression_tests.py    # freeze bugs; stop quality drift

ops/
  ├─ .env.sample            # GEMINI_API_KEY, DATA_KEYS, REDIS_URL, etc.
  ├─ cron.md                # crontab examples / Cloud Scheduler
  ├─ Makefile               # make etl / enrich / valuate / export / eval
  └─ ci.yml                 # GitHub Actions: run tests & exports on push to main
```

> **No UI changes**: files in `export/` mirror existing UI contracts (same shapes/paths). UI simply reads newer snapshots.

---

## 3) Data Contracts (stable)

- `export/projects.json`: canonical projects with normalized fields:
  ```json
  {
    "project_id": "skygate-tower",
    "name": "SkyGate Tower",
    "developer": "Tiger",
    "area": "JVT, Dubai",
    "status": "off-plan",
    "price_from_aed": 638888,
    "handover_year": 2028,
    "bedrooms": ["ST", "1BR", "2BR", "3BR"],
    "payment_plan": { "on_booking": 10, "during": 50, "on_handover": 40 },
    "sources": ["dxboffplan"],
    "last_updated": "2025-10-06"
  }
  ```

- `export/summaries/{project_id}.md`: human-friendly project brief (sources embedded).
- `export/areas/{slug}.json`: area snapshots (avg prices, supply, absorption).
- `export/valuations/{project_id}.json`: comparables & rent-yield math.
- `export/leads/assignments.json`: broker/agent routing output.

> These exports are additive; the UI can keep reading them as-is.

---

## 4) Agents (Gemini)

### 4.1 Enricher
- **Goal**: turn semi-structured pages into clean JSON using function-calling.
- **Inputs**: raw HTML/markdown; existing messy JSON.
- **Outputs**: normalized `projects.json` rows + diffs when fields change.
- **Guardrails**: do not fabricate prices or dates; if uncertain → `null` + `evidence`.

### 4.2 Summarizer
- **Goal**: create crisp briefs for each project/area.
- **Templates**: `prompts/summarizer_system.txt`, `prompts/summarizer_user.txt`.
- **Outputs**: `export/summaries/*.md` with bullet “highlights” + “why it matters”.

### 4.3 Valuer
- **Goal**: compute simple comps & indicative yields (non-advisory).
- **Sources**: KG + public comps (cached), currency AED.
- **Outputs**: price bands, rent yields, ROI scenarios JSON.

### 4.4 Router
- **Goal**: route each lead to best-fit agent (language, area, project expertise).
- **Signals**: user intent, budget, timeframe, nationality, channel.
- **Outputs**: `export/leads/assignments.json` (append-only).

### 4.5 Auditor
- **Goal**: check for policy violations, hallucinations, missing citations.
- **Outputs**: `eval/audit_reports/*.json` and fail CI if score < threshold.

---

## 5) Prompt Pack (minimal, versioned)

```
prompts/
  ├─ enricher_system.txt
  ├─ enricher_user.txt
  ├─ summarizer_system.txt
  ├─ summarizer_user.txt
  ├─ valuer_system.txt
  ├─ valuer_user.txt
  └─ router_system.txt
```

Each prompt contains: role, tone, JSON schema, refusal rules, and citation style.

---

## 6) Jobs & Make Targets

- `make etl` → pull/update `data_sources/*` and rebuild `kg/*`
- `make enrich` → run Enricher on new/changed items
- `make valuate` → run Valuer for projects missing valuations
- `make export` → write to `export/*` snapshots
- `make eval` → run regression + auditor checks

> Use `ops/cron.md` for daily schedules.

---

## 7) Storage & Caching

- **Local**: `/data` mounted volume or repo `/cache` (gitignored)
- **Remote options**: GCS bucket `entrestate-snapshots/` (versioned), Redis for memoization
- **Keys**: `.env` with `GEMINI_API_KEY=...` etc.

---

## 8) CI/CD (GitHub Actions)

- On push to `main`:
  1. Install deps
  2. Lint & type-check
  3. Run `make etl enrich valuate export eval`
  4. Upload `export/*` as an artifact
  5. If eval < threshold → fail build

---

## 9) Governance & Safety

- **Attribution-first**: every field with uncertainty carries `sources` and `confidence`.
- **No financial advice**: all outputs tagged “informational”.
- **Privacy**: PII scrubbing in Auditor; no private leads in public artifacts.

---

## 10) Minimal Tech Stack

- Python 3.11 (ETL + flows)\1- `google-generativeai` (Gemini), `requests`, `beautifulsoup4`, `pydantic`, `pandas`, `networkx`\1- Optional: `redis`, `duckdb`, `polars`\1- Makefile + GitHub Actions CI

---

## 11) Quickstart

1. `cp ops/.env.sample .env` and add keys.\12. `make etl enrich export` to produce `export/*`.\13. Point the current UI to these snapshot paths (no code change needed).
