
import { Job } from "@/lib/types/jobs";

// A real planner would be more dynamic, this is a static example
const flowPlans: Record<string, string[]> = {
    'generateMarketingKit': [
        'generateListing',
        'generateSocialPost',
        'generateAdFromBrochure'
    ],
    'runSalesPilot': [
        'investigateLead',
        'generateOffer',
        'generateEmail'
    ],
    'getMarketTrends': ['getMarketTrends'],
    'verifyListing': ['verifyListing'],
};

export function createPlan(intent: { flowId: string }): Pick<Job, 'flowId' | 'steps'> | null {
    const steps = flowPlans[intent.flowId];

    if (!steps) {
        return null;
    }

    return {
        flowId: intent.flowId,
        steps: steps.map(name => ({
            name,
            status: 'pending',
        })),
    };
}
