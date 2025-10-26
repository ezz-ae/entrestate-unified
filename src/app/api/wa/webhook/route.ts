import { NextResponse } from 'next/server';

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'entrestate-secret-token';

/**
 * Handles the webhook verification handshake with Meta.
 * https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('WhatsApp Webhook Verified!');
    return new Response(challenge, { status: 200 });
  } else {
    console.error('WhatsApp Webhook Verification Failed.');
    return new Response('Forbidden', { status: 403 });
  }
}

/**
 * Handles incoming messages from WhatsApp users.
 */
export async function POST(request: Request) {
  const body = await request.json();
  console.log('Received WhatsApp Webhook:', JSON.stringify(body, null, 2));

  // TODO: Process the message
  // 1. Extract user message and phone number from `body`.
  // 2. Identify the user in your database via their phone number.
  // 3. Pass the message to the AI pipeline (similar to the /api/chat endpoint).
  // 4. The AI pipeline would then call the `/api/wa/send` endpoint to respond.

  // For now, we just log it and return a success response.
  // In production, you would queue this for processing.

  return NextResponse.json({ status: 'received' }, { status: 200 });
}