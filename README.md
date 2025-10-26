# NEW-ENTRESTATE — AI-Native Real Estate OS

Entrestate unifies market intelligence, creative tooling, and campaign automation into one cockpit. It ships with WhatsMAP (conversational brain), Appstore (installable suites), Market Library (public search), PDF engine, and Firebase-first backend.

---

## Quick Start

```
npm i
cp .env.example .env.local   # fill values
npm run dev
```

**Deploy**
```
firebase experiments:enable webframeworks
firebase deploy --only hosting
firebase deploy --only firestore:rules
# (functions) cd functions && npm run build && firebase deploy --only functions
```

---

## Environment

See .env.example (Firebase, WhatsApp, Gemini, Meta, Storage).

---

## Data: Projects Catalog

- Source JSON: data/projects_full.json
- Firestore: projects_catalog/{projectId}

**Seed**
```
npx ts-node scripts/seed-projects.ts
```

---

## WhatsMAP (Q&A + Actions)

Webhook: src/app/api/wa/webhook/route.ts
- Q&A -> POST /api/qa/query
- Actions -> users/{uid}/jobs/{jobId}

Q&A stack: src/lib/qa/*

---

## Market Library & Finder

- API: GET /api/projects/search
- Page: (public)/library
- Loader: src/lib/market/*

---

## PDF Engine

- API: POST /api/pdf
- Helpers: src/lib/server/admin.ts, src/lib/server/storage.ts

---

## Appstore & Suites

- Page: /appstore
- Model: users/{uid}/apps/{appId}

---

## Admin Panels

- DEV: /api/dev/status, /api/dev/projects-stats
- GEM: /me/gem (connect to jobs)

---

## Firestore Rules

firestore.rules enforces private users/, public catalog, admin-only events & waPhoneMap.

---

## Structure

```
data/
scripts/
src/app/(public)/library
src/app/api/pdf
src/app/api/qa/query
src/app/api/wa/webhook
src/app/appstore
src/lib/market
src/lib/qa
src/lib/server
firestore.rules
next.config.js
.env.example
```
