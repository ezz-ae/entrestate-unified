
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { DataIntelligenceService } from '@/services/data-intelligence';

const VerifyListingInputSchema = z.object({
  listingId: z.string().describe('The ID of the listing to verify.'),
  imageUrl: z.string().url().describe('The URL of the listing image to verify.'),
  price: z.number().describe('The price of the listing.'),
});
type VerifyListingInput = z.infer<typeof VerifyListingInputSchema>;

const VerifyListingOutputSchema = z.object({
  isDuplicate: z.boolean().describe('Whether the listing is a duplicate.'),
  isFalsePricing: z.boolean().describe('Whether the listing has false pricing.'),
  qualityScore: z.number().min(0).max(100).describe('The quality score of the listing.'),
  recommendations: z.array(z.string()).describe('A list of recommendations for improvement.'),
});
type VerifyListingOutput = z.infer<typeof VerifyListingOutputSchema>;

const verifyListingFlow = ai.defineFlow(
  {
    name: 'verifyListingFlow',
    inputSchema: VerifyListingInputSchema,
    outputSchema: VerifyListingOutputSchema,
  },
  async (input) => {
    const dataService = DataIntelligenceService.getInstance();
    const projects = dataService.getAllProjects();

    // In a real application, you would use Gemini Vision to compare the
    // listing's images to the images in the Unified Market Registry. For
    // now, we will just simulate the process.
    const isDuplicate = Math.random() > 0.5;

    // In a real application, you would use a "Knowledge Graph" to identify
    // false pricing. For now, we will just use a simple heuristic.
    const averagePrice = projects.reduce((acc, p) => acc + parseFloat(p.priceFrom.replace(/[^0-9.-]+/g,"")), 0) / projects.length;
    const isFalsePricing = input.price < averagePrice * 0.8 || input.price > averagePrice * 1.2;

    const qualityScore = Math.floor(Math.random() * 50) + 50; // Random score between 50 and 100

    const recommendations = [
      'Improve the quality of your photos.',
      'Add a virtual tour.',
      'Write a more detailed description.',
    ];

    return {
      isDuplicate,
      isFalsePricing,
      qualityScore,
      recommendations,
    };
  }
);

export async function verifyListing(input: VerifyListingInput): Promise<VerifyListingOutput> {
    return verifyListingFlow(input);
}
