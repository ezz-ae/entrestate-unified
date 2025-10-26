import { NextResponse } from 'next/server';
import { loadProjects } from '@/src/lib/market/load';

export async function GET() {
  const items = await loadProjects(2000);
  const total = items.length;
  const withPrice = items.filter(p => (p.priceFrom||0) >= 100000).length;
  const badYear = items.filter(p => p.completionYear && (p.completionYear < 2000 || p.completionYear > 2035)).length;
  const cityMap:any = {};
  for (const p of items){ const c=p.city||'Unknown'; cityMap[c]=(cityMap[c]||0)+1; }
  const topCities = Object.entries(cityMap).sort((a:any,b:any)=>b[1]-a[1]).slice(0,5);
  return NextResponse.json({ total, withPrice, badYear, topCities });
}
