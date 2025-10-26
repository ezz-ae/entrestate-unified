import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest){ const { flow, params } = await req.json(); return NextResponse.json({ ok: true, flow, params, started: true }); }
