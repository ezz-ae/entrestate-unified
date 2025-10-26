
'use server';

/**
 * @fileOverview AI flow to generate a one-week social media strategy from a given topic or URL,
 * optimized with real-time market intelligence.
 *
 * This flow creates a comprehensive, one-week social media plan, including multiple post
 * variations, a tiered hashtag strategy, and specific image suggestions, all aligned with
 * current market trends.
 *
 * @module AI/Flows/GenerateSocialPost
 *
 * @export {function} generateSocialPost - The main function to generate a social media strategy.
 * @export {type} GenerateSocialPostInput - The Zod schema for the input of the flow.
 * @export {type} GenerateSocialPostOutput - The Zod schema for the output of the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getMarketTrends, GetMarketTrendsOutputSchema } from '../market-intelligence/get-market-trends';

/**
 * Defines the schema for the input of the social post generation flow.
 */
const GenerateSocialPostInputSchema = z.object({
  /**
   * The source content for the post, which can be a URL or a simple topic description.
   */
  source: z
    .string()
    .describe('A URL or topic to generate the social media post from.'),
  /**
   * The target social media platform for the post.
   * @example "Twitter", "LinkedIn", "Facebook"
   */
  platform: z
    .string()
    .describe(
      'The social media platform (e.g., Twitter, LinkedIn, Facebook).'
    ),
  /**
   * The desired tone of voice for the post.
   * @example "Professional", "Humorous", "Urgent"
   */
  tone: z.string().describe('The desired tone of voice for the post.'),
  market: z.object({ name: z.string() }).describe("The market to target."),
});
export type GenerateSocialPostInput = z.infer<
  typeof GenerateSocialPostInputSchema
>;

/**
 * Defines the schema for the output of the social post generation flow.
 */
const GenerateSocialPostOutputSchema = z.object({
  posts: z.array(z.object({
    day: z.string().describe("The day of the week for the post (e.g., 'Monday')."),
    postContent: z.string().describe('The generated social media post content for that day.'),
    imageSuggestion: z.string().describe('A suggestion for an accompanying image for that day\'s post.'),
  })).describe("A list of posts for a 7-day week."),
  hashtagStrategy: z.object({
    primary: z.array(z.string()).describe("5-7 primary, high-volume hashtags."),
    secondary: z.array(z.string()).describe("5-7 secondary, niche-specific hashtags."),
    location: z.array(z.string()).describe("3-5 location-based hashtags."),
  }).describe("A comprehensive hashtag strategy."),
});
export type GenerateSocialPostOutput = z.infer<
  typeof GenerateSocialPostOutputSchema
>;

/**
 * An AI flow that generates a social media post from a topic or URL.
 * This function serves as a wrapper for the underlying Genkit flow.
 *
 * @param {GenerateSocialPostInput} input - The input data for generating the post.
 * @returns {Promise<GenerateSocialPostOutput>} A promise that resolves with the generated social post content.
 */
export async function generateSocialPost(
  input: GenerateSocialPostInput
): Promise<GenerateSocialPostOutput> {
  return generateSocialPostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSocialPostPrompt',
  input: {schema: z.object({
    source: z.string(),
    platform: z.string(),
    tone: z.string(),
    marketAnalysis: GetMarketTrendsOutputSchema,
  })},
  output: {schema: GenerateSocialPostOutputSchema},
  prompt: `You are an expert real estate social media strategist for the Dubai market. Your task is to create a complete, 7-day content plan that is not only engaging but also strategically aligned with the latest market intelligence.

  **Source Content:** {{{source}}}
  **Platform:** {{{platform}}}
  **Tone:** {{{tone}}}

  **Live Market Analysis:**
  - **Overall Sentiment:** {{{marketAnalysis.overallSentiment}}}
  - **Emerging Trends:**
    {{#each marketAnalysis.emergingTrends}}
    - {{{trend}}}: {{{description}}}
    {{/each}}
  - **Key Opportunities:**
    {{#each marketAnalysis.keyOpportunities}}
    - {{{opportunity}}}: {{{rationale}}}
    {{/each}}

  **Instructions:**

  1.  **Weekly Content Plan (Market-Aware):** Generate a unique, engaging post for each day of the week (Monday to Sunday). **Each post must be inspired by both the source content AND the live market analysis.** For example, if a trend is "increased demand for sustainable homes," your Tuesday post could be "Discover 5 eco-friendly features in our latest listing that are saving owners money."
  2.  **Image Suggestions (Trend-Aligned):** For each daily post, provide a specific image suggestion that reflects the market-aware content.
  3.  **Hashtag Strategy (Intelligent Tiers):** Create a comprehensive hashtag strategy. **The hashtags should be influenced by the market trends.**
      *   **Primary:** 5-7 high-volume hashtags (e.g., #dubairealestate).
      *   **Secondary:** 5-7 niche hashtags directly related to the market trends (e.g., #ecoluxury, #smartinvesting).
      *   **Location:** 3-5 location-based hashtags.

  Structure the output to be a complete, ready-to-use strategy that positions the user as a market expert.
  `,
});

const generateSocialPostFlow = ai.defineFlow(
  {
    name: 'generateSocialPostFlow',
    inputSchema: GenerateSocialPostInputSchema,
    outputSchema: GenerateSocialPostOutputSchema,
  },
  async input => {
    const marketAnalysis = await getMarketTrends({
        topic: `Social media content about ${input.source}`,
        market: input.market,
    });

    const {output} = await prompt({
        ...input,
        marketAnalysis,
    });
    return output!;
  }
);
