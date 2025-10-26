
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { to, message } = await req.json();

  const WHATSAPP_API_TOKEN = process.env.WHATSAPP_API_TOKEN;
  const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!WHATSAPP_API_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
    return new NextResponse('WhatsApp API credentials are not configured.', { status: 500 });
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v19.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${WHATSAPP_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to,
          text: { body: message },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`WhatsApp API request failed: ${JSON.stringify(errorData)}`);
    }

    return new NextResponse('Message sent.', { status: 200 });
  } catch (error: any) {
    console.error('Error sending WhatsApp message:', error);
    return new NextResponse(`Error sending WhatsApp message: ${error.message}`, { status: 500 });
  }
}
