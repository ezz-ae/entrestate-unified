
'use server';

import { ai, configureGenkit } from '@/ai/genkit';
import { z } from 'zod';
import {
  getMarketTrendsTool,
  verifyListingTool,
  generateMarketingKitTool,
} from '@/ai/tools'; // Corrected the import path

const WhatsMAPInputSchema = z.object({
  query: z.string().describe("The user's natural language query."),
  activeSuite: z.string().optional().describe("The user's current context in the EI-OS."),
});
type WhatsMAPInput = z.infer<typeof WhatsMAPInputSchema>;

const WhatsMAPOutputSchema = z.object({
  response: z.array(z.object({
    type: z.string().describe('The type of content to render (e.g., text, chart, card).'),
    data: z.any().describe('The data for the component.'),
  })).describe('A rich, multi-component response to the user.'),
});
type WhatsMAPOutput = z.infer<typeof WhatsMAPOutputSchema>;

const agent = ai.defineAgent(
  {
    name: 'whatsmapAgent',
    // We are giving the model the ability to use our defined tools
    tools: [getMarketTrendsTool, verifyListingTool, generateMarketingKitTool],
    prompt: `You are WhatsMAP, the AI brain of the Entrestate Intelligence Operating System. You are a friendly, expert, and proactive partner to real estate agents. Your goal is to understand the user's query, use the available tools to find the answer or perform the action, and then provide a clear, insightful, and helpful response.

    - You can use multiple tools in sequence to answer complex questions.
    - If you don't have enough information to use a tool, ask the user for clarification.
    - Before presenting data, always add a valuable insight or a proactive next step.
    - Your final response should be a rich, multi-component experience.`,
  },
  async (input) => {
    const model = ai.getmodel('gemini-pro');
    const result = await model.generate(input);

    // Here, we would add a "Synthesizer" step similar to the previous pipeline
    // to transform the raw tool output into a beautiful UI. For now, we will
    // return a simplified text response.
    return {
      response: [{
        type: 'text',
        data: { text: result.text() },
      }],
    };
  }
);


const whatsmapFlow = ai.defineFlow(
  {
    name: 'runWhatsMAP',
    inputSchema: WhatsMAPInputSchema,
    outputSchema: WhatsMAPOutputSchema,
  },
  async (input) => {
     // This is a simplified call for now. A full implementation would
     // manage conversation history for a true chat experience.
     return agent({ query: input.query });
  }
);

export async function runWhatsMAP(input: WhatsMAPInput): Promise<WhatsMAPOutput> {
  return whatsmapFlow(input);
}
