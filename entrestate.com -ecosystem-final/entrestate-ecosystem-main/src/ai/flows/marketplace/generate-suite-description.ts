
'use server';

/**
 * @fileOverview An AI flow to generate dynamic, persuasive, and data-rich descriptions for each suite in the Marketplace.
 *
 * This flow acts as an expert product marketer, creating compelling narratives that
 * explain the value of each suite in the context of the current real estate market.
 *
 * @module AI/Flows/Marketplace/GenerateSuiteDescription
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { getMarketTrends } from '../market-intelligence/get-market-trends';

const GenerateSuiteDescriptionInputSchema = z.object({
  suiteName: z.string().describe('The name of the suite to describe (e.g., "Meta Intelligence Suite").'),
  market: z.object({ name: z.string() }).describe("The market context."),
});
type GenerateSuiteDescriptionInput = z.infer<typeof GenerateSuiteDescriptionInputSchema>;

const GenerateSuiteDescriptionOutputSchema = z.object({
  tagline: z.string().describe("A short, catchy tagline for the suite."),
  description: z.string().describe('A detailed, persuasive description of the suite.'),
  features: z.array(z.object({
    name: z.string().describe("The name of the feature."),
    description: z.string().describe("A description of the feature."),
  })).describe("A list of key features."),
  marketContext: z.string().describe("An explanation of how the suite helps agents capitalize on current market trends."),
});
type GenerateSuiteDescriptionOutput = z.infer<typeof GenerateSuiteDescriptionOutputSchema>;

const generateSuiteDescriptionFlow = ai.defineFlow(
  {
    name: 'generateSuiteDescriptionFlow',
    inputSchema: GenerateSuiteDescriptionInputSchema,
    outputSchema: GenerateSuiteDescriptionOutputSchema,
  },
  async (input) => {
    const marketAnalysis = await getMarketTrends({
      topic: `How the ${input.suiteName} can help real estate agents`,
      market: input.market,
    });

    const prompt = `You are an expert product marketer for a revolutionary AI-powered real estate platform. Your task is to generate a compelling, detailed, and data-driven description for a suite in the marketplace.

      **Suite Name:** ${input.suiteName}

      **Latest Market Trend:** ${marketAnalysis.emergingTrends[0].trend} - ${marketAnalysis.emergingTrends[0].description}
      **Key Market Opportunity:** ${marketAnalysis.keyOpportunities[0].opportunity} - ${marketAnalysis.keyOpportunities[0].rationale}

      **Instructions:**
      1.  **Tagline:** Create a short, catchy tagline for the suite.
      2.  **Description:** Write a detailed, persuasive description of the suite. What problem does it solve? Who is it for?
      3.  **Key Features:** List and describe 3-5 key features of the suite.
      4.  **Market Context:** Write a compelling section that explains how this suite helps agents capitalize on the current market trends and opportunities. Use the market analysis provided. For example: "In a market where buyers are increasingly looking for sustainable homes, the Creative Intelligence Suite allows you to generate stunning visuals that highlight the eco-friendly features of your listings."

      **Output Format (JSON only):**
      {
        "tagline": "<The generated tagline>",
        "description": "<The generated description>",
        "features": [
          { "name": "<Feature 1 Name>", "description": "<Feature 1 Description>" },
          { "name": "<Feature 2 Name>", "description": "<Feature 2 Description>" }
        ],
        "marketContext": "<The generated market context>"
      }
      `;

    const model = ai.getmodel('gemini-pro');
    const result = await model.generate(prompt);
    
    return JSON.parse(result.text());
  }
);

export async function generateSuiteDescription(input: GenerateSuiteDescriptionInput): Promise<GenerateSuiteDescriptionOutput> {
    return generateSuiteDescriptionFlow(input);
}
