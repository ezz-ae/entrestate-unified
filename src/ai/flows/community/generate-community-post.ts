
'use server';

/**
 * @fileOverview An advanced AI flow to generate a wide variety of engaging posts for the community feed.
 *
 * This flow is the engine of the Community Hub, capable of creating everything from
 * market insights and practical tips to simulated user questions and celebratory deal announcements.
 * Its primary goal is to foster a vibrant, active community, even with a small user base.
 *
 * @module AI/Flows/Community/GenerateCommunityPost
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { getMarketTrends } from '../market-intelligence/get-market-trends';

const GenerateCommunityPostInputSchema = z.object({
  postType: z.enum([
    'market-insight', 
    'daily-tip', 
    'conversation-starter',
    'who-knows-question', // AI asking a question as if it were a user
    'top-rank-announcement', // Announcing a top performer
  ]).describe('The type of post to generate.'),
  market: z.object({ name: z.string() }).describe("The market to focus on."),
});
type GenerateCommunityPostInput = z.infer<typeof GenerateCommunityPostInputSchema>;

const GenerateCommunityPostOutputSchema = z.object({
  content: z.string().describe('The generated post content.'),
  author: z.string().describe('The author of the post (e.g., "AI Market Analyst", "Alex a real estate agent").'),
  authorTitle: z.string().describe('The title of the author (e.g., "AI Coach", "Top Agent").'),
});
type GenerateCommunityPostOutput = z.infer<typeof GenerateCommunityPostOutputSchema>;

const generateCommunityPostFlow = ai.defineFlow(
  {
    name: 'generateCommunityPostFlow',
    inputSchema: GenerateCommunityPostInputSchema,
    outputSchema: GenerateCommunityPostOutputSchema,
  },
  async (input) => {
    const marketAnalysis = await getMarketTrends({
      topic: `A ${input.postType} for real estate agents`,
      market: input.market,
    });

    const prompt = `You are an AI community manager for a hyper-realistic, intelligent real estate ecosystem. Your primary goal is to make the community feel bustling, knowledgeable, and engaging. Create a community post based on the following instructions.

      **Post Type:** ${input.postType}

      **Latest Market Trend:** ${marketAnalysis.emergingTrends[0].trend} - ${marketAnalysis.emergingTrends[0].description}
      **Key Market Opportunity:** ${marketAnalysis.keyOpportunities[0].opportunity} - ${marketAnalysis.keyOpportunities[0].rationale}

      **Instructions:**
      - **Persona is Key:** Your response should be ONLY the JSON object, nothing else.
      - **Market Insight:** As the "AI Market Analyst", provide a sharp, concise insight based on the latest trend.
      - **Daily Tip:** As the "AI Coach", offer a practical, actionable tip related to the key opportunity.
      - **Conversation Starter:** As the "Community AI", ask an open-ended question to spark discussion.
      - **"Who Knows?" Question:** Adopt the persona of a real estate agent (e.g., "Sarah from Downtown", "Agent Alex"). Ask a specific, real-world question that another agent could answer. For example: "Who knows a good staging company for luxury villas in Palm Jumeirah?" or "Who is the main person to talk to at the Emaar sales center for bulk deals?". Make it sound authentic.
      - **Top Rank Announcement:** As the "Entrestate AI", announce a fictional "Top Agent of the Week" with impressive (but plausible) stats. This is for gamification. Example: "A huge congrats to Maria S. for closing 5 deals this week and topping our leaderboard! Your hard work is an inspiration. #TopAgent".

      **Output Format (JSON only):**
      {
        "content": "<The generated post content>",
        "author": "<The generated author name>",
        "authorTitle": "<The generated author title>"
      }
      `;

    const model = ai.getmodel('gemini-pro');
    const result = await model.generate(prompt);
    
    try {
        const parsedResult = JSON.parse(result.text());
        return parsedResult;
    } catch (error) {
        console.error("Failed to parse AI response:", error);
        // Fallback in case of parsing error
        return {
            content: "Here's a fresh update from the market!",
            author: "Community AI",
            authorTitle: "AI Assistant",
        };
    }
  }
);

export async function generateCommunityPost(input: GenerateCommunityPostInput): Promise<GenerateCommunityPostOutput> {
    return generateCommunityPostFlow(input);
}
