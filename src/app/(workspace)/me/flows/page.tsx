"use client";
import { useState } from "react";

const templates = [
  { id: "brochure-to-landing-video", name: "Brochure → Landing → Video" },
  { id: "compare-to-pdf", name: "Compare → PDF" },
  { id: "campaign-meta", name: "Meta Campaign" },
];

export default function FlowsPage() {
  const [result, setResult] = useState<string>("");

  async function run(tid: string) {
    const r = await fetch("/api/qa/query", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: tid }) });
    const j = await r.json();
    setResult(JSON.stringify(j, null, 2));
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold">Flows</h1>
      <p className="text-neutral-600 mt-1">Prebuilt automations you can run or customize.</p>

      <div className="mt-6 grid gap-4">
        {templates.map(t => (
          <div key={t.id} className="card p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{t.name}</div>
              <div className="text-sm text-neutral-600">One-click job runner (mock id in starter)</div>
            </div>
            <button onClick={() => run(t.id)} className="btn-outline">Run</button>
          </div>
        ))}
      </div>

      <pre className="mt-6 text-xs card p-4 bg-neutral-50 whitespace-pre-wrap">{result || "Result will appear here…"}</pre>
    </div>
  );
}
