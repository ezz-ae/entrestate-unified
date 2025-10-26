'use client';

import React, { useMemo, useState } from 'react';
import { appsRegistry, type AppContract } from '@/lib/apps/io';
import { getRoleFromEnv } from '@/lib/auth/roles';
import { CopyButton } from '@/components/ui/CopyButton';

export default function AppsIOPage() {
  const role = getRoleFromEnv();
  const [q, setQ] = useState('');

  const filteredApps = useMemo(() => {
    const term = q.toLowerCase().trim();
    const byRole = appsRegistry.filter(
      (a) => !a.allowedRoles || a.allowedRoles.includes(role)
    );
    if (!term) return byRole;
    return byRole.filter(
      (a) =>
        a.name.toLowerCase().includes(term) ||
        a.id.toLowerCase().includes(term) ||
        a.description.toLowerCase().includes(term)
    );
  }, [q, role]);

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Apps Input/Output Review</h1>
      <p className="text-muted-foreground mb-4">
        Contracts for all apps. Validate payloads via <code>/api/apps/validate</code>.
      </p>

      <div className="flex items-center gap-3 mb-6">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search apps…"
          className="w-full max-w-md border rounded-lg px-3 py-2"
        />
        <a
          href="/api/apps/export?format=json"
          className="border rounded-lg px-3 py-2 text-sm"
          target="_blank"
          rel="noreferrer"
        >
          Export JSON
        </a>
        <a
          href="/api/apps/export?format=csv"
          className="border rounded-lg px-3 py-2 text-sm"
          target="_blank"
          rel="noreferrer"
        >
          Export CSV
        </a>
      </div>

      <div className="grid gap-6">
        {filteredApps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </main>
  );
}

function AppCard({ app }: { app: AppContract }) {
  return (
    <section className="border rounded-2xl p-5">
      <header className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div>
          <h2 className="text-xl font-semibold">{app.name}</h2>
          <p className="text-sm text-muted-foreground">{app.description}</p>
        </div>
        <div className="text-right text-xs text-muted-foreground">
          <div>
            ID: <code>{app.id}</code>
          </div>
          <div>
            v{app.version || '0.0.0'} • {app.status || 'alpha'} •{' '}
            {app.enabled ? 'Enabled' : 'Disabled'}
          </div>
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-4">
        <FieldSection title="Inputs" fields={app.inputs} />
        <FieldSection title="Outputs" fields={app.outputs} />
      </div>

      <footer className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center gap-3">
          <a
            href={`/api/apps/sample?appId=${app.id}`}
            className="underline text-sm"
            target="_blank"
            rel="noreferrer"
          >
            Sample payload
          </a>
          <CopyButton
            text={JSON.stringify({ appId: app.id, payload: {} }, null, 2)}
            label="Copy POST template"
          />
        </div>
        <div className="text-muted-foreground">{app.category}</div>
      </footer>
    </section>
  );
}

function FieldSection({ title, fields }: { title: string; fields: any[] }) {
  return (
    <div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2 pr-2">Key</th>
              <th className="py-2 pr-2">Label</th>
              <th className="py-2 pr-2">Type</th>
              <th className="py-2 pr-2">Req</th>
              <th className="py-2">Description / Example</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((f, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="py-2 pr-2">
                  <code>{f.key}</code>
                </td>
                <td className="py-2 pr-2">{f.label}</td>
                <td className="py-2 pr-2">{f.type}</td>
                <td className="py-2 pr-2">{f.required ? 'Yes' : ''}</td>
                <td className="py-2 text-gray-600">
                  {f.description || ''}
                  {f.example && (
                    <div className="text-xs text-gray-500 mt-1">
                      e.g.,{' '}
                      {Array.isArray(f.example)
                        ? JSON.stringify(f.example)
                        : String(f.example)}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
