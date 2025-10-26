
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { generateListing } from '../listing-crm/generate-listing';
import { generateSocialPost } from '../meta-pilot/generate-social-post';
import { generateAdFromBrochure } from '../meta-pilot/generate-ad-from-brochure';

const GenerateMarketingKitInputSchema = z.object({
  projectId: z.string().describe('The ID of the project to generate the marketing kit for.'),
  market: z.object({ name: z.string() }).describe("The market the property is in."),
});
type GenerateMarketingKitInput = z.infer<typeof GenerateMarketingKitInputSchema>;

const GenerateMarketingKitOutputSchema = z.object({
  brochure: z.any().describe('The generated brochure.'),
  socialMediaCampaign: z.any().describe('The generated social media campaign.'),
  landingPage: z.any().describe('The generated landing page.'),
});
type GenerateMarketingKitOutput = z.infer<typeof GenerateMarketingKitOutputSchema>;

const generateMarketingKitFlow = ai.defineFlow(
  {
    name: 'generateMarketingKitFlow',
    inputSchema: GenerateMarketingKitInputSchema,
    outputSchema: GenerateMarketingKitOutputSchema,
  },
  async (input) => {
    // In a real application, you would fetch the project data from the database.
    // For now, we will use placeholder data.
    const projectData = {
        name: 'Emaar Beachfront',
        area: 'Dubai Harbour',
        city: 'Dubai',
        priceFrom: 'AED 2,500,000',
    };

    const listing = await generateListing({
        platform: 'Bayut',
        propertyAddress: `${projectData.name}, ${projectData.area}, ${projectData.city}`,
        keyDetails: '3 beds, 3 baths, 1800 sqft',
        uniqueFeatures: 'Private beach access, sea view, infinity pool',
        tone: 'Luxury',
        market: input.market,
    });

    const socialMediaCampaign = await generateSocialPost({
        source: listing.description,
        platform: 'Instagram',
        tone: 'Luxury',
        market: input.market,
    });

    const adCreative = await generateAdFromBrochure({
        projectName: projectData.name,
        focusArea: 'The luxury lifestyle and investment potential.',
        toneOfVoice: 'Professional and aspirational',
    });

    return {
      brochure: adCreative.adDesign,
      socialMediaCampaign,
      landingPage: adCreative.landingPage,
    };
  }
);

export async function generateMarketingKit(input: GenerateMarketingKitInput): Promise<GenerateMarketingKitOutput> {
    return generateMarketingKitFlow(input);
}
