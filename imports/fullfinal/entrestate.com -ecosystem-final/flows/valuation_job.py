from __future__ import annotations
import json, os, time
from typing import Any, Dict, List
from src.jobs.registry import register_job
from src.jobs.types import JobResult, JobContext
from agents.valuation_stub import indicative_yield

@register_job("valuate_projects", description="Compute indicative yields for projects")
def run(ctx: JobContext) -> JobResult:
    started = time.time()
    try:
        pj_path = os.path.join(ctx.artifacts_dir, "projects.json")
        if not os.path.exists(pj_path):
            raise FileNotFoundError("Missing export/projects.json; run enrich_projects first")
        with open(pj_path, "r", encoding="utf-8") as f:
            projects = json.load(f)
        # simple valuation: assume rent ~ 6% of price / year
        valuations = []
        for p in projects:
            price = float(p.get("price_from_aed") or 0)
            rent = price * 0.06
            valuations.append({
                "project_id": p.get("project_id"),
                "indicative_yield": indicative_yield(price, rent),
                "assumptions": {"annual_rent": rent}
            })
        out_path = os.path.join(ctx.artifacts_dir, "valuations.json")
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(valuations, f, indent=2, ensure_ascii=False)
        ended = time.time()
        return JobResult(name="valuate_projects", ok=True, started_at=started, ended_at=ended,
                         metrics={"count": len(valuations)}, artifacts=[out_path])
    except Exception as e:
        ended = time.time()
        return JobResult(name="valuate_projects", ok=False, started_at=started, ended_at=ended, error=str(e))
