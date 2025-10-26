# Entrestate — AI‑Native Real Estate Ecosystem

*A single, organized blueprint combining product vision, data cloud, AI flows, architecture, team of agents, HITL, APIs, and the engineering plan of action.*

---

## 1) Executive Summary

Entrestate is an **AI‑native operating system** for real estate—an intelligent ecosystem that unifies market intelligence, creative tooling, and campaign automation into a single cockpit. It solves industry fragmentation by automating tedious work (ad creation, brochure rebranding, market analysis) and transforming chaotic data into **clear, actionable insight** so agents, marketers, and developers can focus on relationships and closing deals.

---

## 2) Core Architecture

**Pattern:** Modular, serverless, event‑driven, and extensible.

- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS, ShadCN UI.
- **AI Core**: Genkit flows using Gemini models (Google AI) for content, analysis, vision, and orchestration.
- **Backend & Data**: Firebase (Auth), Firestore (profiles, projects, knowledge), Cloud Storage (assets).
- **Event Bus**: Cloud Pub/Sub + Cloud Functions enabling async, multi‑step workflows.
- **Diagram**: Executive Brain Map (see `src/components/diagrams/ExecutiveBrainMap.tsx`). Details in `src/ai/PRODUCT_BRIEF.md`.

---

## 3) Key Concepts

- **Service Cards (Apps)**: Self‑contained tools (e.g., Insta Ads Designer, Market Reports) rendered in the dashboard; users compose their own toolkit.
- **AI Flows**: Genkit flows (`src/ai/flows`) encapsulate business logic and Gemini calls.
- **Pilots (Automations)**: Orchestrators (e.g., Meta Auto Pilot) chaining multiple flows to execute end‑to‑end tasks (campaign launch from one command).
- **Brand Kit & Knowledge Base**: Per‑user repository (`/dashboard/brand`) with logo/colors/docs feeding all creative and assistance features for on‑brand output.

---

## 4) Entrestate Cloud & Data Intelligence

**Goal:** AI data transformation and validation across multi‑layer sources, producing a canonical, queryable knowledge base for apps and agents.

- **Collection Scope**: Open internet sources in three layers—from trusted portals to social posts/ads. We scan **text, images, video, PDFs, code**—whatever is relevant.
- **Cloud Archive Policy**: Persist verified media from original, trusted sources; maintain a broader scraped layer for scanning/reading (ads, hero headers, articles, creative ideas, etc.).
- **Acquisition Channels**: Automated connectors, scrapers, and an optional **WhatsApp agent** coordinating with developers for updates and availability signals.
- **Google Cloud Leverage**: Vertex AI + Genkit, Discovery Engine (Search), Vision/NLP/Speech/Translate; use ready Vertex agents (Marketing, Brand Optimization, Data Analysis) to accelerate without starting from scratch.

---

## 5) AI Rules & App Suite (Operational Layer)

AI is the primary operator. It powers:

- Property Marketer AI, Campaign Creator (Meta), Landing Page Designer, Instagram Lead Gen, Listing Portal AI (Bayut/Property Finder focus), Instagram Admin DM, WhatsApp Campaigns, Commission Calculator, Sales AI Assistant, AI Videos (face), Social Content Writer, prompt‑to‑code utilities (web dev, PDF editing, Google Ads, LLM agent prompts), and **ChatAnalog**: a multi‑functional chat controller that executes tools via smart buttons.
- **Market Projects Library** (“search anything real estate”) feeds all apps with authoritative context.

---

## 6) Flows & Cross‑Suite Orchestration ("Flows")

**Flows** enable user‑planned or preset pipelines across suites—e.g., edit a PDF → build a landing page → generate a deep hero video → deploy via DNS agent. Flows include a library and guided courses and are central to client task automation and monetization.

---

## 7) Cloud Solutions (Search, Listing, Expert Chat)

- **Vertex Search AI + Market Library**: 3 search modes—Fast (keyword), Smart (semantic), Deep (historical/predictive). Deliver rich multi‑output (listing sliders, investment plans) with local arrangement and no external backlinks.
- **Listing Portal**: Two‑way sync to top portals with *click‑to‑list*, renewal and research planners, and daily operational support inside the workspace.
- **Expert Chat**: Embeddable (site, social, microsite, business card QR, team data source), all powered by shared data and Gemini‑driven orchestration.

**Internal Ops**: AI‑based support with per‑user opaque keys, ticket links, and context‑aware resolution; **Teacher Agent** for the Academy; **Live Market Data** (transactions, project pipeline now/soon/delivering).

**Open Access**: Market library and live data are public to browse (OTP + cookie gating). Search is tuned for soft conversion via recommendations to flows/apps.

**Data Products**: Entrestate Data Cloud exposes segmented intelligence via public overviews and gated tiers (monthly, one‑time, scraping, read‑only, feeder, special SEO keyword studies). Downstream: WordPress AI plugins (SEO, market listing, content delivery, social, support, cold calls, lead verification, etc.).

