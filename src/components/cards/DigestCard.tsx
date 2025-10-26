import React from 'react';
export function DigestCard({ item }:{ item: any }) { return (
  <div className="rounded-2xl border p-4 shadow-sm">
    <div className="text-xs opacity-60">{item.category}</div>
    <div className="text-lg font-semibold">{item.title}</div>
    <p className="text-sm opacity-80">{item.summary}</p>
  </div> ); }
