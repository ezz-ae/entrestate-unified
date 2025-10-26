import { NextResponse } from "next/server";
export const runtime = "nodejs";
export async function GET() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${base}/sitemap-projects.xml</loc></sitemap>
</sitemapindex>`;
  return new NextResponse(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
