
'use server';

/**
 * @fileOverview The master AI orchestrator for creating and launching a Meta ad campaign,
 * now supercharged with real-time market intelligence.
 *
 * This flow acts as a "Pilot," taking a high-level goal and a project ID, and then
 * intelligently calling a sequence of other AI tools to build a complete campaign.
 * It analyzes the market, suggests a data-driven audience, generates trend-responsive
 * ad creative, and assembles the final campaign structure.
 *
 * @module AI/Flows/MetaAutoPilot
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { suggestTargetingOptions } from './suggest-targeting-options';
import { generateAdFromBrochure } from '@/ai/flows/meta-pilot/generate-ad-from-brochure';
import { createMetaCampaign } from './create-meta-campaign';
import { getProjectById } from '@/lib/database'; 
import { 
    MetaAutoPilotInputSchema, 
    MetaAutoPilotOutputSchema, 
    MetaAutoPilotInput, 
    MetaAutoPilotOutput,
} from '@/ai/flows/types';
import { getMarketTrends } from '../market-intelligence/get-market-trends';


const metaAutoPilotFlow = ai.defineFlow(
    {
        name: 'metaAutoPilotFlow',
        inputSchema: MetaAutoPilotInputSchema,
        outputSchema: MetaAutoPilotOutputSchema,
    },
    async (input) => {
        
        // 1. Fetch Project Data
        const projectData = await getProjectById(input.projectId);
        if (!projectData) {
            throw new Error(`Project with ID "${input.projectId}" not found.`);
        }

        // 2. Get Market Intelligence
        const marketAnalysis = await getMarketTrends({
            topic: `Effective advertising strategies for a project like ${projectData.name} in the current market`,
            market: input.market,
        });

        // 3. Suggest Targeting Options (now with market context)
        const audienceSuggestions = await suggestTargetingOptions({
            projectId: input.projectId,
            marketAnalysis,
        });

        // 4. Generate Ad Creative (now with market context)
        const adCreative = await generateAdFromBrochure({
            projectName: projectData.name,
            focusArea: 'The luxury lifestyle and investment potential, aligned with current market trends.',
            toneOfVoice: 'Professional and aspirational',
            marketAnalysis,
        });

        // 5. Create the final Campaign Structure (now with market context)
        const finalCampaignPlan = await createMetaCampaign({
            campaignGoal: input.campaignGoal,
            projectBrochureDataUri: adCreative.adDesign,
            budget: 500, // Example budget
            durationDays: 14, // Example duration
            marketAnalysis,
        });

        // 6. Final Output
        const result: MetaAutoPilotOutput = {
            status: 'Campaign Plan Assembled Successfully.',
            finalCampaignId: finalCampaignPlan.publishedCampaignId,
            audienceStrategy: audienceSuggestions,
            adCreative: adCreative,
            finalCampaignPlan: finalCampaignPlan,
            marketAnalysis,
        };

        return result;
    }
);

export async function runMetaAutoPilot(input: MetaAutoPilotInput): Promise<MetaAutoPilotOutput> {
    return metaAutoPilotFlow(input);
}
