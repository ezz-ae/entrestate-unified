import { NextResponse } from 'next/server';

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

/**
 * Sends a message to a WhatsApp user.
 * In a real-world scenario, this would be called by your AI processing pipeline.
 */
export async function POST(request: Request) {
  const { to, text } = await request.json();

  if (!to || !text) {
    return NextResponse.json({ error: 'Missing "to" or "text" field' }, { status: 400 });
  }

  console.log(`--- SIMULATING WHATSAPP SEND ---`);
  console.log(`Recipient: ${to}`);
  console.log(`Message: ${text}`);
  console.log(`--- END SIMULATION ---`);

  // In production, you would uncomment and use the following to call the Meta Graph API:
  // const response = await fetch(`https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`, { ... });

  return NextResponse.json({ status: 'Message sent for simulation.' });
}