
🧭 ENTRESTATE ECOSYSTEM – FULL SITE MAP\1
🔹 Public Layer

Path	Description	SEO / Purpose
/	Homepage – Entrestate OS overview, hero with “Talk to WhatsMAP” CTA.	Main landing / SEO: AI Real Estate Operating System
/about	Company vision, mission, and technology overview.	About Entrestate Ecosystem
/solutions	Overview of all suites & verticals.	AI Suites for Real Estate Agents, Developers, and Marketers
/solutions/[slug]	Dynamic page for each solution.	AI Listing Generator, AI PDF Tool, etc.
/appstore	Internal marketplace for activating apps/suites.	Real Estate Appstore by Entrestate
/market-library	Public project intelligence section.	Dubai Project Data, Reports & Market Insights
/project/[id]	Individual project page (powered by projects_full.json).	Project SEO pages: project name, developer, location
/compare	Compare multiple projects (connected to WhatsMAP + PDF).	Compare Off-plan Projects in Dubai
/contact	Contact form + WhatsApp connect.	Conversion page
/privacy	Privacy policy.	Legal
/cookies	Cookie management page.	Legal
/terms	Terms of use.	Legal


⸻

🔹 Interactive Layer (AI + Search)

Path	Description	Function
/whatsmap	Conversational AI hub – real-time market chat (web UI for WhatsMAP).	Core AI Assistant
/discover/search	Global search interface for projects, data, tools.	Unified AI Search
/discover/agents	Directory of agents / brokers (optional future).	Agent Index
/discover/developers	Developer data index.	Developer Profiles
/flows	Library of prebuilt automation flows.	Action Flows UI
/academy	AI learning space for real estate professionals.	Training & Tutorials
/academy/suites/[suiteId]	Individual suite course (Meta, CRM, etc.).	Deep Learning Pages


⸻

🔹 Workspace Layer (User Zone)

Path	Description	Function
/me	User main dashboard (overview).	Personal Hub
/me/gem	GEM AI orchestration panel.	AI Brain Console
/me/dev	Developer / Admin Control.	System Admin Dashboard
/me/flows	Manage active user automations.	Flow Manager
/me/pro-search	Advanced AI search for professional users.	Data-Driven Search
/me/tool/[toolId]	Installed suite details (Appstore plugin logic).	Tool Management
/me/gem/data-importer	Upload CSV/JSON or connect external data.	Data Integration
/me/settings	User preferences & integrations.	Account Settings
/me/billing	Subscription, usage, and limits.	Billing Portal


⸻

🔹 API Layer (Server Functions)

Endpoint	Purpose
/api/wa/webhook	WhatsApp inbound message verification.
/api/wa/send	Send message via WhatsApp Cloud API.
/api/projects/search	Query the Market Library (projects_full.json).
/api/pdf	Generate project or comparison PDFs.
/api/qa/compare	Compare projects via AI and return structured result.
/api/user/update	Sync user profile / preferences.
/api/flows/run	Trigger automation flow.
/api/gem/intent	Intent detection (natural → structured).
/api/dev/jobs	Admin control for queue monitoring.


⸻

🔹 Backend & Data (Non-Routed)

Directory	Description
/functions/src/	Firebase functions (AI runners, triggers, admin ops).
/src/ai/flows/	Genkit + Gemini flows for core automations.
/src/lib/	Utility libraries (tools-data, api-helpers, apify).
/src/services/	Cloud Firestore, Admin SDK, data pipelines.
/docs/	Project documentation and ecosystem guide.
/public/	Static assets, SEO meta images, and open-access JSONs.


⸻

🔹 SEO & Dynamic Content (Automated Generation)

Path	Content Type	Source
/project/[id]	Project micro-page	projects_full.json
/library/[category]	Market report section	marketData collection
/compare/[projectA]-vs-[projectB]	Auto-generated compare pages	/api/qa/compare
/flows/[flowId]	Automation flow detail	flows collection
/academy/[course]	Educational resource	academy collection


⸻

🔹 Future Extensions

Planned	Description
/api/public/data	Open data API for verified partners.
/partners	Showcase of developers & tech partners.
/api/meta/ads	Meta Ads automation endpoint.
/smartagent	LinkedIn / Telegram AI agent for sales.


⸻

🔹 Sitemap XMLs

Auto-generated (Firebase Hosting or Next.js middleware):

/sitemap.xml
/sitemap-projects.xml
/sitemap-apps.xml
/sitemap-articles.xml
