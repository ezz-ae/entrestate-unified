# AI Flows — Contracts

Flows are executed as jobs at users/{uid}/jobs/{jobId} with:

```
{
  "status": "queued|running|done|error",
  "plan": { "flowId": "designer", "steps": ["extractSections","generateLandingPage","publish"], "params": {} },
  "steps": [ { "name":"extractSections", "status":"queued|running|done|error", "ts": 0, "result": {}, "error": {} } ]
}
```

## Common flows

### designer
- extractSections: parse brochure/URL; out: sections[]
- generateLandingPage: create HTML/Tailwind; out: html
- publish: upload to Storage/Hosting; out: url

### lead-capture
- createLead: users/{uid}/leads
- enrichLead: Vertex/Gemini enrichment
- generateScript: messaging script with BrandKit
- scheduleFollowups: reminders/WhatsApp templates

### listing-sync
- composeListing: canonical JSON
- validate: required fields complete
- syncBayut / syncPropertyFinder: proxy calls -> remote ID
- verify: fetch remote + assert fields

### investor-match
- profileToFilters: map brief -> filters
- smartFilter: filter + re-rank
- rank: final scores + shortlist

## PDF handoff

Any flow can POST /api/pdf with { html, uid, jobId, filename } and store result.pdfUrl back to the job for UI previews.
