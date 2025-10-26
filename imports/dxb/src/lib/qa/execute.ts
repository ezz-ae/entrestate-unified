
'use server';

/**
 * @fileOverview The second step in the WhatsMAP Q&A pipeline: Executing a structured command.
 *
 * This flow takes a parsed query from the 'parse' step and orchestrates the
 * necessary actions, such as searching the database, calling other AI flows,
 * and preparing the data for the final response.
 *
 * @module Lib/QA/Execute
 */

import { DataIntelligenceService } from '@/services/data-intelligence';
import { getMarketTrends } from '@/ai/flows/market-intelligence/get-market-trends';
import { generateListing } from '@/ai/flows/listing-crm/generate-listing';

export async function executeCommand(parsedQuery: any) {
  const { intent, entities, response_format } = parsedQuery;
  const dataService = DataIntelligenceService.getInstance();

  switch (intent) {
    case 'search_projects':
      // In a real application, you would use a more sophisticated search
      // algorithm that uses the extracted entities.
      const allProjects = dataService.getAllProjects();
      const filteredProjects = allProjects.filter(p => 
          (entities.filters?.area ? p.area.toLowerCase().includes(entities.filters.area.toLowerCase()) : true) &&
          (entities.project_names ? entities.project_names.some((name: string) => p.name.toLowerCase().includes(name.toLowerCase())) : true)
      ).slice(0, 5); // Limit results for display
      
      return {
        type: 'project_results',
        data: {
          projects: filteredProjects,
          summary: `I found ${filteredProjects.length} projects matching your criteria.`,
        }
      };

    case 'compare_projects':
      // Placeholder for comparison logic
      const projectA = dataService.getProjectById('dxboffplan-emaar-beachfront');
      const projectB = dataService.getProjectById('pf-damac-bay-cavali');
      return {
          type: 'comparison_results',
          data: {
              projects: [projectA, projectB],
              summary: "Here is a comparison of the two projects you requested.",
              format: response_format, // e.g., 'pdf'
          }
      };

    case 'get_market_trends':
        const trends = await getMarketTrends({ topic: 'dubai real estate', market: { name: 'Dubai' } });
        return {
            type: 'market_trends_results',
            data: {
                summary: trends.futureOutlook,
                trends: trends.emergingTrends,
            }
        };
        
    case 'generate_content':
         const content = await generateListing({
             platform: 'Bayut',
             propertyAddress: 'Placeholder Address',
             keyDetails: '3 beds, 3 baths',
             uniqueFeatures: 'Sea view',
             tone: 'Luxury',
             market: { name: 'Dubai' }
         });
         return {
             type: 'content_generation_results',
             data: {
                 title: content.title,
                 description: content.description,
             }
         };

    default:
      return {
        type: 'error',
        data: {
          message: "I'm sorry, I was unable to understand your request. Please try rephrasing it."
        }
      };
  }
}