---

## 8) Deal Planner & WhatsApp Layer

**Deal Planner** operationalizes account state into ready playbooks (e.g., "No‑answer leads" cadence; "Convert LinkedIn lead" plan). Integrates with WhatsApp pipelines for QR‑based web access and click‑to‑list tools.

---

## 9) Current Status & Needs

- **Status**: Ecosystem built; publishing underway. Final tasks: data integration and “power‑on” wiring.
- **Ask**: Refine partner success plan; ideas, code edits, data integrations—down to “electricity bill” practicals. Marketplace for direct purchase and instant workspace provisioning.

---

## 10) Engineering Plan of Action: AI Flow Integration (Project *Geminiation*)

**Objective:** 100% functional mapping between UI tool IDs (`src/lib/tools-data.ts`) and backend flow runners (`src/api/run/route.ts`).

- **Inventory**: 48 tools defined; 48 mapped; 42 fully connected; 6 placeholders.
- **Gaps**:
  1) `images-hq-ai`, `logo-creator-ai` → map both to `generateAdFromBrochure` (multi‑modal generator) to activate creative tooling.  
  2) `listing-manager`, `listing-performance` → UI workflow hubs; API placeholders are correct; no change.  
  3) `projects-finder` → UI search hub; no API change.  
  4) `ai-assistant` → handled via `/api/chat`; not part of `/api/run` map.

**Implementation**:
- Update `flowRunnerMap` in `src/api/run/route.ts` connecting image/logo tools to `generateAdFromBrochure`. Re‑verify all other mappings (incl. `deals-smart-planner`, `campaign-builder`).

**Validation**:
- Confirm no placeholders remain where a flow is required; report job IDs for long runs; ensure UI renders results from flow outputs.

---

## 11) Product Pillars (Core AI Engines)

1) **Market Search Engine** (Fast/Smart/Deep)  
- Current: `/me/discover` simulates Fast; mock Smart/Deep.  
- Next: Elasticsearch/Algolia for Fast; Gemini‑powered NL → structured queries for Smart; Deep trained on Developer Archive & Knowledge Graph.

2) **SalesAgentChat AI**  
- Current: `/me/assistant`, chat with history.  
- Next: Tool‑use (Genkit tools), proactive composite events, multichannel (web, WhatsApp, IG DM).

3) **AI Listing Portal**  
- Current: Market Library + Developer Archive via basic scrapers.  
- Next: Full `DATA_INGESTION_POLICY.yml` via Airflow DAG + adaptive scheduler; Gemini Vision + Knowledge Graph for dedup/verification/scoring; Unified internal API for verified data.

---

## 12) Data Ingestion & Reliability

- Governed by `DATA_INGESTION_POLICY.yml` and `data-ingestion-dag.py` (Airflow/Composer).  
- **Adaptive Scheduler** (`adaptive_scheduler.py`) optimizes cadence by value/volatility.  
- **Self‑Healing Connectors**: Auto‑refresh creds → secondary source/cached snapshot → alert if failover fails.

---

## 13) UX Patterns

- **Entity Timeline**: Chronological view per entity (campaigns, permits, news, social, mobility spikes).  
- **Composite Alerts Dashboard**: Explainable, ranked AI alerts (launch detection, reputation risk) with confirm/dismiss feedback.  
- **Investigation Workspace**: Tri‑view of Knowledge Graph neighborhood, semantic similarity search, and time‑series.

---

## 14) Enabled APIs & Capabilities

**AI/ML**: Vertex AI, Cloud NLP, Vision, Speech‑to‑Text, Text‑to‑Speech, Translate.  
**Search/Data**: Discovery Engine (Vertex AI Search), Google CSE for discovery, Neo4j (AuraDB) for Knowledge Graph.  
**Orchestration**: Cloud Run, Cloud Build, Cloud Functions, Pub/Sub, Scheduler, Workflows.  
**Integrations**: Dialogflow, Aerial View, Airflow (Composer).  
**Comms/Ads**: Meta/TikTok/Google Ads, Twilio/WhatsApp Business.  
**Payments**: PayPal.

---

## 15) AI Team of Agents (Org of Flows)

- **The Strategist (Pilot)** — `meta-auto-pilot.ts`: plans and orchestrates multi‑tool campaigns.  
- **Creative Director** — Content/Video/Web flows:  
  - Brochure & Docs: `rebrand-brochure.ts`, `translate-brochure.ts`, `edit-pdf.ts`  
  - Web & Brand: `generate-landing-page.ts`, `ai-brand-creator.ts`  
  - Video: `generate-reel.ts`, `generate-story.ts`, `edit-youtube-video.ts`, `generate-tiktok-video.ts`, `generate-video-presenter.ts`  
  - Copy: `ugc-script-writer.ts`, `generate-social-post.ts`
