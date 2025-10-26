
'use server';

/**
 * @fileOverview An AI flow to automatically generate a brand kit from a company logo.
 *
 * This flow uses Gemini Vision to analyze a logo image, extract its color palette,
 * and suggest a complete branding guide, including typography and visual style.
 *
 * @module AI/Flows/Creative/GenerateBrandKit
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateBrandKitInputSchema = z.object({
  logoDataUri: z.string().describe("The company logo as a data URI. Must include a MIME type and use Base64 encoding."),
});

const GenerateBrandKitOutputSchema = z.object({
  colors: z.object({
    primary: z.string().describe("The primary brand color in hex format (e.g., '#FFFFFF')."),
    secondary: z.string().describe("The secondary brand color in hex format."),
    accent: z.string().describe("An accent color for CTAs and highlights in hex format."),
    neutral: z.string().describe("A neutral background color in hex format."),
  }),
  fonts: z.object({
    heading: z.string().describe("A suggested Google Font name for headings (e.g., 'Poppins')."),
    body: z.string().describe("A suggested Google Font name for body text (e.g., 'Inter')."),
  }),
  style_description: z.string().describe("A brief description of the brand's visual style (e.g., 'Modern and professional with a bold accent')."),
});
export type GenerateBrandKitOutput = z.infer<typeof GenerateBrandKitOutputSchema>;

const generateBrandKitFlow = ai.defineFlow(
  {
    name: 'generateBrandKitFlow',
    inputSchema: GenerateBrandKitInputSchema,
    outputSchema: GenerateBrandKitOutputSchema,
  },
  async (input) => {
    const prompt = `You are an expert brand designer with a keen eye for aesthetics and usability. Your task is to analyze the provided company logo and generate a complete, professional brand kit.

    **Logo Image:** {{media url=logoDataUri}}

    **Instructions:**
    1.  **Analyze the Logo:** Carefully examine the colors, shapes, and typography of the logo.
    2.  **Extract Color Palette:**
        - Identify the most dominant color as the 'primary' color.
        - Identify a complementary or secondary color as the 'secondary' color.
        - Choose a bold, eye-catching color from the logo for the 'accent' color. This will be used for buttons and calls-to-action.
        - Suggest a light, neutral color that complements the palette for backgrounds.
        - All colors must be in hex format.
    3.  **Suggest Typography:**
        - Recommend a professional and legible Google Font for headings ('heading').
        - Recommend a highly readable Google Font for body text ('body') that pairs well with the heading font.
    4.  **Describe the Style:** Write a short, one-sentence description of the overall brand aesthetic (e.g., "Clean, modern, and trustworthy.").

    **Output Format:**
    Provide ONLY the resulting JSON object. Do not include any other text or formatting.
    `;

    const model = ai.getmodel('gemini-pro-vision');
    const result = await model.generate(prompt);

    try {
      return JSON.parse(result.text());
    } catch (e) {
      console.error("Failed to generate brand kit:", e);
      throw new Error("The AI was unable to generate a brand kit from the provided logo.");
    }
  }
);

export async function generateBrandKit(input: { logoDataUri: string }): Promise<GenerateBrandKitOutput> {
    return generateBrandKitFlow(input);
}
