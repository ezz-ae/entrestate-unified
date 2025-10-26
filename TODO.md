# ✅ ENTRESTATE — MASTER BUILD PLAN (PHASED)

Entrestate is the AI-Native Operating System for Real Estate.  
This document defines every required step to reach full production status, organized by build phase.

---

## 🩵 PHASE 1 — FOUNDATION (CLOUD + FIREBASE + AI CORE)

### 1.1 Firebase & Cloud Setup
- [ ] Connect Firebase project to repo (`firebase.json`, `firestore.rules`, `apphosting.yaml`).
- [ ] Deploy core structure:
  - `users/{uid}` (profile, brandKit, workspace)
  - `projects_catalog` (public listings)
  - `jobs`, `assets`, `flows`, `marketData`
- [ ] Set up Storage paths with correct permissions.
- [ ] Enable Firestore security rules:
  - Private: `users/{uid}/**`
  - Public: `projects_catalog/**`
  - Readonly: `marketData/**`
- [ ] Add scheduled Functions for data sync, email, WhatsApp updates.

**Acceptance (P1.1)**
- [ ] `firebase deploy --only firestore:rules,firestore:indexes` succeeds.
- [ ] CollectionGroup indexes for `jobs` & `assets` in place.
- [ ] Storage rules block cross-user reads.

### 1.2 AI Core Integration (Gemini + Vertex)
- [ ] Connect Genkit flows (`src/ai/flows`).
- [ ] Verify connection to Gemini models.
- [ ] Test AI runtime: text → flow → response.
- [ ] Create `ai-core-checker` function to verify keys and models (gemini-pro, vision, text-embedding).
- [ ] Deploy Firestore triggers for AI job orchestration.

**Acceptance (P1.2)**
- [ ] `ai-core-checker` endpoint returns ✅ for all models.
- [ ] A sample flow in `src/ai/flows` runs end-to-end locally.

### 1.3 GEM (AI Orchestration Engine)
- [ ] Implement GEM (system brain) at `src/server/gem/`:
  - `intent/` (extract intent/entities)
  - `planner/` (flow planning)
  - `executor/` (job writer)
  - `telemetry/` (usage + cost)
- [ ] GEM handles:
  - Natural language → flow mapping
  - Dynamic parameter injection from brandKit/workspace
- [ ] Add control interface `/me/gem` to show:
  - Running tasks
  - Pending flows
  - AI resource usage
  - Connected agents (Meta, WhatsApp, Search, Cloud)

### 1.4 CODE CHECK — GEM & DEV (baseline)
- [ ] GEM folder exists: `src/server/gem/*` (intent, planner, executor, telemetry).
- [ ] DEV panel shell exists: `src/app/me/dev/page.tsx`.
- [ ] Shared types: `src/lib/types/flows.ts`, `src/lib/types/jobs.ts` (used by both GEM & DEV).
- [ ] Logs use a single helper: `src/server/log.ts` (jobId, toolId, model, tokens).

**Acceptance (P1.3–1.4)**
- [ ] `/me/gem` loads and lists last 10 jobs from `users/{uid}/jobs`.
- [ ] A dry-run intent (“health check”) returns a **plan JSON** without executing.

---

## 💬 PHASE 2 — WHATSMAP (CONVERSATIONAL CONTROL BRAIN)

### 2.1 Web Interface
- [ ] `/whatsmap` page (conversation + action widgets).
- [ ] Modular UI components:
  - Quick action cards
  - Project / Developer selectors
  - PDF viewer
- [ ] Display AI job progress via Firestore subscription.

**Acceptance (P2.1)**
- [ ] Typing “Compare X and Y → PDF” creates a job and shows a progress timeline.
- [ ] Result PDF preview renders in-page.

### 2.2 WhatsApp Integration
- [ ] `/api/wa/webhook` (GET verify + POST inbound).
- [ ] `/api/wa/send` (templates/media).
- [ ] Map phone → user UID.
- [ ] Auto-create “agent session” per new WhatsApp number.
- [ ] Full WhatsMAP chat → job creation pipeline.