- **Market Analyst** — Market‑intelligence flows:  
  - Reporting: `generate-market-report.ts`, `generate-multi-offer.ts`  
  - Forecasting: `get-market-trends.ts`, `deal-analyzer.ts`  
  - SEM/SEO: `generate-keyword-plan.ts`
- **Sales Associate** — Listing/CRM/outreach flows:  
  - Listings: `generate-listing.ts`, `generate-payment-plan.ts`  
  - Leads: `get-crm-memory.ts`, `investigate-lead.ts`  
  - Outreach: `manage-whatsapp-campaign.ts`, `create-email-campaign.ts`  
  - Investors: `match-investors.ts`
- **Backend Engineer** — External sync & infra:  
  - Portals: `sync-bayut-listing.ts`, `sync-property-finder-listing.ts`  
  - External: `get-paypal-transaction.ts`  
  - Cloud/DB: `scan-for-alloydb.ts`

---

## 16) Human‑in‑the‑Loop (HITL) & Active Learning

- **Trigger**: Low confidence or novel entities route items to a labeling queue.  
- **Labeling**: Simple UI; labels stored in `labels` table (id, item_type, item_ref, label, user_id, ts, prev_confidence, session_id).
- **Training**: Nightly/weekly fine‑tuning from new labels; redeploy improved models.  
- **Selection**: Uncertainty sampling (entropy) to maximize human impact.

---

## 17) High‑Priority Architecture Tasks

1) **Dashboards for Core Engines**  
   - *Pro‑Search*: connect feeds, monitor indexing, issue API keys.  
   - *EstChat*: upload/train docs, persona, embed snippets.  
   - *Mega‑Listing*: map verified data → site fields; status per domain.

2) **Realtime for Async Flows**  
   - `/api/run` returns `jobId`; UI subscribes via WebSocket/Firestore listeners; progressive statuses (e.g., “Rendering video…”).  
   - Replace pilot page simulation with live job system.

---

## 18) Medium‑Priority Feature Completeness

- **Operational Suite Workspaces**:  
  - *Meta Marketing Suite*: overview of active campaigns, KPIs, quick‑create.  
  - *Listing Portal Pro*: cross‑portal status, deep links to Manager/Performance.  
  - *SuperSellerSuite*: CRM pipeline snapshots; quick‑launch tools (Deal Analyzer).  
  - *Reality Designer*: creative asset shelf + new project starters.
- **Community & Academy**:  
  - `Community Notes` backed by Firestore `notes`.  
  - `Academy` schema + real course data pipeline.

---

## 19) Data Model (Firestore)

```
users/{uid}
  profile { name, city, email }
  brandKit { logoUrl, colors{primary,accent}, contact{phone,email} }
  projects (subcollection)
    projects/{projectId} { name, developer, city, priceFrom, unitTypes[], handover }
  knowledgeBase (subcollection)
    files/{fileId} { fileName, fileUrl, type, status, summary }

projects_catalog/{projectId}
  { name, developer, city, priceFrom, unitTypes[], handover }

events/{eventId}
  { event, uid, props, ts }

xmlImports/{importId}
  { type, fileName, storagePath, ownerUid, status, preview, createdAt }
```

---

## 20) Typical Flows

**Onboarding**: detect location → select developers → add Brand Kit → connect accounts → land in `/dashboard`.

**Service Use**: open tool → dynamic form → submit → `/api/run` → map toolId → Genkit flow → Gemini → render result.

**AI Co‑Pilot**: observes events → suggests next tools (e.g., post‑brochure → ad) → guides onboarding.

---

## 21) Deployment & Integrations

- **Stack**: Next.js + Tailwind; Firebase Hosting/Vercel; Firestore; Storage; Auth.  
- **APIs**: Meta/TikTok/Google Ads, WhatsApp Business/Twilio, PayPal, Vertex AI & Genkit, Dialogflow, Discovery Engine, Vision/NLP/Speech/Translate, Neo4j (AuraDB).

---

## 22) Action Checklist (Immediate)

- [ ] Update `flowRunnerMap`: map `images-hq-ai` + `logo-creator-ai` → `generateAdFromBrochure`.
- [ ] Smoke‑test 48 tool routes vs `tools-data.ts` keys; assert no mismatches.
- [ ] Implement `jobId` pattern for long flows; add client listeners.
- [ ] Stand up *Pro‑Search* dashboard MVP (feeds + index monitor + API keys).
- [ ] Wire *EstChat* training UI (doc upload, persona, embed code).
- [ ] Connect Airflow DAG + adaptive scheduler to `DATA_INGESTION_POLICY.yml` sources.

---

## 23) Notes for Partners & Success Plan

- **Go‑to‑Market**: Start with high‑leverage agents/teams; bundle Listing + Creative + Deal Planner; offer public Market Library as an acquisition funnel.
- **Monetization**: Workspace + add‑on apps; Data Cloud tiers; WordPress plugin licenses; API seats; managed pilot campaigns.
- **Ops Readiness**: HITL labeling network; connector health SLOs; self‑healing; composite alerts triage.

