import { NextResponse } from 'next/server'
import { db } from '@/server/firebase-admin'
import { planFromText } from '@/server/whatsmap/plan'

// GET for webhook verification
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')
  if (mode === 'subscribe' && token === process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN) {
    return new NextResponse(challenge || '', { status: 200 })
  }
  return NextResponse.json({ error: 'verification failed' }, { status: 403 })
}

// POST for inbound messages
export async function POST(req: Request) {
  const body = await req.json()
  try {
    const entry = body.entry?.[0]
    const changes = entry?.changes?.[0]
    const messages = changes?.value?.messages
    if (!messages || !messages.length) return NextResponse.json({ ok: true })

    const msg = messages[0]
    const from = msg.from // E.164 string
    const text = msg.text?.body || msg.button?.text || ''

    // Map phone to uid; for now assume a demo user id
    const uid = await mapPhoneToUid(from)

    const convRef = db.collection('users').doc(uid).collection('conversations').doc(from)
    const msgRef = convRef.collection('messages').doc()
    await msgRef.set({ direction: 'in', text, ts: Date.now(), from })

    // Send to planner
    const plan = await planFromText(text, { uid, source: 'wa' })
    const jobRef = db.collection('users').doc(uid).collection('jobs').doc()
    await jobRef.set({ jobId: jobRef.id, plan, status: 'queued', createdAt: Date.now(), source: 'wa' })

    return NextResponse.json({ ok: true, jobId: jobRef.id })
  } catch (e:any) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}

async function mapPhoneToUid(phone: string): Promise<string> {
  // TODO: lookup contact by phone. For now, return a placeholder demo user.
  return 'demo-user'
}
