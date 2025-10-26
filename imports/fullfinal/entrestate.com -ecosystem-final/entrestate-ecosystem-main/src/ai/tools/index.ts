
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

// Import the schemas and functions from existing flows using the correct path alias
import { getMarketTrends, GetMarketTrendsInputSchema, GetMarketTrendsOutputSchema } from '@/ai/flows/market-intelligence/get-market-trends';
import { verifyListing } from '@/ai/flows/listing-crm/verify-listing';
import { generateMarketingKit } from '@/ai/flows/super-seller-suite/generate-marketing-kit';

/**
 * A tool that gets the latest real estate market trends for a specific topic.
 * Use this for any questions about market performance, sentiment, or future outlook.
 */
export const getMarketTrendsTool = ai.tool(
  {
    name: 'getMarketTrends',
    description: 'Provides real estate market analysis, trends, sentiment, and future outlook for a given topic.',
    input: GetMarketTrendsInputSchema,
    output: GetMarketTrendsOutputSchema,
  },
  async (input) => getMarketTrends(input)
);

/**
 * A tool to verify a property listing's quality and authenticity.
 * Use this to check for duplicate images, detect false pricing, and get a quality score.
 */
export const verifyListingTool = ai.tool(
  {
    name: 'verifyListing',
    description: 'Analyzes a property listing to check for duplicates, false pricing, and calculates an overall quality score.',
    input: z.object({
        listingId: z.string().describe('The unique ID of the listing to verify.'),
        imageUrl: z.string().url().describe('A URL of a primary image for the listing.'),
        price: z.number().describe('The listed price of the property.'),
    }),
    output: z.any(), // Simplified for this example
  },
  async (input) => verifyListing(input)
);

/**
 * A tool that generates a complete marketing kit for a real estate project.
 * This includes a brochure, a social media campaign, and a landing page.
 */
export const generateMarketingKitTool = ai.tool(
  {
    name: 'generateMarketingKit',
    description: 'Creates a full marketing package for a given project ID, including brochure, social media posts, and landing page designs.',
    input: z.object({
        projectId: z.string().describe("The ID of the project to generate the marketing kit for."),
        market: z.object({ name: z.string() }).describe("The market context, e.g., 'Dubai'."),
    }),
    output: z.any(), // Simplified for this example
  },
  async (input) => generateMarketingKit(input)
);
