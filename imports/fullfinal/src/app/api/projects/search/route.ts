import { NextResponse } from "next/server";
import { getAllProjects } from "@/lib/projects";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = (url.searchParams.get("q") || "").toLowerCase();
  const developer = (url.searchParams.get("developer") || "").toLowerCase();
  const city = (url.searchParams.get("city") || "").toLowerCase();
  const status = (url.searchParams.get("status") || "").toLowerCase();
  const max = Number(url.searchParams.get("max") || 100);

  const projects = (await getAllProjects()).filter(p => {
    const hay = `${p.name} ${p.slug} ${p.city ?? ""} ${p.status ?? ""}`.toLowerCase();
    const okQ = q ? hay.includes(q) : true;
    const okDev = developer ? (p.developerId || "").toLowerCase().includes(developer) : true;
    const okCity = city ? (p.city || "").toLowerCase().includes(city) : true;
    const okStatus = status ? (p.status || "").toLowerCase().includes(status) : true;
    return okQ && okDev && okCity && okStatus;
  }).slice(0, max);

  return NextResponse.json({ ok: true, count: projects.length, projects });
}
