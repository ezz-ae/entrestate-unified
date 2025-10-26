import * as functions from 'firebase-functions';
import { db } from './admin.js';
import type { JobDoc } from './types.js';
import { runStep } from './runner.js';

export const onJobCreated = functions.firestore
  .document('users/{uid}/jobs/{jobId}')
  .onCreate(async (snap, ctx) => {
    const uid = ctx.params.uid as string;
    const job = snap.data() as JobDoc;
    const jobRef = snap.ref;

    try {
      await jobRef.update({ status: 'running', progress: 0 });

      let accum: any = null;
      const steps = job.plan?.steps ?? [];
      for (let i = 0; i < steps.length; i++) {
        const stepName = steps[i];
        const ts = Date.now();
        await jobRef.update({
          steps: functions.firestore.FieldValue.arrayUnion({ name: stepName, status: 'running', ts })
        });

        const out = await runStep(stepName as any, { uid, plan: job.plan, source: job.source }, accum);
        accum = out;

        await jobRef.update({
          steps: functions.firestore.FieldValue.arrayUnion({ name: stepName, status: 'done', ts: Date.now(), info: out }),
          progress: Math.round(((i + 1) / steps.length) * 100)
        });
      }

      await jobRef.update({ status: 'done', result: accum });
    } catch (e:any) {
      await jobRef.update({ status: 'error', error: String(e) });
      throw e;
    }
  });
