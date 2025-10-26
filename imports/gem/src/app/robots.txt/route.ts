import { NextResponse } from "next/server";
export const runtime = "nodejs";
export function GET() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const txt = `User-agent: *
Allow: /
Sitemap: ${base}/sitemap.xml`;
  return new NextResponse(txt, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
