
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { getMarketTrends } from '../market-intelligence/get-market-trends';

const GenerateBlogPostInputSchema = z.object({
  topic: z.string().describe('The topic of the blog post.'),
  market: z.object({ name: z.string() }).describe("The market to focus on."),
});
type GenerateBlogPostInput = z.infer<typeof GenerateBlogPostInputSchema>;

const GenerateBlogPostOutputSchema = z.object({
  title: z.string().describe('The title of the blog post.'),
  content: z.string().describe('The full content of the blog post in Markdown format.'),
  tags: z.array(z.string()).describe('A list of relevant tags for the blog post.'),
});
type GenerateBlogPostOutput = z.infer<typeof GenerateBlogPostOutputSchema>;

const generateBlogPostFlow = ai.defineFlow(
  {
    name: 'generateBlogPostFlow',
    inputSchema: GenerateBlogPostInputSchema,
    outputSchema: GenerateBlogPostOutputSchema,
  },
  async (input) => {
    const marketAnalysis = await getMarketTrends({
      topic: input.topic,
      market: input.market,
    });

    const prompt = `You are an expert real estate content writer. Your task is to generate a high-quality, SEO-friendly blog post based on the provided topic and market analysis.

      **Topic:** ${input.topic}

      **Market Analysis:**
      - Sentiment: ${marketAnalysis.overallSentiment}
      - Emerging Trend: ${marketAnalysis.emergingTrends[0].trend} - ${marketAnalysis.emergingTrends[0].description}

      **Instructions:**
      - Write a compelling, in-depth blog post of at least 500 words.
      - The blog post should be in Markdown format.
      - The blog post should be informative, engaging, and provide real value to the reader.
      - The blog post should be SEO-friendly, with a clear title, relevant keywords, and a strong call to action.
      - The blog post should include a list of relevant tags.
      `;

    const model = ai.getmodel('gemini-pro');
    const result = await model.generate(prompt);
    
    // In a real application, we would parse the result more robustly.
    // For now, we'll make some assumptions.
    const title = result.text().split('\n')[0].replace('# ', '');
    const content = result.text();
    const tags = ['real estate', 'dubai', 'investment', 'market trends'];

    return {
      title,
      content,
      tags,
    };
  }
);

export async function generateBlogPost(input: GenerateBlogPostInput): Promise<GenerateBlogPostOutput> {
    return generateBlogPostFlow(input);
}
