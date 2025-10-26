'use client';
import React from 'react';

type Chip = { label: string; payload: any };
export function ActionChips({ chips, onClick }:{ chips: Chip[]; onClick:(c:Chip)=>void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((c, i) => (
        <button key={i} className="px-3 py-1 rounded-full border text-sm hover:bg-black hover:text-white transition" onClick={() => onClick(c)}>{c.label}</button>
      ))}
    </div>
  );
}
