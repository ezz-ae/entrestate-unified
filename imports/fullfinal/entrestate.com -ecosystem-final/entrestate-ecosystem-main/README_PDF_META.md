# PDF Renderer + Meta Ads Launcher (Bundle)

## Files
- `src/app/api/pdf/route.ts` — accepts `{ uid, html, filename? }`, renders PDF via puppeteer-core + @sparticuz/chromium, saves to Storage, returns signed URL.
- `functions/src/steps/launchMeta.ts` — calls Meta Marketing API to create a Campaign + Ad Set (paused).
- `server.env.example` — add `META_AD_ACCOUNT_ID`.

## Install
1) Add deps to your Next app:
   ```bash
   npm i puppeteer-core @sparticuz/chromium
   ```
2) Copy these files into your repo preserving folders.
3) Ensure your Firebase Admin module is available at `@/server/firebase-admin` and exports `{ db, storage }`.
4) Deploy functions (if you haven't):
   ```bash
   cd functions && npm i && npm run build && firebase deploy --only functions
   ```

## Usage
- From the worker step `generatePDF`, call your new API:
  ```ts
  const res = await fetch(process.env.APP_BASE_URL + '/api/pdf', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uid, html, filename: 'comparison' })
  });
  const { pdfUrl } = await res.json();
  ```
- To launch Meta:
  ```ts
  const res = await launchMeta({ name: 'Lead Gen UAE', budgetCents: 5000 });
  ```

## Notes
- On serverless platforms, puppeteer needs the `@sparticuz/chromium` binary.
- Signed URL expires after 24h — adjust per your policy.
- Extend Meta step to add creatives and ads after ad set creation.
