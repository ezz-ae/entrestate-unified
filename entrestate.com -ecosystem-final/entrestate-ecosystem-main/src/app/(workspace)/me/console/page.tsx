
'use client';
import { useEffect, useMemo, useState } from 'react';
import { getApps, initializeApp } from 'firebase/app';
import { getFirestore, collection, query, orderBy, limit, onSnapshot, getCountFromServer } from 'firebase/firestore';

const uid = 'demo-user'; // TODO: plug real auth

function ensure() {
  if (!getApps().length) initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  });
}

export default function MasterConsole(){
  const [jobs, setJobs] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});

  useEffect(() => {
    ensure();
    const db = getFirestore();
    const qJobs = query(collection(db, `users/${uid}/jobs`), orderBy('createdAt','desc'), limit(12));
    const unsub = onSnapshot(qJobs, (snap) => setJobs(snap.docs.map(d=>({ id:d.id, ...d.data() }))));
    (async () => {
      try {
        const c = await getCountFromServer(collection(db, 'projects_catalog'));
        setStats((s:any)=>({ ...s, projects: c.data().count }));
      } catch {}
      fetch('/api/dev/projects-stats').then(r=>r.json()).then((v)=>setStats((s:any)=>({ ...s, ...v })));
      fetch('/api/dev/status').then(r=>r.json()).then((v)=>setStats((s:any)=>({ ...s, env:v.env })));
    })();
    return () => unsub();
  }, []);

  async function runCompareDemo(){
    const r = await fetch('/api/qa/compare', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ a: 'Emaar Beachfront', b: 'Sobha', uid, jobId:'console-compare', filename:'console-compare' })
    }).then(r=>r.json());
    alert('Compare PDF: ' + (r.pdfUrl || 'no url (check logs)'));
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Master Console</h1>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="border rounded-2xl p-4">
          <b>Env</b>
          <div className="text-sm mt-2 space-y-1">
            <div>Gemini: {stats.env?.gemini ? 'OK' : 'MISSING'}</div>
            <div>Meta: {stats.env?.meta ? 'OK' : 'MISSING'}</div>
            <div>WhatsApp: {stats.env?.whatsapp ? 'OK' : 'MISSING'}</div>
            <div>Storage: {stats.env?.storage ? 'OK' : 'MISSING'}</div>
          </div>
        </div>
        <div className="border rounded-2xl p-4">
          <b>Catalog</b>
          <div className="text-sm mt-2 space-y-1">
            <div>Total: {stats.total ?? '—'}</div>
            <div>With price: {stats.withPrice ?? '—'}</div>
            <div>Bad year: {stats.badYear ?? '—'}</div>
            <div>Top cities: {(stats.topCities||[]).map((x:any)=>x[0]+':'+x[1]).join(', ')}</div>
          </div>
        </div>
        <div className="border rounded-2xl p-4">
          <b>Actions</b>
          <div className="mt-2 flex gap-2">
            <button className="px-3 py-2 rounded-lg border" onClick={runCompareDemo}>Compare Demo</button>
          </div>
          <p className="text-xs opacity-60 mt-2">Add more actions: reindex, refresh, ingest, etc.</p>
        </div>
      </div>

      <div className="border rounded-2xl p-4">
        <b>Recent Jobs</b>
        <div className="grid md:grid-cols-2 gap-3 mt-3">
          {jobs.map((j:any)=>(
            <div key={j.jobId} className="border rounded-xl p-3 text-sm">
              <div className="opacity-70">{j.jobId}</div>
              <div>{j.status} • {j.progress ?? 0}%</div>
              <div className="text-xs opacity-60">{j.plan?.steps?.join(' → ')}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
