import { NextResponse } from "next/server";
import { routeModel } from "@/src/lib/ai/router";
import { queueJob } from "@/src/lib/jobs";
export const runtime = "nodejs";
export async function POST(req: Request) {
  const { text, uid = "demo-user", attachments = [] } = await req.json();
  const hasImage = Array.isArray(attachments) && attachments.some((a: any) => a.type?.startsWith("image/"));
  const model = routeModel({ text, hasImage });
  const lower = (text || "").toLowerCase();
  let action: "compare" | "pdf" | "search" | "chat" = "chat";
  if (lower.includes("compare")) action = "compare";
  else if (lower.includes("pdf")) action = "pdf";
  else if (/(find|search|show)/.test(lower)) action = "search";
  let jobId: string | undefined;
  if (action === "compare") {
    const names = lower.split("compare")[1]?.split("and")?.map((s: string) => s.trim()).filter(Boolean) || [];
    if (names.length >= 2) {
      const { jobId: id } = await queueJob({ uid, type: "compareProjects", input: { a: names[0], b: names[1] } });
      jobId = id;
    }
  } else if (action === "pdf") {
    const { jobId: id } = await queueJob({ uid, type: "generatePDF", input: { text } });
    jobId = id;
  }
  return NextResponse.json({
    ok: true, routed: model, action, jobId: jobId || null,
    message: model === "flash" ? "Quick answer mode ready." : (model === "pro" ? "Deep analysis route engaged." : "Vision route engaged.")
  });
}
