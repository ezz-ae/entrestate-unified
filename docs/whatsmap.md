# WhatsMAP — The AI Brain of the Entrestate OS

WhatsMAP is the central intelligence of the ecosystem. It functions as a **Conversational Market Expert**, a **Proactive Co-pilot**, and a powerful **Action Engine**. It understands natural language, orchestrates complex workflows across all suites, and serves as the primary interface for user interaction, whether through the EI-OS workspace or WhatsApp.

## Endpoints & Integration

WhatsMAP's core logic is exposed through Genkit flows, but it also integrates with external services via API endpoints.

-   **EI-OS Integration**: The `WhatsMAPEngine` component directly calls the `runWhatsMAP` flow, passing the user's query and the active suite context (`activeSuite`). This allows for a deeply integrated and context-aware experience.

-   **WhatsApp Integration**:
    -   `GET /api/wa/webhook`: Handles Meta's verification challenge using the `WHATSAPP_WEBHOOK_VERIFY_TOKEN`.
    -   `POST /api/wa/webhook`: Processes inbound user messages.
        -   It maps the user's phone number to their `uid`.
        -   It calls the `runWhatsMAP` flow with the message content.
        -   The rich response is then formatted and sent back to the user via the `/api/wa/send` endpoint.

## The Intelligence Pipeline: From Query to Action

WhatsMAP processes every user query through a sophisticated, three-stage AI pipeline.

1.  **Parse (`/src/lib/qa/parse.ts`)**
    -   **Purpose**: To deconstruct a user's raw, natural language query into a structured JSON command.
    -   **Process**: It uses a specialized Gemini prompt to identify the user's `intent` (e.g., `search_projects`, `compare_projects`) and extract key `entities` (e.g., project names, locations, price filters). This transforms ambiguity into a machine-readable instruction.

2.  **Execute (`/src/lib/qa/execute.ts`)**
    -   **Purpose**: To take the structured command from the Parser and gather all the necessary information.
    -   **Process**: It acts as an orchestrator. Based on the intent, it calls the appropriate internal services (`DataIntelligenceService`) or other AI flows (`getMarketTrends`, `generateListing`, etc.) to fetch data and perform actions.

3.  **Synthesize (`/src/lib/qa/synthesize.ts`)**
    -   **Purpose**: To transform the raw data from the Executor into a polished, insightful, and multi-component user experience.
    -   **Process**: It uses a final Gemini prompt to:
        -   Generate a natural language summary of the findings.
        -   Add valuable AI-driven insights.
        -   Select the best UI components for presenting the information (e.g., carousels, charts, cards).
        -   Proactively suggest the next logical action the user might want to take.

## The Action Engine

When WhatsMAP's **Parse** step identifies an action-oriented intent (like "generate a brochure" or "launch a campaign"), the **Execute** step calls the corresponding high-level AI flow (`generateMarketingKit`, `runSalesPilot`, etc.).

This creates a seamless workflow where a user can conversationally trigger complex, multi-step operations that span across the entire EI-OS, from the Creative Hub to the Meta Intelligence Suite.

## Context-Aware Intelligence

WhatsMAP is always aware of the user's current context within the EI-OS (`activeSuite`). This allows it to:

-   **Provide Proactive Suggestions**: The UI displays a list of relevant commands the user can execute within their current suite.
-   **Disambiguate Queries**: If a user's query is ambiguous (e.g., "generate a report"), WhatsMAP uses the active suite to infer the most likely desired action (a *market* report in the Listing Intelligence suite vs. a *campaign performance* report in the Meta Intelligence suite).