---

## 24) Appendix: Endpoints & Maps (Pointers)

- **UI Tools**: `src/lib/tools-data.ts`
- **Flow Map**: `src/api/run/route.ts` (↔ Genkit flows in `src/ai/flows/*`)
- **Chat Assistant**: `/api/chat` (separate from `/api/run`)
- **Diagram**: `src/components/diagrams/ExecutiveBrainMap.tsx`
- **Brief**: `src/ai/PRODUCT_BRIEF.md`
- **Ingestion**: `DATA_INGESTION_POLICY.yml`, `data-ingestion-dag.py`, `adaptive_scheduler.py`

---

### Final Word

**Perfection becomes normal.** This blueprint aligns product, data, and engineering into one coherent, shippable system. Next step: execute the Action Checklist to fully light up the engine.



---

## 25) Quick Implementation Snippets (Copy‑Paste Ready)

### A) `src/api/run/route.ts` — map creative tools to a working flow
```ts
// import your flow runner
import { generateAdFromBrochure } from "@/ai/flows/content/generate-ad-from-brochure";

// inside your flowRunnerMap
export const flowRunnerMap: Record<string, FlowRunner> = {
  // ...existing mappings
  "images-hq-ai": generateAdFromBrochure,
  "logo-creator-ai": generateAdFromBrochure,
  // listing-manager / listing-performance / projects-finder are UI hubs → no change
};
```

### B) Long‑running jobs pattern — return `jobId` and stream status
```ts
// /api/run/route.ts (simplified)
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/firebase-admin";

export async function POST(req: NextRequest) {
  const { toolId, payload, uid } = await req.json();
  const run = flowRunnerMap[toolId];
  if (!run) return NextResponse.json({ error: "Unknown toolId" }, { status: 400 });

  const jobRef = db.collection("jobs").doc();
  await jobRef.set({
    uid,
    toolId,
    status: "queued",
    createdAt: Date.now(),
  });

  // fire-and-forget: run the flow and update progress
  run(payload, {
    onProgress: async (p: string) => jobRef.update({ status: p, updatedAt: Date.now() }),
  })
    .then(async (result) => {
      await jobRef.update({ status: "done", result, finishedAt: Date.now() });
    })
    .catch(async (e) => {
      await jobRef.update({ status: "error", error: String(e), finishedAt: Date.now() });
    });

  return NextResponse.json({ jobId: jobRef.id });
}
```

**Client hook (subscribe to status):**
```ts
// useJob.ts
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function subscribeJob(jobId: string, cb: (snap: any) => void) {
  return onSnapshot(doc(db, "jobs", jobId), (d) => cb(d.data()));
}
```

### C) Firestore Rules (jobs + user namespacing)
```rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isOwner(uid) { return request.auth != null && request.auth.uid == uid; }

    match /jobs/{jobId} {
      allow create: if request.auth != null && request.resource.data.uid == request.auth.uid;
      allow read, update: if isOwner(resource.data.uid);
    }
  }
}
```

### D) Pro‑Search Dashboard skeleton (Next.js route)
```tsx
// app/me/pro-search/page.tsx
export default function ProSearchDashboard() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Pro‑Search</h1>
      <section className="grid md:grid-cols-3 gap-4">
        <Card title="Connect Feeds" desc="RSS/XML, sitemap, CSV, API" action="Add Feed" />
        <Card title="Indexing Status" desc="Docs, embeddings, errors" action="Open Monitor" />
        <Card title="API Keys" desc="Issue & revoke keys" action="Manage" />
      </section>
    </main>
  );
}

function Card({ title, desc, action }: { title: string; desc: string; action: string }) {
  return (
    <div className="rounded-2xl border p-4 shadow-sm">
      <div className="font-medium">{title}</div>
      <div className="text-sm text-muted-foreground">{desc}</div>
      <button className="mt-3 rounded-xl border px-3 py-1 text-sm">{action}</button>
    </div>
  );
}
```

### E) CLI checklist (copy into README)
```bash
# 1) Map creative tools to working flow
sed -i 's/"images-hq-ai":.*$/"images-hq-ai": generateAdFromBrochure,/' src/api/run/route.ts
sed -i 's/"logo-creator-ai":.*$/"logo-creator-ai": generateAdFromBrochure,/' src/api/run/route.ts

# 2) Deploy security rules
firebase deploy --only firestore:rules

# 3) Set required envs (example)
export NEXT_PUBLIC_FIREBASE_API_KEY=... \
       NEXT_PUBLIC_FIREBASE_PROJECT_ID=... \
       FIREBASE_ADMIN_CREDENTIALS=... \
       VERTEX_LOCATION=us-central1 \
       VERTEX_PROJECT=your-gcp-project

# 4) Run locally
npm run dev
```

