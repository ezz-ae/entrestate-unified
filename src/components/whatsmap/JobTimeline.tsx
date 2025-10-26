'use client';
import React from 'react';
import type { JobDoc } from '@/src/lib/types/jobs';

export function JobTimeline({ job }:{ job: JobDoc }) {
  return (
    <div className="space-y-3">
      <div className="text-sm opacity-70">Job: {job.jobId} • {job.status} • {job.progress ?? 0}%</div>
      <ol className="relative border-s ps-4">
        {(job.steps ?? []).map((s, i) => (
          <li key={i} className="mb-2 ms-4">
            <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full bg-black"></div>
            <p className="text-sm"><b>{s.name}</b> — {s.status}</p>
          </li>
        ))}
      </ol>
      {job.result?.pdfUrl && (
        <iframe src={job.result.pdfUrl} className="w-full h-96 border rounded-xl" />
      )}
    </div>
  );
}
