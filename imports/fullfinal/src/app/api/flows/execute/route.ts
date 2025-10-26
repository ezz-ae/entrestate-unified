import { NextResponse } from 'next/server';
import { flowsData } from '@/lib/flows-data';
import { db } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ExecutionPlan } from '@/server/gem/planner';
import { executePlan as runExecutor } from '@/server/gem/executor';

export async function POST(request: Request) {
  const { flowId, userId } = await request.json();

  const effectiveUserId = userId || 'dev-user-123';

  if (!flowId) {
    return NextResponse.json({ error: 'Missing flowId' }, { status: 400 });
  }

  const flow = flowsData.find(f => f.id === flowId);

  if (!flow) {
    return NextResponse.json({ error: 'Flow not found' }, { status: 404 });
  }

  try {
    // Convert the pre-defined flow into an ExecutionPlan
    const plan: ExecutionPlan = {
      summary: `Executing pre-built flow: ${flow.title}`,
      steps: flow.steps.map(s => ({ ...s, params: {} })),
    };

    // Create a new job document
    const jobsCollectionRef = collection(db, 'users', effectiveUserId, 'jobs');
    const jobDocRef = await addDoc(jobsCollectionRef, {
      flowId: flow.id,
      flowTitle: flow.title,
      status: 'queued',
      createdAt: serverTimestamp(),
      steps: plan.steps.map(step => ({ ...step, status: 'pending' })),
      currentStep: 0,
    });

    // Trigger the executor asynchronously
    runExecutor(effectiveUserId, jobDocRef.id, plan);

    return NextResponse.json({ message: `Flow "${flow.title}" initiated.`, jobId: jobDocRef.id });

  } catch (error) {
    console.error("Error creating job in Firestore:", error);
    return NextResponse.json({ error: 'Failed to create job.' }, { status: 500 });
  }
}