# Entrestate — AI‑Native Real Estate Ecosystem

*A single, organized blueprint combining product vision, data cloud, AI flows, architecture, team of agents, HITL, APIs, and the engineering plan of action.*

---

## 1) Executive Summary

Entrestate is an **AI‑native operating system** for real estate—an intelligent ecosystem that unifies market intelligence, creative tooling, and campaign automation into a single cockpit. It solves industry fragmentation by automating tedious work (ad creation, brochure rebranding, market analysis) and transforming chaotic data into **clear, actionable insight** so agents, marketers, and developers can focus on relationships and closing deals.

---

## 2) Core Architecture

**Pattern:** Modular, serverless, event‑driven, and extensible.

- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS, ShadCN UI.
- **AI Core**: Genkit flows using Gemini models (Google AI) for content, analysis, vision, and orchestration.
- **Backend & Data**: Firebase (Auth), Firestore (profiles, projects, knowledge), Cloud Storage (assets).
- **Event Bus**: Cloud Pub/Sub + Cloud Functions enabling async, multi‑step workflows.
- **Diagram**: Executive Brain Map (see `src/components/diagrams/ExecutiveBrainMap.tsx`). Details in `src/ai/PRODUCT_BRIEF.md`.

---

## 3) Key Concepts

- **Service Cards (Apps)**: Self‑contained tools (e.g., Insta Ads Designer, Market Reports) rendered in the dashboard; users compose their own toolkit.
- **AI Flows**: Genkit flows (`src/ai/flows`) encapsulate business logic and Gemini calls.
- **Pilots (Automations)**: Orchestrators (e.g., Meta Auto Pilot) chaining multiple flows to execute end‑to‑end tasks (campaign launch from one command).
- **Brand Kit & Knowledge Base**: Per‑user repository (`/dashboard/brand`) with logo/colors/docs feeding all creative and assistance features for on‑brand output.

---

## 4) Entrestate Cloud & Data Intelligence

**Goal:** AI data transformation and validation across multi‑layer sources, producing a canonical, queryable knowledge base for apps and agents.

- **Collection Scope**: Open internet sources in three layers—from trusted portals to social posts/ads. We scan **text, images, video, PDFs, code**—whatever is relevant.
- **Cloud Archive Policy**: Persist verified media from original, trusted sources; maintain a broader scraped layer for scanning/reading (ads, hero headers, articles, creative ideas, etc.).
- **Acquisition Channels**: Automated connectors, scrapers, and an optional **WhatsApp agent** coordinating with developers for updates and availability signals.
- **Google Cloud Leverage**: Vertex AI + Genkit, Discovery Engine (Search), Vision/NLP/Speech/Translate; use ready Vertex agents (Marketing, Brand Optimization, Data Analysis) to accelerate without starting from scratch.

---

## 5) AI Rules & App Suite (Operational Layer)

AI is the primary operator. It powers:

- Property Marketer AI, Campaign Creator (Meta), Landing Page Designer, Instagram Lead Gen, Listing Portal AI (Bayut/Property Finder focus), Instagram Admin DM, WhatsApp Campaigns, Commission Calculator, Sales AI Assistant, AI Videos (face), Social Content Writer, prompt‑to‑code utilities (web dev, PDF editing, Google Ads, LLM agent prompts), and **ChatAnalog**: a multi‑functional chat controller that executes tools via smart buttons.
- **Market Projects Library** (“search anything real estate”) feeds all apps with authoritative context.

---

## 6) Flows & Cross‑Suite Orchestration ("Flows")

**Flows** enable user‑planned or preset pipelines across suites—e.g., edit a PDF → build a landing page → generate a deep hero video → deploy via DNS agent. Flows include a library and guided courses and are central to client task automation and monetization.

---

## 7) Cloud Solutions (Search, Listing, Expert Chat)

- **Vertex Search AI + Market Library**: 3 search modes—Fast (keyword), Smart (semantic), Deep (historical/predictive). Deliver rich multi‑output (listing sliders, investment plans) with local arrangement and no external backlinks.
- **Listing Portal**: Two‑way sync to top portals with *click‑to‑list*, renewal and research planners, and daily operational support inside the workspace.
- **Expert Chat**: Embeddable (site, social, microsite, business card QR, team data source), all powered by shared data and Gemini‑driven orchestration.

**Internal Ops**: AI‑based support with per‑user opaque keys, ticket links, and context‑aware resolution; **Teacher Agent** for the Academy; **Live Market Data** (transactions, project pipeline now/soon/delivering).

**Open Access**: Market library and live data are public to browse (OTP + cookie gating). Search is tuned for soft conversion via recommendations to flows/apps.

**Data Products**: Entrestate Data Cloud exposes segmented intelligence via public overviews and gated tiers (monthly, one‑time, scraping, read‑only, feeder, special SEO keyword studies). Downstream: WordPress AI plugins (SEO, market listing, content delivery, social, support, cold calls, lead verification, etc.).

