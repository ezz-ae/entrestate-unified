
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { getMarketTrends } from '../market-intelligence/get-market-trends';

const CloneListingInputSchema = z.object({
  url: z.string().url().describe('The URL of the listing to clone.'),
  refine: z.boolean().describe('Whether or not to refine the listing with AI.'),
  market: z.object({ name: z.string() }).describe("The market the property is in."),
});
type CloneListingInput = z.infer<typeof CloneListingInputSchema>;

const CloneListingOutputSchema = z.object({
  title: z.string().describe('The title of the listing.'),
  description: z.string().describe('The description of the listing.'),
  keywords: z.array(z.string()).describe('A list of keywords for the listing.'),
});
type CloneListingOutput = z.infer<typeof CloneListingOutputSchema>;

const cloneListingFlow = ai.defineFlow(
  {
    name: 'cloneListingFlow',
    inputSchema: CloneListingInputSchema,
    outputSchema: CloneListingOutputSchema,
  },
  async (input) => {
    // In a real application, you would use a web scraping tool to extract the
    // listing data from the URL. For now, we will use placeholder data.
    const scrapedData = {
      title: 'Luxury 2-Bedroom Apartment in Downtown Dubai',
      description: 'A stunning 2-bedroom apartment with breathtaking views of the Burj Khalifa. This property features a spacious living area, a modern kitchen, and two en-suite bedrooms. Residents will enjoy access to a swimming pool, a gym, and 24-hour security.',
      keyDetails: '2 beds, 2 baths, 1,200 sqft',
      uniqueFeatures: 'Burj Khalifa view, high floor, fully furnished',
    };

    if (input.refine) {
      const marketAnalysis = await getMarketTrends({
        topic: `Market trends for a property with details: ${scrapedData.keyDetails}`,
        market: input.market,
      });

      const prompt = `You are an expert real estate copywriter. Your task is to refine the following listing to make it more compelling and effective, based on the latest market analysis.

        **Original Listing:**
        Title: ${scrapedData.title}
        Description: ${scrapedData.description}

        **Market Analysis:**
        - Overall Sentiment: ${marketAnalysis.overallSentiment}
        - Emerging Trends: ${marketAnalysis.emergingTrends.map(t => t.trend).join(', ')}
        - Key Opportunities: ${marketAnalysis.keyOpportunities.map(o => o.opportunity).join(', ')}

        **Instructions:**
        1.  Rewrite the title to be more captivating and SEO-friendly.
        2.  Rewrite the description to be more persuasive and to highlight the features that are most relevant to the current market trends and opportunities.
        3.  Generate a list of 5-7 powerful keywords for the listing.
        `;
        
      const model = ai.getmodel('gemini-pro');
      const result = await model.generate(prompt);
      const refinedListing = JSON.parse(result.text());
        
      return {
        title: refinedListing.title,
        description: refinedListing.description,
        keywords: refinedListing.keywords,
      };
    }

    return {
      title: scrapedData.title,
      description: scrapedData.description,
      keywords: ['dubai', 'real estate', 'apartment', 'downtown'],
    };
  }
);

export async function cloneListing(input: CloneListingInput): Promise<CloneListingOutput> {
    return cloneListingFlow(input);
}
