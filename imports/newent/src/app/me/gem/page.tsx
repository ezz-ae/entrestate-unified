export default function GemPanel() { return (
  <div className="p-6 space-y-6">
    <h1 className="text-2xl font-bold">GEM — AI Brain Monitor</h1>
    <div className="rounded-2xl border p-4"><b>Active Flows</b><p className="text-sm opacity-70">jobId • steps% • duration • source</p></div>
    <div className="rounded-2xl border p-4"><b>Usage (24h)</b><p className="text-sm opacity-70">model calls • tokens • est. cost</p></div>
    <div className="rounded-2xl border p-4"><b>Training Mode</b><p className="text-sm opacity-70">Low-confidence → HITL queue</p></div>
  </div> ); }
