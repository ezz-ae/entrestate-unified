
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateEmailInputSchema = z.object({
  leadProfile: z.any().describe('The profile of the lead to generate an email for.'),
  offer: z.any().describe('The offer to include in the email.'),
});
type GenerateEmailInput = z.infer<typeof GenerateEmailInputSchema>;

const GenerateEmailOutputSchema = z.object({
  subject: z.string().describe('The subject of the email.'),
  body: z.string().describe('The body of the email.'),
});
type GenerateEmailOutput = z.infer<typeof GenerateEmailOutputSchema>;

const generateEmailFlow = ai.defineFlow(
  {
    name: 'generateEmailFlow',
    inputSchema: GenerateEmailInputSchema,
    outputSchema: GenerateEmailOutputSchema,
  },
  async (input) => {
    // In a real application, you would use a more sophisticated algorithm to
    // generate the email. For now, we will just return a placeholder email.
    return {
      subject: `An exclusive offer for you: ${input.offer.offers[0].name}`,
      body: `Dear ${input.leadProfile.matches[0].name},\n\nI hope this email finds you well. Based on your profile, I believe you will be interested in this exclusive offer for a ${input.offer.offers[0].name} for ${input.offer.offers[0].price}.\n\nPlease let me know if you would like to schedule a viewing.\n\nBest regards,\n\nThe Entrestate Team`,
    };
  }
);

export async function generateEmail(input: GenerateEmailInput): Promise<GenerateEmailOutput> {
    return generateEmailFlow(input);
}
