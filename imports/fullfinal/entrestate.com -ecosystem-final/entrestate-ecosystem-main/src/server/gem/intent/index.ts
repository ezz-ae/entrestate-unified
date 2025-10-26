
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const IntentInputSchema = z.object({
  query: z.string(),
});

const IntentOutputSchema = z.object({
  flowId: z.string().describe("The specific AI flow to execute."),
  params: z.record(z.any()).describe("The parameters to pass to the flow."),
  confidence: z.number().min(0).max(1).describe("The confidence score of the intent detection."),
});

const intentFlow = ai.defineFlow(
  {
    name: 'intentFlow',
    inputSchema: IntentInputSchema,
    outputSchema: IntentOutputSchema,
  },
  async ({ query }) => {
    const prompt = `You are the Intent Engine for GEM, the AI brain of an advanced real estate OS. Your job is to parse a user's query and determine which high-level AI flow to execute and what parameters to use.

    **User Query:** "${query}"

    **Available Flows:**
    - **generateMarketingKit:** (Requires: projectId) - Creates a full marketing package for a property.
    - **runSalesPilot:** (Requires: leadId or leadName) - Manages the sales process for a lead.
    - **getMarketTrends:** (Requires: topic) - Provides market analysis.
    - **verifyListing:** (Requires: listingId) - Checks the quality and authenticity of a listing.

    **Instructions:**
    1.  Analyze the query to determine the best flow.
    2.  Extract the necessary parameters (projectId, leadName, topic, etc.).
    3.  Provide a confidence score. If the query is ambiguous, lower the score.

    **Example:**
    - Query: "Run the sales pilot for John Doe"
    - Output: { "flowId": "runSalesPilot", "params": { "leadName": "John Doe" }, "confidence": 0.95 }
    
    Provide ONLY the JSON output.`;

    const model = ai.getmodel('gemini-pro');
    const result = await model.generate(prompt);
    
    try {
        return JSON.parse(result.text());
    } catch {
        return { flowId: 'unknown', params: {}, confidence: 0.2 };
    }
  }
);

export async function determineIntent(query: string) {
    return intentFlow({ query });
}
