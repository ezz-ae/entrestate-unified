import { NextResponse } from "next/server";
import { routeModel } from "@/lib/ai/router";
import { queueJob } from "@/lib/jobs";
import { getAllProjects } from "@/lib/projects";

// NOTE: This returns a structured plan + optional job creation.
// Later you can plug real Gemini calls here.

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { text, uid = "demo-user", attachments = [] } = await req.json();
    const hasImage = Array.isArray(attachments) && attachments.some((a: any) => a.type?.startsWith("image/"));
    const model = routeModel({ text, hasImage });

    // very light intent parse
    const lower = (text || "").toLowerCase();
    let action: "compare" | "pdf" | "search" | "chat" = "chat";
    if (lower.includes("compare")) action = "compare";
    else if (lower.includes("pdf")) action = "pdf";
    else if (/(find|search|show)/.test(lower)) action = "search";

    let jobId: string | undefined;
    if (action === "compare") {
      // Load all projects to perform a search
      const allProjects = await getAllProjects();
      const findProject = (namePart: string) => 
        allProjects.find(p => p.name.toLowerCase().includes(namePart.trim()));

      // Naïve project extraction; replace with proper NER later
      const names = lower.split("compare")[1]?.split("and")?.map((s: string) => s.trim()).filter(Boolean) || [];
      if (names.length >= 2) {
        const projectA = findProject(names[0]);
        const projectB = findProject(names[1]);

        if (projectA && projectB) {
          const { jobId: id } = await queueJob({
            uid,
            type: "compareProjects",
            input: { a: projectA.slug, b: projectB.slug } // Use slugs for precision
          });
          jobId = id;
        }
      }
    } else if (action === "pdf") {
      const { jobId: id } = await queueJob({ uid, type: "generatePDF", input: { text } });
      jobId = id;
    }

    return NextResponse.json({
      ok: true,
      routed: model,      // "flash" | "pro" | "vision"
      action,             // "compare" | "pdf" | "search" | "chat"
      jobId: jobId || null,
      message:
        model === "flash"
          ? "Quick answer mode ready. Ask me about projects, prices or availability."
          : model === "pro"
          ? "Deep analysis route engaged. I can compare or generate a PDF now."
          : "Vision route engaged. Send a brochure or image to analyze.",
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
