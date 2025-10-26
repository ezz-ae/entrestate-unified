
'use server';

/**
 * @fileOverview The AI Assistant, a central conversational intelligence for the Entrestate OS.
 *
 * This flow acts as a "router," understanding user queries and delegating them to the
 * appropriate specialized tool, such as fetching project data, analyzing market trends,
 * or investigating leads. It then synthesizes the information into a conversational response.
 *
 * @module AI/Flows/CoreAI/AIAssistant
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { getProjectById } from '@/lib/database';
import { getMarketTrends } from '../market-intelligence/get-market-trends';
import { investigateLead } from '../listing-crm/investigate-lead';

// Define the schemas for the AI Assistant
const AIAssistantInputSchema = z.object({
  query: z.string().describe('The user\'s question for the AI assistant.'),
  market: z.object({ name: z.string() }).describe("The market context for the query."),
});
type AIAssistantInput = z.infer<typeof AIAssistantInputSchema>;

const AIAssistantOutputSchema = z.object({
  response: z.string().describe('The AI assistant\'s conversational response.'),
  toolUsed: z.string().describe('The specialized tool that was used to answer the query.'),
});
type AIAssistantOutput = z.infer<typeof AIAssistantOutputSchema>;


const aiAssistantFlow = ai.defineFlow(
  {
    name: 'aiAssistantFlow',
    inputSchema: AIAssistantInputSchema,
    outputSchema: AIAssistantOutputSchema,
  },
  async (input) => {
    // This is a simplified router. A more advanced implementation would use a
    // dedicated model to classify the intent of the query.
    if (input.query.toLowerCase().includes('project')) {
      // Extract project ID from the query (this would need to be more robust)
      const projectId = input.query.split(' ').pop();
      const projectData = await getProjectById(projectId || '');
      if (projectData) {
        return {
          response: `I found information about the project: ${projectData.name}. It's located in ${projectData.area}, ${projectData.city}. What would you like to know about it?`,
          toolUsed: 'getProjectById',
        };
      } else {
        return {
          response: `I couldn't find a project with the ID "${projectId}".`,
          toolUsed: 'getProjectById',
        };
      }
    } else if (input.query.toLowerCase().includes('market')) {
      const marketAnalysis = await getMarketTrends({
        topic: input.query,
        market: input.market,
      });
      return {
        response: `Here's a summary of the market trends: ${marketAnalysis.futureOutlook}`,
        toolUsed: 'getMarketTrends',
      };
    } else if (input.query.toLowerCase().includes('lead')) {
        // This is a simplified example. In a real application, you would extract
        // lead details from the query.
        const leadInvestigation = await investigateLead({
            name: 'John Doe', // Placeholder
            market: input.market,
        });
        return {
            response: `I've investigated the lead. Here's a summary: ${leadInvestigation.overallSummary}`,
            toolUsed: 'investigateLead',
        };
    }
    
    // Default to a general response if no specific tool is triggered
    const model = ai.getmodel('gemini-pro');
    const result = await model.generate(input.query);
    return {
      response: result.text(),
      toolUsed: 'general',
    };
  }
);

export async function runAIAssistant(input: AIAssistantInput): Promise<AIAssistantOutput> {
    return aiAssistantFlow(input);
}
