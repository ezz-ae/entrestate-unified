from __future__ import annotations
import json, os, time
from typing import Any, Dict, List
from src.jobs.registry import register_job
from src.jobs.types import JobResult, JobContext

# Try real Gemini provider; else fallback
try:
    from providers.gemini import GeminiClient
    _GEMINI = GeminiClient()
except Exception:
    _GEMINI = None

def _enrich(record: Dict[str, Any]) -> Dict[str, Any]:
    # schema we expect
    schema = {"name": None, "developer": None, "area": None, "status": None, "price_from_aed": None, "handover_year": None}
    text = json.dumps(record, ensure_ascii=False)
    if _GEMINI and _GEMINI.live:
        data = _GEMINI.extract_json(f"Normalize this record: {text}", schema)
        # preserve project_id
        data["project_id"] = record.get("project_id")
        data["sources"] = record.get("sources", [])
        if data.get("price_from_aed") is None and record.get("price_from_aed") is not None:
            data["price_from_aed"] = record.get("price_from_aed")
        return data
    # fallback: pass-through with minimal defaults
    out = dict(record)
    out.setdefault("confidence", 0.6)
    out.setdefault("sources", [])
    return out

@register_job("enrich_projects", description="Normalize & enrich projects into export/projects.json")
def run(ctx: JobContext) -> JobResult:
    started = time.time()
    try:
        input_path = os.path.join("data_sources", "projects_seed.json")
        records: List[Dict[str, Any]] = []
        if os.path.exists(input_path):
            with open(input_path, "r", encoding="utf-8") as f:
                records = json.load(f)
        if not records:
            records = [
                {"project_id": "demo-tower", "name": "Demo Tower", "price_from_aed": 750000, "handover_year": 2028}
            ]
        enriched = [_enrich(r) for r in records]
        os.makedirs(ctx.artifacts_dir, exist_ok=True)
        out_path = os.path.join(ctx.artifacts_dir, "projects.json")
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(enriched, f, indent=2, ensure_ascii=False)
        ended = time.time()
        return JobResult(name="enrich_projects", ok=True, started_at=started, ended_at=ended,
                         metrics={"count": len(enriched), "gemini_live": bool(_GEMINI and _GEMINI.live)},
                         artifacts=[out_path])
    except Exception as e:
        ended = time.time()
        return JobResult(name="enrich_projects", ok=False, started_at=started, ended_at=ended, error=str(e))
