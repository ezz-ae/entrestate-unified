export type JobStatus = 'queued'|'running'|'done'|'error';
export interface JobStepInfo { name: string; status: JobStatus; ts: number; info?: any; }
export interface JobDoc { jobId: string; plan: { flowId: string; steps: string[]; params: Record<string, any> }; status: JobStatus; createdAt: number; source: 'web'|'wa'; progress?: number; steps?: JobStepInfo[]; result?: any; error?: string; }
