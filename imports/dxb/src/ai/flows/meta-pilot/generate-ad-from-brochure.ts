
'use server';

/**
 * @fileOverview AI-powered ad generation from project brochures or a simple project name,
 * enhanced with market intelligence to create strategically relevant ad creative.
 *
 * This flow generates compelling ad copy and a visually appealing ad design based on a project brochure (if provided) or just a project name, along with branding guidelines.
 *
 * @module AI/Flows/GenerateAdFromBrochure
 *
 * @export {function} generateAdFromBrochure - The main function to generate an ad.
 * @export {type} GenerateAdFromBrochureInput - The Zod schema for the input of the flow.
 * @export {type} GenerateAdFromBrochureOutput - The Zod schema for the output of the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { GenerateAdFromBrochureInputSchema, GenerateAdFromBrochureOutputSchema, GenerateAdFromBrochureInput, GenerateAdFromBrochureOutput } from '@/ai/flows/types';
import { GetMarketTrendsOutputSchema } from '../market-intelligence/get-market-trends';

/**
 * An AI flow that generates ad copy and designs from a project brochure or name.
 * This function serves as a wrapper for the underlying Genkit flow.
 *
 * @param {GenerateAdFromBrochureInput} input - The input data for generating the ad.
 * @returns {Promise<GenerateAdFromBrochureOutput>} A promise that resolves with the generated ad copy and design.
 */
export async function generateAdFromBrochure(
  input: GenerateAdFromBrochureInput
): Promise<GenerateAdFromBrochureOutput> {
  return generateAdFromBrochureFlow(input);
}

const generateAdFromBrochurePrompt = ai.definePrompt({
  name: 'generateAdFromBrochurePrompt',
  input: {schema: z.object({
    brochureDataUri: z.string().optional(),
    projectName: z.string().optional(),
    additionalInformation: z.string().optional(),
    focusArea: z.string(),
    toneOfVoice: z.string(),
    marketAnalysis: GetMarketTrendsOutputSchema.optional(),
  })},
  output: {schema: GenerateAdFromBrochureOutputSchema},
  prompt: `You are an AI-powered advertising expert for real estate. Your task is to generate compelling ad copy and a visually appealing ad design (as a one-page brochure PDF) that is strategically aligned with the latest market intelligence.

  **Project Details:**
  - Focus Area: {{{focusArea}}}
  {{#if projectName}}- Project Name: {{{projectName}}}{{/if}}
  {{#if additionalInformation}}- Additional Information: {{{additionalInformation}}}{{/if}}
  {{#if brochureDataUri}}- Brochure: {{media url=brochureDataUri}}{{else}}- Instruction: If no brochure is provided, create a high-quality, professional one-page brochure for the project name given. Use placeholder text and images that match the focus area.{{/if}}

  **Branding Guidelines:**
  - Tone of Voice: {{{toneOfVoice}}}

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

  1.  **Generate Market-Aware Ad Copy:** Write engaging and persuasive ad copy. **Crucially, this copy must be informed by the live market analysis.** For example, if a key opportunity is "high rental yields," the ad copy should emphasize the investment potential. If a trend is "demand for home offices," highlight the property's study or flexible space.
  2.  **Create a Trend-Aligned Ad Design:** Generate a one-page PDF brochure that is visually consistent with a modern, professional brand identity. **The design and imagery should reflect the market trends.** For example, if the trend is "eco-friendly living," use imagery that showcases green spaces and sustainable features.
  3.  **Design a High-Converting Landing Page:** Create a landing page design that is a seamless extension of the ad. It should be visually appealing and optimized for lead capture, with a clear call-to-action.

  Ensure that all generated assets (ad copy, ad design, landing page) are cohesive and strategically aligned with both the project details and the latest market intelligence.
  `,
});

const generateAdFromBrochureFlow = ai.defineFlow(
  {
    name: 'generateAdFromBrochureFlow',
    inputSchema: GenerateAdFromBrochureInputSchema,
    outputSchema: GenerateAdFromBrochureOutputSchema,
  },
  async input => {
    const {output} = await generateAdFromBrochurePrompt(input);
    return output!;
  }
);
