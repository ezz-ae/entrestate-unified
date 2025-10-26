
'use server';

/**
 * @fileOverview An AI flow to create a complete Meta (Facebook/Instagram) ad campaign structure,
 * supercharged with real-time market intelligence.
 *
 * This flow acts as an expert ad manager, taking a high-level goal and project details,
 * analyzing them against market trends, and generating a comprehensive, data-driven
 * campaign plan, from campaign objectives down to specific ad creatives.
 *
 * @module AI/Flows/CreateMetaCampaign
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import { CreateMetaCampaignInputSchema, CreateMetaCampaignOutputSchema, CreateMetaCampaignInput, CreateMetaCampaignOutput } from '@/ai/flows/types';
import { GetMarketTrendsOutputSchema } from '../market-intelligence/get-market-trends';


const createMetaCampaignPrompt = ai.definePrompt({
  name: 'createMetaCampaignPrompt',
  input: {schema: z.object({
    campaignGoal: z.string(),
    budget: z.number(),
    durationDays: z.number(),
    projectBrochureDataUri: z.string().optional(),
    marketAnalysis: GetMarketTrendsOutputSchema.optional(),
  })}, 
  output: {schema: CreateMetaCampaignOutputSchema},
  prompt: `You are an expert Meta Ads strategist specializing in real estate. Your task is to take a user\'s goal, project brochure, and live market analysis to create a complete, data-driven, and ready-to-launch campaign structure.

  **User Inputs:**
  - Campaign Goal: {{{campaignGoal}}}
  - Total Budget: {{{budget}}}
  - Duration (Days): {{{durationDays}}}
  {{#if projectBrochureDataUri}}- Project Brochure: {{media url=projectBrochureDataUri}}{{/if}}

  **Live Market Analysis:**
  {{#if marketAnalysis}}
  - **Overall Sentiment:** {{marketAnalysis.overallSentiment}}
  - **Emerging Trends:**
    {{#each marketAnalysis.emergingTrends}}
    - {{{trend}}}: {{{description}}}
    {{/each}}
  - **Key Opportunities:**
    {{#each marketAnalysis.keyOpportunities}}
    - {{{opportunity}}}: {{{rationale}}}
    {{/each}}
  {{else}}
  - No market analysis available.
  {{/if}}

  **Instructions:**

  1.  **Infer Audience (Data-Driven):** Based on the project brochure AND the live market analysis, infer the ideal target audience. **Your audience recommendations must be aligned with the market opportunities.** (e.g., "Given the trend of 'international buyers seeking investment properties,' we should target high-net-worth individuals in key European and Asian markets.").
  2.  **Campaign Name & Objective:** Based on the user's goal and the project, create a clear campaign name and choose the most appropriate Meta Ads objective (e.g., LEAD_GENERATION, AWARENESS, TRAFFIC).
  3.  **Ad Sets (Market-Segmented):**
      - Create at least two ad sets, **each targeting a specific market segment identified in the analysis.** For example, one ad set could target "Local Professionals Seeking Luxury," while another targets "International Investors capitalizaing on {{{marketAnalysis.keyOpportunities[0].opportunity}}}".
      - For each ad set, provide a name and a summary of the recommended targeting strategy (demographics, interests, location), **justifying your choices with the market data.**
      - Calculate a reasonable daily budget for each ad set based on the total budget and duration.
  4.  **Ad Creatives (Trend-Responsive):**
      - Generate at least three distinct ad creative variations.
      - For each creative, write a compelling headline and body text that **speaks directly to the market trends.** For example, if a trend is 'sustainability,' the headline could be "Live Green in the Heart of the City."
      - The call to action MUST be tailored to the specific 'Campaign Goal'.
      - Provide a specific image suggestion for each creative that visually represents the market trend being targeted.
  5.  **Optimization Advice (Actionable & Insightful):** Provide one key piece of advice for running this campaign on Meta's platforms, **linking it back to the market analysis.** (e.g., "Monitor the click-through-rate of the 'International Investor' ad set closely. If it's high, consider allocating more budget to capitalize on this emerging opportunity.").
  6.  **Confirmation**: Output a dummy publishedCampaignId of "campaign-not-published" to indicate the plan is ready.
  `,
});


const createMetaCampaignFlow = ai.defineFlow(
  {
    name: 'createMetaCampaignFlow',
    inputSchema: CreateMetaCampaignInputSchema,
    outputSchema: CreateMetaCampaignOutputSchema,
  },
  async input => {
    const {output} = await createMetaCampaignPrompt(input);
    if (!output) {
      throw new Error('The AI failed to generate a campaign structure.');
    }
    // The responsibility of publishing is now separate. This flow only creates the plan.
    return output;
  }
);


/**
 * An AI flow that generates a full Meta ad campaign structure.
 * This is the exported server function that can be called from client components.
 *
 * @param {CreateMetaCampaignInput} input - The input data for the campaign.
 * @returns {Promise<CreateMetaCampaignOutput>} A promise that resolves with the generated campaign structure.
 */
export async function createMetaCampaign(input: CreateMetaCampaignInput): Promise<CreateMetaCampaignOutput> {
  return createMetaCampaignFlow(input);
}
