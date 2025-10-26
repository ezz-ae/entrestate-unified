export type JobStatus = "queued" | "running" | "succeeded" | "failed";
export type JobType = "generatePDF" | "compareProjects" | "launchMeta" | "rebrandBrochure";

export async function queueJob(params: { uid: string, type: JobType, input: any }): Promise<{ jobId: string }> {
  // Starter: return mock job id; integrate Firestore later
  return { jobId: "dev-" + Math.random().toString(36).slice(2) };
}
