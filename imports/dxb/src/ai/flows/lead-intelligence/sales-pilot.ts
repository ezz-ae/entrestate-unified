
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { investigateLead } from '../listing-crm/investigate-lead';
import { generateOffer } from '../super-seller-suite/generate-offer';
import { generateEmail } from '../super-seller-suite/generate-email';

const SalesPilotInputSchema = z.object({
  leadId: z.string().describe('The ID of the lead to process.'),
  market: z.object({ name: z.string() }).describe("The market the lead is in."),
});
type SalesPilotInput = z.infer<typeof SalesPilotInputSchema>;

const SalesPilotOutputSchema = z.object({
  leadInvestigation: z.any().describe('The results of the lead investigation.'),
  matchedOffers: z.any().describe('The offers that have been matched to the lead.'),
  emailDraft: z.any().describe('The email that has been drafted to the lead.'),
});
type SalesPilotOutput = z.infer<typeof SalesPilotOutputSchema>;

const salesPilotFlow = ai.defineFlow(
  {
    name: 'salesPilotFlow',
    inputSchema: SalesPilotInputSchema,
    outputSchema: SalesPilotOutputSchema,
  },
  async (input) => {
    const leadInvestigation = await investigateLead({
      name: 'John Doe', // Placeholder
      market: input.market,
    });

    const matchedOffers = await generateOffer({
        leadProfile: leadInvestigation,
        market: input.market,
    });

    const emailDraft = await generateEmail({
        leadProfile: leadInvestigation,
        offer: matchedOffers,
    });

    return {
      leadInvestigation,
      matchedOffers,
      emailDraft,
    };
  }
);

export async function runSalesPilot(input: SalesPilotInput): Promise<SalesPilotOutput> {
    return salesPilotFlow(input);
}
