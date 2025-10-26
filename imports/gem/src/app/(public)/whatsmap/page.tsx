"use client";
import { useEffect, useState } from "react";

export default function WhatsMAPPage() {
  const [text, setText] = useState("");
  const [resp, setResp] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    const ask = url.searchParams.get("ask");
    if (ask) setText(ask);
  }, []);

  async function send() {
    setLoading(true);
    const r = await fetch("/api/qa/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, uid: "demo-user" }),
    });
    const j = await r.json();
    setResp(j);
    setLoading(false);
  }

  function Chip({ t }: { t: string }) {
    return <button onClick={()=>setText(t)} className="btn-outline rounded-full px-3 py-1 text-sm">{t}</button>;
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold">WhatsMAP</h1>
      <p className="text-neutral-600 mt-1">Ask about projects, compare, or generate a PDF. Jobs are queued when needed.</p>

      <div className="flex gap-2 flex-wrap mt-6">
        <Chip t="Compare Emaar Beachfront and Sobha Hartland" />
        <Chip t="Generate a PDF for The Berkeley Residences" />
        <Chip t="Show 2BR under AED 2M in Dubai Marina" />
      </div>

      <div className="mt-6 flex gap-2">
        <input value={text} onChange={(e)=>setText(e.target.value)} placeholder="Type your request…" className="card flex-1 px-3 py-2" />
        <button disabled={!text} onClick={send} className="btn">{loading ? "Sending…" : "Send"}</button>
      </div>

      {resp && (
        <div className="mt-6 card p-4 bg-neutral-50">
          <div className="text-sm text-neutral-600">Route: <b>{resp.routed}</b> · Action: <b>{resp.action}</b></div>
          {resp.jobId && <div className="text-sm mt-1">Job queued: <code className="mono">{resp.jobId}</code></div>}
          <div className="mt-2">{resp.message}</div>
        </div>
      )}
    </div>
  );
}
