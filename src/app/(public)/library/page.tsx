'use client';
import { useEffect, useState } from 'react';

export default function MarketLibrary(){
  const [items, setItems] = useState<any[]>([]);
  const [q, setQ] = useState('');

  async function search() {
    const res = await fetch(`/api/projects/search?q=${encodeURIComponent(q)}`);
    const json = await res.json();
    setItems(json.items||[]);
  }
  useEffect(()=>{ search(); }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Market Library</h1>
      <div className="flex gap-2">
        <input className="border px-3 py-2 rounded-lg flex-1" placeholder="search developer, project, area..." value={q} onChange={e=>setQ(e.target.value)} />
        <button onClick={search} className="px-3 py-2 rounded-lg border">Search</button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((p:any)=>(
          <div key={p.id} className="border rounded-2xl p-4">
            <div className="font-semibold">{p.name}</div>
            <div className="text-sm opacity-70">{p.developer} • {p.city || '—'}</div>
            <div className="text-sm mt-1">From AED {p.priceFrom?.toLocaleString('en-AE') || '—'}</div>
            <div className="text-xs opacity-60 mt-1">Bedrooms: {Array.isArray(p.bedrooms)? p.bedrooms.join(', ') : '—'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
