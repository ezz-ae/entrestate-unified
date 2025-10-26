import { NextResponse } from 'next/server';
import { findProjectByName, compareKpis, renderCompareHtml } from '@/lib/qa/compare';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const { a, b, uid='demo-user', jobId='compare', filename='comparison' } = await req.json();
  if (!a || !b) return NextResponse.json({ error: "Fields 'a' and 'b' are required." }, { status: 400 });

  const A = await findProjectByName(a);
  const B = await findProjectByName(b);
  if (!A || !B) return NextResponse.json({ error: 'Project not found', found: { A: !!A, B: !!B } }, { status: 404 });

  const rows = compareKpis(A as any, B as any);
  const html = renderCompareHtml('Project Comparison', A.name||A.id, B.name||B.id, rows as any);

  // call internal PDF route
  const base = process.env.NEXT_PUBLIC_BASE_URL || ''; // optional
  const url = base ? base + '/api/pdf' : (new URL('/api/pdf', req.url)).toString();
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ html, uid, jobId, filename })
  }).then(r => r.json()).catch(()=>({ pdfUrl:null }));

  return NextResponse.json({ pdfUrl: res.pdfUrl || null, html, rows, a: A, b: B });
}
