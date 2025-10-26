import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    env: {
      gemini: !!process.env.GEMINI_API_KEY,
      meta: !!process.env.META_TOKEN && !!process.env.META_AD_ACCOUNT_ID,
      whatsapp: !!process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN,
      storage: !!process.env.FIREBASE_STORAGE_BUCKET,
    }
  });
}
