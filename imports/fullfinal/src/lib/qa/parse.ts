
'use server';

/**
 * @fileOverview The first step in the WhatsMAP Q&A pipeline: Parsing natural language.
 *
 * This flow takes a raw user query and uses Gemini to convert it into a
 * structured JSON object, identifying the user's intent and extracting key
 * entities like project names, locations, and filters.
 *
 * @module Lib/QA/Parse
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ParseQueryInputSchema = z.object({
  query: z.string().describe('The raw natural language query from the user.'),
});

const ParseQueryOutputSchema = z.object({
  intent: z.enum([
      'search_projects', 
      'compare_projects', 
      'get_market_trends', 
      'generate_content',
      'unknown'
  ]).describe('The primary intent of the user.'),
  entities: z.record(z.any()).describe('A structured object of extracted entities. For example: { "filters": { "area": "Downtown Dubai", "bedrooms": 2, "price_max": 3000000 }, "project_names": ["Emaar Beachfront", "DAMAC Lagoons"] }'),
  response_format: z.enum(['text', 'pdf', 'email']).optional().describe('The desired output format, if specified.'),
}).describe('The structured interpretation of the user\'s query.');

const parseQueryFlow = ai.defineFlow(
  {
    name: 'parseQueryFlow',
    inputSchema: ParseQueryInputSchema,
    outputSchema: ParseQueryOutputSchema,
  },
  async (input) => {
    const prompt = `You are a world-class natural language understanding engine for a real estate platform. Your task is to parse a user's query into a structured JSON object.

    **User Query:** "${input.query}"

    **Available Intents:**
    - **search_projects:** For finding properties or projects.
    - **compare_projects:** For comparing two or more projects.
    - **get_market_trends:** For questions about market statistics or news.
    - **generate_content:** For requests to create something (e.g., brochure, social post, listing).
    - **unknown:** If the intent is unclear.

    **Extraction Rules:**
    - Extract key filters: 'area', 'developer', 'price_min', 'price_max', 'bedrooms', 'status' (off-plan, ready), 'property_type' (villa, apartment).
    - Extract project names mentioned.
    - If the user asks for a specific output like a "PDF" or "email", identify it.

    **Example:**
    - Query: "Find me 2 bedroom apartments in Downtown Dubai under 3M and compare them to Emaar Beachfront in a PDF"
    - Output:
      {
        "intent": "compare_projects",
        "entities": {
          "filters": {
            "property_type": "apartment",
            "bedrooms": 2,
            "area": "Downtown Dubai",
            "price_max": 3000000
          },
          "project_names": ["Emaar Beachfront"]
        },
        "response_format": "pdf"
      }
      
    Now, parse the user's query and provide ONLY the resulting JSON object.`;

    const model = ai.getmodel('gemini-pro');
    const result = await model.generate(prompt);

    try {
        return JSON.parse(result.text());
    } catch (e) {
        console.error("Failed to parse query:", e);
        return { intent: 'unknown', entities: {} };
    }
  }
);

export async function parseQuery(query: string) {
    return parseQueryFlow({ query });
}