---

## 8) Deal Planner & WhatsApp Layer

**Deal Planner** operationalizes account state into ready playbooks (e.g., "No‑answer leads" cadence; "Convert LinkedIn lead" plan). Integrates with WhatsApp pipelines for QR‑based web access and click‑to‑list tools.

---

## 9) Current Status & Needs

- **Status**: Ecosystem built; publishing underway. Final tasks: data integration and “power‑on” wiring.
- **Ask**: Refine partner success plan; ideas, code edits, data integrations—down to “electricity bill” practicals. Marketplace for direct purchase and instant workspace provisioning.

---

## 10) Engineering Plan of Action: AI Flow Integration (Project *Geminiation*)

**Objective:** 100% functional mapping between UI tool IDs (`src/lib/tools-data.ts`) and backend flow runners (`src/api/run/route.ts`).

- **Inventory**: 48 tools defined; 48 mapped; 42 fully connected; 6 placeholders.
- **Gaps**:
  1) `images-hq-ai`, `logo-creator-ai` → map both to `generateAdFromBrochure` (multi‑modal generator) to activate creative tooling.  
  2) `listing-manager`, `listing-performance` → UI workflow hubs; API placeholders are correct; no change.  
  3) `projects-finder` → UI search hub; no API change.  
  4) `ai-assistant` → handled via `/api/chat`; not part of `/api/run` map.

**Implementation**:
- Update `flowRunnerMap` in `src/api/run/route.ts` connecting image/logo tools to `generateAdFromBrochure`. Re‑verify all other mappings (incl. `deals-smart-planner`, `campaign-builder`).

**Validation**:
- Confirm no placeholders remain where a flow is required; report job IDs for long runs; ensure UI renders results from flow outputs.

---

## 11) Product Pillars (Core AI Engines)

1) **Market Search Engine** (Fast/Smart/Deep)  
- Current: `/me/discover` simulates Fast; mock Smart/Deep.  
- Next: Elasticsearch/Algolia for Fast; Gemini‑powered NL → structured queries for Smart; Deep trained on Developer Archive & Knowledge Graph.

2) **SalesAgentChat AI**  
- Current: `/me/assistant`, chat with history.  
- Next: Tool‑use (Genkit tools), proactive composite events, multichannel (web, WhatsApp, IG DM).

3) **AI Listing Portal**  
- Current: Market Library + Developer Archive via basic scrapers.  
- Next: Full `DATA_INGESTION_POLICY.yml` via Airflow DAG + adaptive scheduler; Gemini Vision + Knowledge Graph for dedup/verification/scoring; Unified internal API for verified data.

---

## 12) Data Ingestion & Reliability

- Governed by `DATA_INGESTION_POLICY.yml` and `data-ingestion-dag.py` (Airflow/Composer).  
- **Adaptive Scheduler** (`adaptive_scheduler.py`) optimizes cadence by value/volatility.  
- **Self‑Healing Connectors**: Auto‑refresh creds → secondary source/cached snapshot → alert if failover fails.

---

## 13) UX Patterns

- **Entity Timeline**: Chronological view per entity (campaigns, permits, news, social, mobility spikes).  
- **Composite Alerts Dashboard**: Explainable, ranked AI alerts (launch detection, reputation risk) with confirm/dismiss feedback.  
- **Investigation Workspace**: Tri‑view of Knowledge Graph neighborhood, semantic similarity search, and time‑series.

---

## 14) Enabled APIs & Capabilities

**AI/ML**: Vertex AI, Cloud NLP, Vision, Speech‑to‑Text, Text‑to‑Speech, Translate.  
**Search/Data**: Discovery Engine (Vertex AI Search), Google CSE for discovery, Neo4j (AuraDB) for Knowledge Graph.  
**Orchestration**: Cloud Run, Cloud Build, Cloud Functions, Pub/Sub, Scheduler, Workflows.  
**Integrations**: Dialogflow, Aerial View, Airflow (Composer).  
**Comms/Ads**: Meta/TikTok/Google Ads, Twilio/WhatsApp Business.  
**Payments**: PayPal.

---

## 15) AI Team of Agents (Org of Flows)

- **The Strategist (Pilot)** — `meta-auto-pilot.ts`: plans and orchestrates multi‑tool campaigns.  
- **Creative Director** — Content/Video/Web flows:  
  - Brochure & Docs: `rebrand-brochure.ts`, `translate-brochure.ts`, `edit-pdf.ts`  
  - Web & Brand: `generate-landing-page.ts`, `ai-brand-creator.ts`  
  - Video: `generate-reel.ts`, `generate-story.ts`, `edit-youtube-video.ts`, `generate-tiktok-video.ts`, `generate-video-presenter.ts`  
  - Copy: `ugc-script-writer.ts`, `generate-social-post.ts`
