// Minimal server helper; assumes you have firebase-admin init somewhere
export type JobStatus = "queued" | "running" | "succeeded" | "failed";
export type JobType = "generatePDF" | "compareProjects" | "launchMeta" | "rebrandBrochure";

export async function queueJob(params: {
  uid: string, type: JobType, input: any
}): Promise<{ jobId: string }> {
  try {
    const { getFirestore, FieldValue } = await import("firebase-admin/firestore");
    const { app } = await import("@/server/firebaseAdmin"); // create if missing
    const db = getFirestore(app);
    const ref = db.collection("users").doc(params.uid).collection("jobs").doc();
    await ref.set({
      type: params.type,
      status: "queued",
      input: params.input,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
    return { jobId: ref.id };
  } catch (e) {
    // Fallback: in dev without admin, just mock
    return { jobId: "dev-" + Math.random().toString(36).slice(2) };
  }
}
