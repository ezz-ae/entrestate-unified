
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Import all the flow functions that will be exposed via the API
import { generateListing } from '@/ai/flows/listing-crm/generate-listing';
import { generateSocialPost } from '@/ai/flows/meta-pilot/generate-social-post';
import { generateAdFromBrochure } from '@/ai/flows/meta-pilot/generate-ad-from-brochure';
import { runSalesPilot } from '@/ai/flows/lead-intelligence/sales-pilot';
import { generateMarketingKit } from '@/ai/flows/super-seller-suite/generate-marketing-kit';
import { verifyListing } from '@/ai/flows/listing-crm/verify-listing';
import { getMarketTrends } from '@/ai/flows/market-intelligence/get-market-trends';
import { launchMeta } from '@/../functions/src/steps/launchMeta'; // Import the new flow

// Define a map from a string identifier to the actual flow function
const flowRunnerMap: Record<string, (params: any) => Promise<any>> = {
    'generate-listing': generateListing,
    'generate-social-post': generateSocialPost,
    'generate-ad-from-brochure': generateAdFromBrochure,
    'run-sales-pilot': runSalesPilot,
    'generate-marketing-kit': generateMarketingKit,
    'verify-listing': verifyListing,
    'get-market-trends': getMarketTrends,
    'launch-meta-campaign': launchMeta, // Register the new flow
};

const RunRequestSchema = z.object({
  flowId: z.string().describe("The ID of the flow to run."),
  params: z.record(z.any()).describe("The input parameters for the flow."),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = RunRequestSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid request body', details: validation.error.issues }, { status: 400 });
    }

    const { flowId, params } = validation.data;
    const flowRunner = flowRunnerMap[flowId];

    if (!flowRunner) {
      return NextResponse.json({ error: `Flow with ID "${flowId}" not found.` }, { status: 404 });
    }

    // Execute the flow and return its result
    const result = await flowRunner(params);

    return NextResponse.json(result);

  } catch (error: any) {
    console.error("Error running flow:", error);
    return NextResponse.json({ error: 'An unexpected error occurred.', details: error.message }, { status: 500 });
  }
}