**Acceptance (P2.2)**
- [ ] Inbound WA text generates a job; outbound reply (template or link) succeeds.
- [ ] `users/{uid}/conversations/*` stores in/out messages.

### 2.3 GEM <-> WhatsMAP Bridge
- [ ] `plan.gemini.ts` converts WhatsMAP text → flow:
  - “Compare Emaar and Sobha → PDF” → `searchProjects`, `analyze`, `generatePDF`.
- [ ] Step tracking + replay for user debugging.
- [ ] Store chat history in `users/{uid}/conversations`.

**Acceptance (P2.3)**
- [ ] Same intent on web or WA yields the **same** plan & steps.

---

## ☁️ PHASE 3 — ENTRESTATE CLOUD (DATA INTELLIGENCE)

### 3.1 Data Ingestion
- [ ] Ingestion function(s) for portals, ads, social.
- [ ] Vertex AI Search or BigQuery indexing.
- [ ] Segmentation:
  - Trusted portals
  - Developer announcements
  - Social media signals
- [ ] Source lineage stored per item.

**Acceptance (P3.1)**
- [ ] Nightly job increases/updates `projects_catalog` with lineage + quality score.

### 3.2 Market Library
- [ ] `/api/search?mode=fast|smart|deep`
- [ ] Fast → keyword search.
- [ ] Smart → Gemini interpretation to structured filters.
- [ ] Deep → predictive / historical analysis.
- [ ] Expose to WhatsMAP + Cloud dashboards.

**Acceptance (P3.2)**
- [ ] One query surfaces all 3 modes and returns consistent entities.

### 3.3 Cloud Dashboards
- [ ] Market Overview (transactions, dev trends)
- [ ] Project Pipeline (Soon / Now / Delivering)
- [ ] Developer Reputation Index (AI-scored)
- [ ] Data Quality Graph (validator)

**Acceptance (P3.3)**
- [ ] Each card loads from Firestore/BigQuery with real numbers.

---

## 🧠 PHASE 4 — DASHBOARDS (DEV / GEM CONTROL)

### 4.1 DEV Panel (Admin Intelligence) — `/me/dev`
- [ ] **Connectors Health**: portals, WA, Meta — last success, error count.
- [ ] **Queues Monitor**: jobs running/queued, DLQ depth, retry buttons.
- [ ] **Secrets Checker**: badges for `GEMINI_API_KEY`, `VERTEX_*`, `META_*`, `WABA_*`.
- [ ] **Ingestion Triggers**: manual kickoff buttons (daily/weekly).
- [ ] **Logs Viewer**: filter by jobId/model/toolId.

**Acceptance (P4.1)**
- [ ] Green badges when all connectors OK; red with clear error on failure.
- [ ] Manual trigger creates an ingestion job visible in the queue.

### 4.2 GEM Panel (AI Brain Monitor) — `/me/gem`
- [ ] **Active Flows** table: jobId, steps %, duration, source (Web/WA).
- [ ] **Replay Plan**: re-run finished job with same params.
- [ ] **HITL Switch**: low-confidence → review queue `events/labels`.
- [ ] **Usage Card**: last 24h model calls, tokens, est. cost.

**Acceptance (P4.2)**
- [ ] Replay reproduces outputs (idempotent on same inputs).
- [ ] HITL creates review items when confidence < threshold.

---

## 🧩 PHASE 5 — APPSTORE + SUITES

### 5.1 Appstore (Internal Marketplace)
- [ ] Rename internal `/marketplace` → `/appstore`.
- [ ] List suites:
  - Meta Suite
  - Listing Portal Pro
  - SuperSeller CRM
  - Reality Designer
- [ ] Install/uninstall toggles write to `users/{uid}/apps/{toolId}`.
- [ ] “Enable in WhatsMAP” registers flows into `flows/{flowId}`.

**Acceptance (P5.1)**
- [ ] Installed app appears in the user’s workspace and WhatsMAP actions.

### 5.2 Suite Dashboards
- [ ] Meta Suite → campaign builder + insights.
- [ ] Listing Portal → Bayut + Property Finder sync + report.
- [ ] SuperSeller → CRM pipeline + AI lead scoring.
- [ ] Reality Designer → creative hub for assets.

