"use client";
export default function DevPage() {
  const envs = ["NEXT_PUBLIC_BASE_URL"];
  return (
    <div>
      <h1 className="text-3xl font-semibold">DEV — Admin Control</h1>
      <p className="text-neutral-600 mt-1">Ops panel for keys, data, and maintenance.</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card p-4">
          <h2 className="font-medium mb-2">Environment</h2>
          <ul className="text-sm text-neutral-700">
            {envs.map((k) => (
              <li key={k} className="flex items-center justify-between py-1">
                <span>{k}</span>
                <span className="ml-2 font-mono">{process.env[k] ? "✓" : "—"}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-4">
          <h2 className="font-medium mb-2">Docs</h2>
          <ul className="list-disc pl-5 text-sm text-neutral-700">
            <li><a className="underline" href="/docs/README.md">Repo Docs</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
