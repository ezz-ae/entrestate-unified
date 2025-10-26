# Deployment Guide (Firebase Hosting + App Hosting / Cloud Run)

You have **two safe hosting strategies**. Choose ONE and follow the snippet.

---

## ✅ Option A — Firebase **App Hosting** (recommended for SSR Next.js)
1) Ensure `apphosting.yaml` exists at repo root (already included).
2) In the Firebase console, link the repo to App Hosting and select this folder.
3) Hosting will serve static assets; App Hosting runs SSR server.

**Hosting rewrites (example)** — add to `firebase.json`:
```json
{
  "hosting": {
    "public": "public",
    "ignore": ["**/.*", "**/node_modules/**"],
    "rewrites": [
      { "source": "/api/**", "run": { "serviceId": "default", "region": "us-central1" } },
      { "source": "**", "run": { "serviceId": "default", "region": "us-central1" } }
    ]
  }
}
```
> Replace `serviceId` with your App Hosting service name shown in console.

---

## ✅ Option B — Cloud Run (Next.js server) + Firebase Hosting
1) Build a container that runs `npm start` (Next.js server).
2) Deploy to Cloud Run; note the service name/region.
3) Add Hosting rewrites to proxy to Cloud Run.

**Hosting rewrites (example)**:
```json
{
  "hosting": {
    "public": "public",
    "ignore": ["**/.*", "**/node_modules/**"],
    "rewrites": [
      { "source": "/api/**", "run": { "serviceId": "entrestate-web", "region": "us-central1" } },
      { "source": "**", "run": { "serviceId": "entrestate-web", "region": "us-central1" } }
    ]
  }
}
```

---

## ⚠️ Option C — Static Export (no SSR)
If you choose `next export` (pure static), add to `package.json`:
```json
"scripts": {
  "export": "next build && next export -o out"
}
```
Then set `"public": "out"` in `firebase.json` and deploy hosting.
Note: `/api/*` and SSR routes will not work in this mode.

---

## CI/CD
- Create the secret `FIREBASE_TOKEN` in your GitHub repo.
- Trigger **Deploy Hosting** job with **Run workflow** (manual) in GitHub Actions.
- Firestore rules/indexes deploy automatically within the job.
