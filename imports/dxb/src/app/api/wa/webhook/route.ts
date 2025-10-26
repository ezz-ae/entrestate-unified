
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const mode = req.nextUrl.searchParams.get('hub.mode');
  const token = req.nextUrl.searchParams.get('hub.verify_token');
  const challenge = req.nextUrl.searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  } else {
    return new NextResponse('Forbidden', { status: 403 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log('WhatsApp Webhook Body:', JSON.stringify(body, null, 2));
  // Here, you would process the inbound message and trigger a WhatsMAP flow
  return new NextResponse('OK', { status: 200 });
}
