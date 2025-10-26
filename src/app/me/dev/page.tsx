export default function DevPanel() { return (
  <div className="p-6 space-y-6">
    <h1 className="text-2xl font-bold">DEV — Admin Control Center</h1>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="rounded-2xl border p-4"><b>Connectors Health</b><p className="text-sm opacity-70">Meta, WhatsApp, Search</p></div>
      <div className="rounded-2xl border p-4"><b>Secrets Checker</b><p className="text-sm opacity-70">GEMINI_API_KEY, META_TOKEN…</p></div>
      <div className="rounded-2xl border p-4"><b>Queues</b><p className="text-sm opacity-70">jobs running/queued</p></div>
      <div className="rounded-2xl border p-4"><b>Ingestion Triggers</b><button className="mt-2 px-3 py-2 rounded-lg border">Run Daily</button></div>
    </div>
  </div> ); }
