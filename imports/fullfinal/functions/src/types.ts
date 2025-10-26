export type JobStepName =
  | 'searchProjects'
  | 'analyzeMetrics'
  | 'generatePDF'
  | 'deliver'
  | 'rebrandBrochure'
  | 'generateCreatives'
  | 'campaignPlan'
  | 'launchMeta'
  | 'smartSearch';

export interface FlowPlan {
  flowId: string;
  steps: JobStepName[];
  params: Record<string, any>;
}

export interface JobDoc {
  jobId: string;
  plan: FlowPlan;
  status: 'queued'|'running'|'done'|'error';
  createdAt: number;
  source: 'web'|'wa';
  progress?: number;
  steps?: Array<{ name: JobStepName; status: 'queued'|'running'|'done'|'error'; ts: number; info?: any }>;
  result?: any;
  error?: string;
}
