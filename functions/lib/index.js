import * as functions from 'firebase-functions';
// Import all your individual AI flows here
import { generateMarketingKit } from '../../src/ai/flows/super-seller-suite/generate-marketing-kit';
import { runSalesPilot } from '../../src/ai/flows/lead-intelligence/sales-pilot';
const flowRunners = {
    generateMarketingKit,
    runSalesPilot,
    // ... register all other high-level flows
};
export const executeJob = functions.firestore
    .document('users/{userId}/jobs/{jobId}')
    .onCreate(async (snap, context) => {
    const job = snap.data();
    const { jobId } = context.params;
    const jobRef = snap.ref;
    console.log(`[${jobId}] Starting execution for flow: ${job.flowId}`);
    await jobRef.update({ status: 'running', updatedAt: new Date() });
    try {
        const runner = flowRunners[job.flowId];
        if (!runner) {
            throw new Error(`No runner found for flow ID: ${job.flowId}`);
        }
        const result = await runner(job.params);
        await jobRef.update({
            status: 'completed',
            updatedAt: new Date(),
            result,
        });
        console.log(`[${jobId}] Successfully completed flow: ${job.flowId}`);
    }
    catch (error) {
        console.error(`[${jobId}] Error executing flow ${job.flowId}:`, error);
        await jobRef.update({
            status: 'failed',
            updatedAt: new Date(),
            error: error.message,
        });
    }
});
