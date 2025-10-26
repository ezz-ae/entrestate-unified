import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebaseAdmin';

export async function GET(req: NextRequest) {
  const uid = req.nextUrl.searchParams.get('uid') || 'anon'; // TODO: replace with real auth
  const db = getAdminDb();
  const doc = await db.collection('users').doc(uid).get();
  return NextResponse.json({ ok: true, profile: doc.exists ? doc.data() : null });
}

export async function POST(req: NextRequest) {
  const db = getAdminDb();
  const body = await req.json().catch(() => ({}));
  const uid = body?.uid || 'anon'; // TODO: use verified UID
  await db.collection('users').doc(uid).set(body, { merge: true });
  return NextResponse.json({ ok: true });
}
