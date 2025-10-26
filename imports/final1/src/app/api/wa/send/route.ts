import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest){ const b = await req.json().catch(()=>({})); return NextResponse.json({ ok: true, sent: b }); }
