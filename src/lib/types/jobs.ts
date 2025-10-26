
import { z } from 'zod';

export const JobStatusSchema = z.enum([
    'pending', 
    'running', 
    'completed', 
    'failed',
    'requires_review'
]);
export type JobStatus = z.infer<typeof JobStatusSchema>;

export const JobSchema = z.object({
    id: z.string(),
    flowId: z.string().describe("The ID of the flow being executed, e.g., 'generateMarketingKit'."),
    status: JobStatusSchema,
    params: z.record(z.any()).optional().describe("The input parameters for the job."),
    source: z.string().describe("The origin of the job request (e.g., 'Web', 'WA', 'API')."),
    createdAt: z.any(), // Firestore Timestamp
    updatedAt: z.any(), // Firestore Timestamp
    duration: z.number().optional().describe("The job duration in seconds."),
    steps: z.array(z.object({
        name: z.string(),
        status: JobStatusSchema,
        log: z.string().optional(),
    })).optional(),
    result: z.any().optional(),
    error: z.string().optional(),
});
export type Job = z.infer<typeof JobSchema>;
