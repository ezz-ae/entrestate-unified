"use client";
import { useEffect, useState } from "react";

type Project = { name: string; slug: string; city?: string; status?: string; priceFrom?: number; developerId?: string; };

export default function MarketLibraryPage() {
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (city) params.set("city", city);
    if (status) params.set("status", status);
    params.set("max", "200");
    const res = await fetch(`/api/projects/search?` + params.toString(), { cache: "no-store" });
    const json = await res.json();
    setData(json.projects || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  return (
    <div>
      <h1 className="text-3xl font-semibold">Market Library</h1>
      <p className="text-neutral-600 mt-1">Search projects, filter by city and status.</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-2">
        <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search name or keyword" className="card px-3 py-2" />
        <input value={city} onChange={(e)=>setCity(e.target.value)} placeholder="City (e.g., Dubai)" className="card px-3 py-2" />
        <select value={status} onChange={(e)=>setStatus(e.target.value)} className="card px-3 py-2">
          <option value="">Any Status</option><option value="off-plan">Off-Plan</option><option value="ready">Ready</option>
        </select>
        <button onClick={load} className="btn">{loading ? "Loading..." : "Search"}</button>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((p)=> (
          <a key={p.slug} href={`/project/${p.slug}`} className="card p-4 hover:shadow transition">
            <div className="text-lg font-medium">{p.name}</div>
            <div className="text-neutral-600">{p.city || "—"}</div>
            <div className="text-xs uppercase mt-2 tracking-wide text-neutral-400">{p.status || "unknown"}</div>
            {typeof p.priceFrom === "number" && <div className="text-sm mt-1">From AED {p.priceFrom.toLocaleString()}</div>}
          </a>
        ))}
      </div>
    </div>
  );
}
