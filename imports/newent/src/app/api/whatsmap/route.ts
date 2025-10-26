// Minimal planner endpoint that returns a jobId and enqueues a flow plan.
// Assumes you have Firebase Admin set up in '@/server/firebase-admin'.
import { NextResponse } from 'next/server'
import { db } from '@/server/firebase-admin'
import { planFromText } from '@/server/whatsmap/plan'

export async function POST(req: Request) {
  try {
    const { text, uid, source } = await req.json() as { text: string; uid: string; source?: 'web'|'wa' }
    if (!text || !uid) return NextResponse.json({ error: 'text and uid required' }, { status: 400 })

    const plan = await planFromText(text, { uid, source: source || 'web' })
    const jobRef = db.collection('users').doc(uid).collection('jobs').doc()
    await jobRef.set({
      jobId: jobRef.id,
      plan,
      status: 'queued',
      createdAt: Date.now(),
      source: source || 'web'
    })

    // Fire-and-forget: a background worker (Function/Run) should process this job
    // If you don't have a worker yet, simulate: set a placeholder step
    return NextResponse.json({ jobId: jobRef.id, plan })
  } catch (e:any) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
