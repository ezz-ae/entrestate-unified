
'use server';

/**
 * @fileOverview An AI flow to analyze and report on the segmentation of the market data.
 *
 * This flow examines the sources, quality, and types of data in the project catalog
 * to provide high-level intelligence for the Cloud dashboard.
 *
 * @module AI/Flows/Cloud/GetDataSegmentationInsights
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { DataIntelligenceService } from '@/services/data-intelligence';

const GetDataSegmentationInsightsOutputSchema = z.object({
  sourceBreakdown: z.record(z.number()).describe('A breakdown of projects by data source (e.g., {"bayut.com": 1500, "propertyfinder.ae": 2000, "internal": 250}).'),
  statusBreakdown: z.record(z.number()).describe('A breakdown of projects by their status (e.g., {"Off-plan": 2500, "Ready": 1250}).'),
  overallQualityScore: z.number().min(0).max(100).describe('An AI-calculated overall quality score for the entire dataset.'),
  keyInsight: z.string().describe('A single, actionable insight derived from the data segmentation analysis.'),
});
type GetDataSegmentationInsightsOutput = z.infer<typeof GetDataSegmentationInsightsOutputSchema>;

const getDataSegmentationInsightsFlow = ai.defineFlow(
  {
    name: 'getDataSegmentationInsightsFlow',
    outputSchema: GetDataSegmentationInsightsOutputSchema,
  },
  async () => {
    const dataService = DataIntelligenceService.getInstance();
    const projects = dataService.getAllProjects();

    // Simulate analysis for source and status breakdown
    const sourceBreakdown = projects.reduce((acc, project) => {
        const source = project.tags.find(tag => tag.includes('.com')) || 'internal';
        acc[source] = (acc[source] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const statusBreakdown = projects.reduce((acc, project) => {
        acc[project.status] = (acc[project.status] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // Simulate a call to Gemini for a high-level insight
    const prompt = `You are a data analyst for a real estate intelligence platform. Based on the following data segmentation, provide one key, actionable insight for our clients.

    - Data Sources: ${JSON.stringify(sourceBreakdown)}
    - Property Statuses: ${JSON.stringify(statusBreakdown)}

    Example Insight: "The high volume of 'Off-plan' properties from Property Finder suggests a strong developer focus on new launches on that portal. Our agents should prioritize it for off-plan lead generation."
    
    Provide only the insight text.`;

    const model = ai.getmodel('gemini-pro');
    const result = await model.generate(prompt);

    return {
      sourceBreakdown,
      statusBreakdown,
      overallQualityScore: 92, // Simulated score
      keyInsight: result.text(),
    };
  }
);

export async function getDataSegmentationInsights(): Promise<GetDataSegmentationInsightsOutput> {
    return getDataSegmentationInsightsFlow();
}