- **Market Analyst** — Market‑intelligence flows:  
  - Reporting: `generate-market-report.ts`, `generate-multi-offer.ts`  
  - Forecasting: `get-market-trends.ts`, `deal-analyzer.ts`  
  - SEM/SEO: `generate-keyword-plan.ts`
- **Sales Associate** — Listing/CRM/outreach flows:  
  - Listings: `generate-listing.ts`, `generate-payment-plan.ts`  
  - Leads: `get-crm-memory.ts`, `investigate-lead.ts`  
  - Outreach: `manage-whatsapp-campaign.ts`, `create-email-campaign.ts`  
  - Investors: `match-investors.ts`
- **Backend Engineer** — External sync & infra:  
  - Portals: `sync-bayut-listing.ts`, `sync-property-finder-listing.ts`  
  - External: `get-paypal-transaction.ts`  
  - Cloud/DB: `scan-for-alloydb.ts`

---

## 16) Human‑in‑the‑Loop (HITL) & Active Learning

- **Trigger**: Low confidence or novel entities route items to a labeling queue.  
- **Labeling**: Simple UI; labels stored in `labels` table (id, item_type, item_ref, label, user_id, ts, prev_confidence, session_id).
- **Training**: Nightly/weekly fine‑tuning from new labels; redeploy improved models.  
- **Selection**: Uncertainty sampling (entropy) to maximize human impact.

---

## 17) High‑Priority Architecture Tasks

1) **Dashboards for Core Engines**  
   - *Pro‑Search*: connect feeds, monitor indexing, issue API keys.  
   - *EstChat*: upload/train docs, persona, embed snippets.  
   - *Mega‑Listing*: map verified data → site fields; status per domain.

2) **Realtime for Async Flows**  
   - `/api/run` returns `jobId`; UI subscribes via WebSocket/Firestore listeners; progressive statuses (e.g., “Rendering video…”).  
   - Replace pilot page simulation with live job system.

---

## 18) Medium‑Priority Feature Completeness

- **Operational Suite Workspaces**:  
  - *Meta Marketing Suite*: overview of active campaigns, KPIs, quick‑create.  
  - *Listing Portal Pro*: cross‑portal status, deep links to Manager/Performance.  
  - *SuperSellerSuite*: CRM pipeline snapshots; quick‑launch tools (Deal Analyzer).  
  - *Reality Designer*: creative asset shelf + new project starters.
- **Community & Academy**:  
  - `Community Notes` backed by Firestore `notes`.  
  - `Academy` schema + real course data pipeline.

---

## 19) Data Model (Firestore)

```
users/{uid}
  profile { name, city, email }
  brandKit { logoUrl, colors{primary,accent}, contact{phone,email} }
  projects (subcollection)
    projects/{projectId} { name, developer, city, priceFrom, unitTypes[], handover }
  knowledgeBase (subcollection)
    files/{fileId} { fileName, fileUrl, type, status, summary }

projects_catalog/{projectId}
  { name, developer, city, priceFrom, unitTypes[], handover }

events/{eventId}
  { event, uid, props, ts }

xmlImports/{importId}
  { type, fileName, storagePath, ownerUid, status, preview, createdAt }
```

---

## 20) Typical Flows

**Onboarding**: detect location → select developers → add Brand Kit → connect accounts → land in `/dashboard`.

**Service Use**: open tool → dynamic form → submit → `/api/run` → map toolId → Genkit flow → Gemini → render result.

**AI Co‑Pilot**: observes events → suggests next tools (e.g., post‑brochure → ad) → guides onboarding.

---

## 21) Deployment & Integrations

- **Stack**: Next.js + Tailwind; Firebase Hosting/Vercel; Firestore; Storage; Auth.  
- **APIs**: Meta/TikTok/Google Ads, WhatsApp Business/Twilio, PayPal, Vertex AI & Genkit, Dialogflow, Discovery Engine, Vision/NLP/Speech/Translate, Neo4j (AuraDB).

---

## 22) Action Checklist (Immediate)

- [ ] Update `flowRunnerMap`: map `images-hq-ai` + `logo-creator-ai` → `generateAdFromBrochure`.
- [ ] Smoke‑test 48 tool routes vs `tools-data.ts` keys; assert no mismatches.
- [ ] Implement `jobId` pattern for long flows; add client listeners.
- [ ] Stand up *Pro‑Search* dashboard MVP (feeds + index monitor + API keys).
- [ ] Wire *EstChat* training UI (doc upload, persona, embed code).
- [ ] Connect Airflow DAG + adaptive scheduler to `DATA_INGESTION_POLICY.yml` sources.

---

## 23) Notes for Partners & Success Plan

- **Go‑to‑Market**: Start with high‑leverage agents/teams; bundle Listing + Creative + Deal Planner; offer public Market Library as an acquisition funnel.
- **Monetization**: Workspace + add‑on apps; Data Cloud tiers; WordPress plugin licenses; API seats; managed pilot campaigns.
- **Ops Readiness**: HITL labeling network; connector health SLOs; self‑healing; composite alerts triage.

