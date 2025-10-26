"use client";
import { useEffect, useState } from "react";

export default function GemPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // demo data
    setJobs([{ id: "demo-1", type: "compareProjects", status: "succeeded", createdAt: Date.now()-3600e3, durationMs: 4200 }]);
    setLoading(false);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-semibold">GEM — AI Orchestration</h1>
      <p className="text-neutral-600 mt-1">Live jobs from all tools. Rerun or inspect outputs.</p>

      <div className="mt-6 overflow-x-auto card">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50">
            <tr>
              <th className="text-left p-3">ID</th>
              <th className="text-left p-3">Type</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Started</th>
              <th className="text-left p-3">Duration</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="p-3" colSpan={5}>Loading…</td></tr>
            ) : jobs.map((j) => (
              <tr key={j.id} className="border-t">
                <td className="p-3">{j.id}</td>
                <td className="p-3">{j.type}</td>
                <td className="p-3">{j.status}</td>
                <td className="p-3">{new Date(j.createdAt).toLocaleString()}</td>
                <td className="p-3">{j.durationMs ? Math.round(j.durationMs/1000)+"s" : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
