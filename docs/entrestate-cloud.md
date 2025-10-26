# Entrestate Cloud — Market Intelligence

## Sources
- Trusted portals
- Developer announcements
- Social signals (ads, posts, hero headers)

## Storage & Access
- Public library: projects_catalog
- Optional inventory: inventory/{project}/units
- Daily digest: marketData/{YYYY-MM-DD}

## Dashboards
- Market Overview (transactions/trends)
- Developer Reputation Index
- Project Pipeline (Soon/Now/Delivering)

## Ingestion (future)
- Scheduled functions (dailyDigest) orchestrate fetch -> dedupe -> summarize
- Vertex/Gemini for classification & summarization
