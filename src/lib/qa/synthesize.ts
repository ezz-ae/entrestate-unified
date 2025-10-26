
'use server';

/**
 * @fileOverview The final step in the WhatsMAP Q&A pipeline: Synthesizing a user-friendly response.
 *
 * This flow takes the processed data from the 'execute' step and uses Gemini
 * to generate a natural language summary and determine the best way to
 * present the information to the user (e.g., as a chart, a table, or a simple text response).
 *
 * @module Lib/QA/Synthesize
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const SynthesizeResponseInputSchema = z.object({
  query: z.string().describe("The user's original query."),
  executionResult: z.any().describe('The structured data from the execution step.'),
});

const SynthesizeResponseOutputSchema = z.object({
  response: z.array(z.object({
    type: z.string().describe('The type of content to render (e.g., "text", "project-card", "chart").'),
    data: z.any().describe('The data for the component.'),
  })).describe('The final, rich, interactive response for the UI.'),
});

const synthesizeResponseFlow = ai.defineFlow(
  {
    name: 'synthesizeResponseFlow',
    inputSchema: SynthesizeResponseInputSchema,
    outputSchema: SynthesizeResponseOutputSchema,
  },
  async (input) => {
    const { query, executionResult } = input;

    const prompt = `You are the final response synthesizer for the WhatsMAP AI engine. Your job is to take the user's original query and the structured data from the execution engine, and create a friendly, insightful, and helpful response.

    **User's Original Query:** "${query}"
    **Execution Data:**
    \`\`\`json
    ${JSON.stringify(executionResult, null, 2)}
    \`\`\`

    **Instructions:**
    1.  **Summarize the Findings:** Start with a natural language summary. For example, instead of just showing data, say "I found 3 projects that match your criteria. Emaar Beachfront looks like a great option for investment."
    2.  **Select the Best Components:** Based on the data, choose the best UI components to display the information.
        - For a list of projects, use a 'project-carousel' component.
        - For market trends, use a 'market-trends-chart' component in addition to text.
        - For a comparison, suggest creating a PDF with a 'pdf-generation-cta' component.
    3.  **Add Insight:** Don't just present data, add a valuable insight. For example: "Note that while DAMAC Lagoons has a lower entry price, Emaar Beachfront has shown higher rental yields in the last quarter."
    4.  **Suggest Next Actions:** End with a proactive suggestion. For example: "Would you like me to generate a full comparison PDF for these projects?" or "I can create a client-ready presentation with these findings. Shall I proceed?"

    **Output Format:**
    Your output MUST be a valid JSON object containing an array of response components.

    **Example:**
    {
      "response": [
        { "type": "text", "data": { "text": "I found 2 great projects for you to compare!" } },
        { "type": "project-carousel", "data": { "projects": [...] } },
        { "type": "text", "data": { "text": "Note that Emaar Beachfront has a higher potential rental yield. Would you like me to generate a full comparison PDF?" } },
        { "type": "pdf-generation-cta", "data": { "projectIds": ["id1", "id2"] } }
      ]
    }
    
    Now, generate the final JSON response.`;

    const model = ai.getmodel('gemini-pro');
    const result = await model.generate(prompt);

    try {
        return JSON.parse(result.text());
    } catch (e) {
        console.error("Failed to synthesize response:", e);
        return {
            response: [{ type: 'text', data: { text: "I'm having trouble formulating a response right now. Please try again." } }]
        };
    }
  }
);

export async function synthesizeResponse(query: string, executionResult: any) {
    return synthesizeResponseFlow({ query, executionResult });
}