**Acceptance (P5.2)**
- [ ] Each suite loads real data and exposes at least one flow.

---

## 🎨 PHASE 6 — CREATIVE + AUTOMATION FLOWS

### 6.1 PDF Renderer
- [ ] `/api/pdf` using puppeteer-core + @sparticuz/chromium.
- [ ] Save to Storage, return signed URL.
- [ ] Worker chain: `search → analyze → generatePDF → deliver`.

**Acceptance (P6.1)**
- [ ] PDF link opens and matches selected projects & metrics.

### 6.2 Meta Ads Launcher
- [ ] `functions/src/steps/launchMeta.ts` create campaigns/adsets (paused).
- [ ] Creative upload + ad creation (image/video).
- [ ] Campaign summary widget in Meta Suite.

**Acceptance (P6.2)**
- [ ] Campaign + adset IDs stored in job result; widget renders from API.

### 6.3 Automated Flows
- [ ] “Flows” Library (prebuilt):
  - “Rebrand Brochure → Landing Page → Video → Deploy”
  - “Ad + CRM → WhatsApp → Follow-up”
- [ ] Flow visualizer `/me/flows`.

**Acceptance (P6.3)**
- [ ] Selecting a flow pre-fills inputs (zero prompt) and runs end-to-end.

---

## 🧱 PHASE 7 — INFRASTRUCTURE & DEPLOYMENT

### 7.1 Next.js & Hosting
- [ ] Remove duplicate routes (`robots.txt`, `sitemap.xml`).
- [ ] `next.config.js` → `outputFileTracingRoot` set.
- [ ] Firebase Hosting rewrites for `/api/*`.
- [ ] Static cache and storage tuning.

### 7.2 CI/CD
- [ ] GitHub Actions: Lint + Build + Test + Deploy.
- [ ] Environment auto-injection for Firebase.
- [ ] Functions build pipeline for `functions/src`.

**Acceptance (P7)**
- [ ] PR → CI runs tests → staging deploy auto.

---

## 📡 PHASE 8 — TESTING, QA, & OPTIMIZATION

- [ ] Unit tests `/api/*` routes.
- [ ] Integration: WhatsMAP → PDF → Meta flow.
- [ ] Perf tests for Firestore queries.
- [ ] UX review (mobile/tablet).
- [ ] Staging → production via GitHub Action.

**Acceptance (P8)**
- [ ] E2E green; P95 latency targets met on main screens.

---

## 🪄 PHASE 9 — EXTENSIONS (OPTIONAL ROADMAP)

- [ ] Public Entrestate Cloud API (market intelligence access).
- [ ] WordPress AI plugin pack.
- [ ] Data monetization & export API.
- [ ] SmartAgent for LinkedIn + Telegram.
- [ ] Developer Performance Scoring Engine (AI + Graph).

---

## 🧭 DEFINITIONS

**Definition of Ready (DoR)**
- Acceptance criteria defined; UI mocks or component list; env & secrets listed.

**Definition of Done (DoD)**
- Code merged; tests added; docs updated; monitoring alerts set; demo recorded.

---

### ⚙️ STATUS TRACKER
| Phase | Area | Status | Owner |
|-------|------|--------|------|
| 1 | Firebase + AI Core | 🔧 In Progress | |
| 2 | WhatsMAP Brain | ⏳ Planned | |
| 3 | Data Cloud | ⏳ Planned | |
| 4 | DEV / GEM Panels | ⏳ Planned | |
| 5 | Appstore & Suites | ⏳ Planned | |
| 6 | PDF / Meta Flows | ⏳ Planned | |
| 7 | Infra & CI/CD | ⏳ Planned | |
| 8 | QA & Tests | ⏳ Planned | |
| 9 | Extensions | ⏳ Future | |

---

### Notes
This TODO is the **control panel roadmap**.  
**GEM** = AI Orchestration layer.  
**DEV** = Admin Intelligence Panel.  
Both will merge into the Entrestate Master Console.
