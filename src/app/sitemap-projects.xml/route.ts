import { NextResponse } from "next/server";
import { getAllProjects } from "@/src/lib/projects";
export const runtime = "nodejs";
export async function GET() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const projects = await getAllProjects();
  const urls = projects.map((p) => {
    const loc = `${base}/project/${p.slug}`;
    const lastmod = p.lastVerifiedAt ? new Date(p.lastVerifiedAt).toISOString() : new Date().toISOString();
    return `<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod><changefreq>daily</changefreq><priority>0.8</priority></url>`;
  });
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;
  return new NextResponse(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