---

## 24) Appendix: Endpoints & Maps (Pointers)

- **UI Tools**: `src/lib/tools-data.ts`
- **Flow Map**: `src/api/run/route.ts` (↔ Genkit flows in `src/ai/flows/*`)
- **Chat Assistant**: `/api/chat` (separate from `/api/run`)
- **Diagram**: `src/components/diagrams/ExecutiveBrainMap.tsx`
- **Brief**: `src/ai/PRODUCT_BRIEF.md`
- **Ingestion**: `DATA_INGESTION_POLICY.yml`, `data-ingestion-dag.py`, `adaptive_scheduler.py`

---

### Final Word

**Perfection becomes normal.** This blueprint aligns product, data, and engineering into one coherent, shippable system. Next step: execute the Action Checklist to fully light up the engine.



---

## 25) Quick Implementation Snippets (Copy‑Paste Ready)

### A) `src/api/run/route.ts` — map creative tools to a working flow
```ts
// import your flow runner
import { generateAdFromBrochure } from "@/ai/flows/content/generate-ad-from-brochure";

// inside your flowRunnerMap
export const flowRunnerMap: Record<string, FlowRunner> = {
  // ...existing mappings
  "images-hq-ai": generateAdFromBrochure,
  "logo-creator-ai": generateAdFromBrochure,
  // listing-manager / listing-performance / projects-finder are UI hubs → no change
};
```

### B) Long‑running jobs pattern — return `jobId` and stream status
```ts
// /api/run/route.ts (simplified)
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/firebase-admin";

export async function POST(req: NextRequest) {
  const { toolId, payload, uid } = await req.json();
  const run = flowRunnerMap[toolId];
  if (!run) return NextResponse.json({ error: "Unknown toolId" }, { status: 400 });

  const jobRef = db.collection("jobs").doc();
  await jobRef.set({
    uid,
    toolId,
    status: "queued",
    createdAt: Date.now(),
  });

  // fire-and-forget: run the flow and update progress
  run(payload, {
    onProgress: async (p: string) => jobRef.update({ status: p, updatedAt: Date.now() }),
  })
    .then(async (result) => {
      await jobRef.update({ status: "done", result, finishedAt: Date.now() });
    })
    .catch(async (e) => {
      await jobRef.update({ status: "error", error: String(e), finishedAt: Date.now() });
    });

  return NextResponse.json({ jobId: jobRef.id });
}
```

**Client hook (subscribe to status):**
```ts
// useJob.ts
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function subscribeJob(jobId: string, cb: (snap: any) => void) {
  return onSnapshot(doc(db, "jobs", jobId), (d) => cb(d.data()));
}
```

### C) Firestore Rules (jobs + user namespacing)
```rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isOwner(uid) { return request.auth != null && request.auth.uid == uid; }

    match /jobs/{jobId} {
      allow create: if request.auth != null && request.resource.data.uid == request.auth.uid;
      allow read, update: if isOwner(resource.data.uid);
    }
  }
}
```

### D) Pro‑Search Dashboard skeleton (Next.js route)
```tsx
// app/me/pro-search/page.tsx
export default function ProSearchDashboard() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Pro‑Search</h1>
      <section className="grid md:grid-cols-3 gap-4">
        <Card title="Connect Feeds" desc="RSS/XML, sitemap, CSV, API" action="Add Feed" />
        <Card title="Indexing Status" desc="Docs, embeddings, errors" action="Open Monitor" />
        <Card title="API Keys" desc="Issue & revoke keys" action="Manage" />
      </section>
    </main>
  );
}

function Card({ title, desc, action }: { title: string; desc: string; action: string }) {
  return (
    <div className="rounded-2xl border p-4 shadow-sm">
      <div className="font-medium">{title}</div>
      <div className="text-sm text-muted-foreground">{desc}</div>
      <button className="mt-3 rounded-xl border px-3 py-1 text-sm">{action}</button>
    </div>
  );
}
```

### E) CLI checklist (copy into README)
```bash
# 1) Map creative tools to working flow
sed -i 's/"images-hq-ai":.*$/"images-hq-ai": generateAdFromBrochure,/' src/api/run/route.ts
sed -i 's/"logo-creator-ai":.*$/"logo-creator-ai": generateAdFromBrochure,/' src/api/run/route.ts

# 2) Deploy security rules
firebase deploy --only firestore:rules

# 3) Set required envs (example)
export NEXT_PUBLIC_FIREBASE_API_KEY=... \
       NEXT_PUBLIC_FIREBASE_PROJECT_ID=... \
       FIREBASE_ADMIN_CREDENTIALS=... \
       VERTEX_LOCATION=us-central1 \
       VERTEX_PROJECT=your-gcp-project

# 4) Run locally
npm run dev
```

