import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { to, templateId, components, media } = await req.json() as any
  if (!to) return NextResponse.json({ error: 'missing to' }, { status: 400 })
  // Minimal example for WhatsApp Cloud API; set secrets in Secret Manager / env
  const url = `https://graph.facebook.com/v20.0/${process.env.WABA_PHONE_ID}/messages`
  const headers = {
    'Authorization': `Bearer ${process.env.META_TOKEN}`,
    'Content-Type': 'application/json'
  }

  const payload = templateId ? {
    messaging_product: 'whatsapp',
    to,
    type: 'template',
    template: { name: templateId, language: { code: 'en' }, components }
  } : media ? {
    messaging_product: 'whatsapp',
    to,
    type: media.type || 'image',
    [media.type || 'image']: media.body
  } : {
    messaging_product: 'whatsapp',
    to,
    type: 'text',
    text: { body: 'Hello from Entrestate' }
  }

  const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(payload) })
  const data = await res.json()
  return NextResponse.json({ ok: res.ok, data }, { status: res.ok ? 200 : 400 })
}
