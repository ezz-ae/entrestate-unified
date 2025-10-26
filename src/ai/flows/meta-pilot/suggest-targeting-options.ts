
'use server';

/**
 * @fileOverview AI flow to suggest targeting options for ad campaigns based on project details,
 * target audience, and real-time market intelligence.
 *
 * This flow provides a detailed list of targeting options, including demographics, interests,
 * behaviors, and keywords, to help optimize ad campaigns for real estate projects.
 *
 * @module AI/Flows/SuggestTargetingOptions
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import { SuggestTargetingOptionsInputSchema, SuggestTargetingOptionsOutputSchema, SuggestTargetingOptionsInput, SuggestTargetingOptionsOutput } from '@/ai/flows/types';
import { getProjectById } from '@/services/database.server';
import { GetMarketTrendsOutputSchema } from '../market-intelligence/get-market-trends';


/**
 * An AI flow that suggests targeting options for an ad campaign.
 * This function serves as a wrapper for the underlying Genkit flow.
 *
 * @param {SuggestTargetingOptionsInput} input - The input data for suggesting targeting options.
 * @returns {Promise<SuggestTargetingOptionsOutput>} A promise that resolves with the suggested targeting options.
 */
export async function suggestTargetingOptions(
  input: SuggestTargetingOptionsInput
): Promise<SuggestTargetingOptionsOutput> {
  return suggestTargetingOptionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTargetingOptionsPrompt',
  input: {schema: z.object({
    projectId: z.string(),
    projectName: z.string(),
    area: z.string().optional(),
    city: z.string(),
    priceFrom: z.string().optional(),
    marketAnalysis: GetMarketTrendsOutputSchema.optional(),
  })},
  output: {schema: SuggestTargetingOptionsOutputSchema},
  prompt: `You are an expert in digital marketing and advertising, specializing in real estate.
  Based on the provided project details and live market analysis, suggest 2-3 distinct targeting strategies for an ad campaign on platforms like Meta (Facebook/Instagram) and Google.

  **Project Details:**
  - Name: {{projectName}}
  - Location: {{area}}, {{city}}
  - Property Type: "Luxury High-rise Condo"
  - Price Range: {{priceFrom}}
  - Key Amenities: "Rooftop infinity pool, 24/7 concierge, state-of-the-art gym, valet parking"
  - Past Buyers Profile: High-net-worth individuals, tech executives, international investors.

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
  
  1.  **Analyze the Project & Market**: Based on the property details and the live market analysis, infer the most likely buyer personas. **Your strategies must be data-driven and reflect the current market opportunities.**
  2.  **Generate 2-3 Distinct Strategies**: Create multiple, distinct targeting strategies. For each strategy, recommend the most appropriate Meta Audience Type. **Crucially, the strategies should be inspired by the market analysis.** For example:
      - **Strategy 1 (Trend-Based): The 'Downsizer' Persona**: If a trend is "empty-nesters downsizing to luxury condos," create a detailed targeting profile for this group.
      - **Strategy 2 (Opportunity-Based): The 'Golden Visa' Investor**: If an opportunity is "increased interest from international investors seeking Golden Visas," target this specific demographic in key international markets.
      - **Strategy 3: Past Buyer Lookalikes**: Suggest creating a 'Lookalike Audience' based on past buyer profiles to find similar users.
  3.  **Detail Each Strategy**: For each strategy, provide a clear name, the audience type, and a detailed breakdown of:
      - **Demographics:** Location, Age, Language, etc.
      - **Interests (for Facebook/Instagram):** Specific, actionable interests to target, informed by the market analysis.
      - **Keywords (for Google Ads):** High-intent keywords for search campaigns that align with the market trends.
  4.  **Format the Output**: Structure your response strictly according to the 'strategies' array in the output schema.
`,
});

const suggestTargetingOptionsFlow = ai.defineFlow(
  {
    name: 'suggestTargetingOptionsFlow',
    inputSchema: SuggestTargetingOptionsInputSchema,
    outputSchema: SuggestTargetingOptionsOutputSchema,
  },
  async (input) => {
    // Fetch real project data using the database service
    const projectData = await getProjectById(input.projectId);
    if (!projectData) {
        throw new Error(`Project with ID "${input.projectId}" not found.`);
    }

    // Pass the real data to the prompt
    const { output } = await prompt({
        ...input,
        // Spread the fetched project data into the prompt input
        projectName: projectData?.name || 'N/A',
        area: projectData?.area || 'N/A',
        city: projectData?.city || 'N/A',
        priceFrom: projectData?.priceFrom?.toString() || 'N/A',
    });
    
    if (!output) {
        throw new Error('Failed to generate targeting options.');
    }
    return output;
  }
);
