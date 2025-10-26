import { db } from '../admin.js';

export async function searchProjects(params: any) {
  const q = params.q || `${params.projectA ?? ''} ${params.projectB ?? ''}`.trim();
  const snap = await db.collection('projects_catalog').limit(20).get();
  // TODO: apply filters/FTS. For now, return top docs.
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}
