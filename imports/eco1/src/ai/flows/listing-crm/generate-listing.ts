
'use server';

/**
 * @fileOverview AI flow to generate compelling real estate listing descriptions,
 * enhanced with real-time market data to maximize impact.
 *
 * This flow takes property details, analyzes them against current market trends,
 * and generates a persuasive, SEO-friendly description optimized for platforms
 * like Property Finder and Bayut.
 *
 * @module AI/Flows/GenerateListing
 *
 * @export {function} generateListing - The main function to generate a listing.
 * @export {type} GenerateListingInput - The Zod schema for the input of the flow.
 * @export {type} GenerateListingOutput - The Zod schema for the output of the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getMarketTrends, GetMarketTrendsOutputSchema } from '../market-intelligence/get-market-trends';

/**
 * Defines the schema for the input of the listing generation flow.
 */
export const GenerateListingInputSchema = z.object({
  platform: z.string().describe("The listing platform (e.g., 'Property Finder', 'Bayut')."),
  propertyAddress: z.string().describe('The full address of the property.'),
  keyDetails: z.string().describe('Basic stats like beds, baths, and square footage.'),
  uniqueFeatures: z.string().describe('What makes this property special. Separate features with a comma or newline.'),
  tone: z.enum(['Luxury', 'Family-Friendly', 'Modern', 'Cozy', 'Urgent']).describe('The desired tone for the listing description.'),
  market: z.object({ name: z.string() }).describe("The market the property is in."),
});
export type GenerateListingInput = z.infer<typeof GenerateListingInputSchema>;

/**
 * Defines the schema for the output of the listing generation flow.
 */
export const GenerateListingOutputSchema = z.object({
  title: z.string().describe("A compelling, SEO-friendly title for the listing."),
  description: z.string().describe('The full, persuasive listing description.'),
  keywords: z.array(z.string()).describe("A list of suggested keywords for the listing platform."),
});
export type GenerateListingOutput = z.infer<typeof GenerateListingOutputSchema>;

/**
 * An AI flow that generates a real estate listing description.
 * This function serves as a wrapper for the underlying Genkit flow.
 *
 * @param {GenerateListingInput} input - The input data for generating the listing.
 * @returns {Promise<GenerateListingOutput>} A promise that resolves with the generated listing content.
 */
export async function generateListing(
  input: GenerateListingInput
): Promise<GenerateListingOutput> {
  return generateListingFlow(input);
}

const generateListingPrompt = ai.definePrompt({
  name: 'generateListingPrompt',
  input: {schema: z.object({
    platform: z.string(),
    propertyAddress: z.string(),
    keyDetails: z.string(),
    uniqueFeatures: z.string(),
    tone: z.string(),
    marketAnalysis: GetMarketTrendsOutputSchema,
  })},
  output: {schema: GenerateListingOutputSchema},
  prompt: `You are an expert real estate copywriter specializing in creating high-performing listings for the Dubai market on platforms like {{{platform}}}. You write data-driven copy that converts.

  **Property Details:**
  - **Platform:** {{{platform}}}
  - **Property Address:** {{{propertyAddress}}}
  - **Key Details:** {{{keyDetails}}}
  - **Unique Features:** {{{uniqueFeatures}}}
  - **Tone:** {{{tone}}}

  **Live Market Analysis:**
  - **Overall Sentiment:** {{{marketAnalysis.overallSentiment}}}
  - **Key Opportunities:**
    {{#each marketAnalysis.keyOpportunities}}
    - {{{opportunity}}}: {{{rationale}}}
    {{/each}}
  - **Emerging Trends:**
    {{#each marketAnalysis.emergingTrends}}
    - {{{trend}}}: {{{description}}}
    {{/each}}


  **Instructions:**

  1.  **Create a Data-Driven, Compelling Title:** Write a headline that is both captivating and rich with keywords. **Subtly weave in elements from the live market analysis.** For example, if a key opportunity is "high rental yields for 1-beds," your title could be "High-Yield 1-Bed with Stunning Marina Views."
  2.  **Write a Persuasive Description:** Craft a narrative-driven property description. Start with a hook, detail the unique features, describe the lifestyle, and end with a clear call-to-action. **Strategically highlight features that align with the emerging trends and key opportunities.** For instance, if "home offices" are a trend, emphasize the study nook.
  3.  **Generate Optimized Keywords:** Provide a list of 5-7 powerful keywords. **Base these keywords on the property details AND the market analysis** to capture the most relevant search traffic.
  `,
});

const generateListingFlow = ai.defineFlow(
  {
    name: 'generateListingFlow',
    inputSchema: GenerateListingInputSchema,
    outputSchema: GenerateListingOutputSchema,
  },
  async input => {
    const marketAnalysis = await getMarketTrends({
      topic: `Market trends for a property with details: ${input.keyDetails}`,
      market: input.market,
    });

    const {output} = await generateListingPrompt({
      ...input,
      marketAnalysis,
    });

    if (!output) {
      throw new Error('Failed to generate listing content.');
    }
    return output;
  }
);
