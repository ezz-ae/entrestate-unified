
import { firestore } from '@/services/database.server';
import { Job, JobStatusSchema } from '@/lib/types/jobs';
import { createPlan } from '../planner';
import { log } from '@/server/log';
import { v4 as uuidv4 } from 'uuid';

export async function createJob(
    userId: string,
    intent: { flowId: string, params: Record<string, any> },
    source: 'Web' | 'WA' | 'API'
): Promise<string | null> {

    const plan = createPlan(intent);
    if (!plan) {
        log.warn("No plan could be created for intent", { flowId: intent.flowId });
        return null;
    }

    const newJob: Omit<Job, 'id'> = {
        ...plan,
        status: 'pending',
        params: intent.params,
        source,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    try {
        const docRef = await firestore
            .collection(`users/${userId}/jobs`)
            .add(newJob);
            
        log.info("Successfully created new job", { jobId: docRef.id, flowId: newJob.flowId });
        return docRef.id;

    } catch (error: any) {
        log.error("Failed to create Firestore job", error, { userId });
        return null;
    }
}
