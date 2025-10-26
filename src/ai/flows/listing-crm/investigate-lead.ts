
'use server';

/**
 * @fileOverview An AI flow to investigate a lead across various online sources,
 * enriched with real-time market analysis.
 *
 * This flow takes basic lead information, searches public sources (simulated),
 * analyzes the lead in the context of the current market, and returns a
 * comprehensive profile with a summary and confidence score.
 *
 * @module AI/Flows/InvestigateLead
 *
 * @export {function} investigateLead - The main function to investigate a lead.
 */

import {ai} from '@/ai/genkit';
import {
  InvestigateLeadInputSchema as BaseInvestigateLeadInputSchema,
  InvestigateLeadOutputSchema as BaseInvestigateLeadOutputSchema,
  InvestigateLeadInput,
  InvestigateLeadOutput,
} from '@/ai/flows/types';
import { getMarketTrends, GetMarketTrendsOutputSchema } from '../market-intelligence/get-market-trends';
import { z } from 'zod';

// Extend the base schemas to include market analysis
export const InvestigateLeadInputSchema = BaseInvestigateLeadInputSchema.extend({
  market: z.object({ name: z.string() }).describe("The market to analyze."),
});

export const InvestigateLeadOutputSchema = BaseInvestigateLeadOutputSchema.extend({
    marketAnalysis: GetMarketTrendsOutputSchema.describe("An analysis of the lead in the context of the current market."),
});


const investigateLeadPrompt = ai.definePrompt({
  name: 'investigateLeadPrompt',
  input: {schema: z.object({
    name: z.string(),
    company: z.string().optional(),
    email: z.string().optional(),
    location: z.string().optional(),
    role: z.string().optional(),
    marketAnalysis: GetMarketTrendsOutputSchema,
  })},
  output: {schema: BaseInvestigateLeadOutputSchema},
  prompt: `You are an expert lead investigator and open-source intelligence (OSINT) analyst for the real estate industry. Your task is to find information about a potential lead and analyze them in the context of the current market.

  **Lead Details:**
  - Name: {{{name}}}
  {{#if company}}- Company: {{{company}}}{{/if}}
  {{#if email}}- Email: {{{email}}}{{/if}}
  {{#if location}}- Location: {{{location}}}{{/if}}
  {{#if role}}- Role: {{{role}}}{{/if}}

  **Current Market Analysis:**
  {{#with marketAnalysis}}
  - Sentiment: {{overallSentiment}}
  - Key Opportunities:
    {{#each keyOpportunities}}
    - {{opportunity}}: {{rationale}}
    {{/each}}
  {{/with}}

  **Instructions:**

  1.  **Simulate Search:** Based on the lead's details, simulate a search across professional networks (like LinkedIn), social media (Facebook, Instagram), and the web.
  2.  **Generate Matches:** Create 1-3 plausible but fictional matches. For each match:
      *   Provide a name, the source (e.g., "LinkedIn"), a fictional but valid-looking profile URL.
      *   Write a summary of the person's fictional profile (e.g., title, company, a brief bio snippet).
      *   Assign a confidence score based on how well the fictional profile matches the input details.
  3.  **Provide an AI-Powered Summary:** Write a brief overall summary of your findings. **Crucially, analyze the lead's potential in the context of the current market analysis.** For example: "I found a strong potential match on LinkedIn who is a 'Senior Project Manager' at a major developer. Given the current market trend of increasing demand for off-plan properties (see market analysis), this individual could be a key decision-maker in upcoming projects and represents a high-value lead."

  Return the results in the specified format, but only the lead investigation part. The market analysis is for your context only.
  `,
});

const investigateLeadFlow = ai.defineFlow(
  {
    name: 'investigateLeadFlow',
    inputSchema: InvestigateLeadInputSchema,
    outputSchema: InvestigateLeadOutputSchema,
  },
  async input => {

    const marketTrends = await getMarketTrends({
        topic: `real estate investment trends related to a ${input.role || 'professional'} in ${input.location || 'the area'}`,
        market: input.market,
    });

    const {output} = await investigateLeadPrompt({
        ...input,
        marketAnalysis: marketTrends,
    });

    if (!output) {
      throw new Error('The AI failed to investigate the lead.');
    }
    
    return {
        ...output,
        marketAnalysis: marketTrends,
    };
  }
);


/**
 * An AI flow that investigates a lead.
 *
 * @param {InvestigateLeadInput} input - The input data for the investigation.
 * @returns {Promise<InvestigateLeadOutput>} A promise that resolves with the investigation results.
 */
export async function investigateLead(
  input: InvestigateLeadInput
): Promise<InvestigateLeadOutput> {
  // @ts-ignore
  return investigateLeadFlow(input);
}
