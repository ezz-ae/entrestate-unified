
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { getMarketTrends } from '../market-intelligence/get-market-trends';

const TrackListingPerformanceInputSchema = z.object({
  listingId: z.string().describe('The ID of the listing to track.'),
  market: z.object({ name: z.string() }).describe("The market the property is in."),
});
type TrackListingPerformanceInput = z.infer<typeof TrackListingPerformanceInputSchema>;

const TrackListingPerformanceOutputSchema = z.object({
  performanceSummary: z.string().describe('A summary of the listing\'s performance.'),
  recommendations: z.array(z.string()).describe('A list of recommendations for improvement.'),
  chartData: z.array(z.object({
    date: z.string(),
    views: z.number(),
    leads: z.number(),
  })).describe('Data for a performance chart.'),
});
type TrackListingPerformanceOutput = z.infer<typeof TrackListingPerformanceOutputSchema>;

const trackListingPerformanceFlow = ai.defineFlow(
  {
    name: 'trackListingPerformanceFlow',
    inputSchema: TrackListingPerformanceInputSchema,
    outputSchema: TrackListingPerformanceOutputSchema,
  },
  async (input) => {
    // In a real application, you would fetch the listing's performance data
    // from your database and the real estate portals. For now, we will use
    // placeholder data.
    const performanceData = {
      views: 1200,
      leads: 30,
      searchRank: 5,
      chartData: [
        { date: '2024-01-01', views: 100, leads: 2 },
        { date: '2024-01-02', views: 120, leads: 3 },
        { date: '2024-01-03', views: 150, leads: 5 },
        { date: '2024-01-04', views: 130, leads: 4 },
        { date: '2024-01-05', views: 160, leads: 6 },
        { date: '2024-01-06', views: 180, leads: 7 },
        { date: '2024-01-07', views: 200, leads: 8 },
      ],
    };

    const marketAnalysis = await getMarketTrends({
      topic: `Market trends for a property with ID ${input.listingId}`,
      market: input.market,
    });

    const prompt = `You are an expert real estate marketing analyst. Your task is to analyze the performance of the following listing and provide a summary and actionable recommendations for improvement.

      **Listing Performance:**
      - Views: ${performanceData.views}
      - Leads: ${performanceData.leads}
      - Search Rank: ${performanceData.searchRank}

      **Market Analysis:**
      - Overall Sentiment: ${marketAnalysis.overallSentiment}
      - Emerging Trends: ${marketAnalysis.emergingTrends.map(t => t.trend).join(', ')}
      - Key Opportunities: ${marketAnalysis.keyOpportunities.map(o => o.opportunity).join(', ')}

      **Instructions:**
      1.  Write a summary of the listing's performance, comparing it to the overall market trends.
      2.  Provide a list of 3-5 actionable recommendations for how to improve the listing's performance. These recommendations should be based on both the listing's performance data and the market analysis. For example, if the market analysis shows that "virtual tours" are a key trend, and the listing doesn't have one, you should recommend adding one.
      `;

    const model = ai.getmodel('gemini-pro');
    const result = await model.generate(prompt);
    const analysis = JSON.parse(result.text());

    return {
      performanceSummary: analysis.summary,
      recommendations: analysis.recommendations,
      chartData: performanceData.chartData,
    };
  }
);

export async function trackListingPerformance(input: TrackListingPerformanceInput): Promise<TrackListingPerformanceOutput> {
    return trackListingPerformanceFlow(input);
}
