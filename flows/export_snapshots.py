from __future__ import annotations
import json, os, time
from src.jobs.registry import register_job
from src.jobs.types import JobResult, JobContext

@register_job("export_snapshots", description="Compose final artifact bundle") 
def run(ctx: JobContext) -> JobResult:
    started = time.time()
    try:
        # In real use, package multiple files; here just check two known outputs exist.
        artifacts = []
        for fname in ["projects.json", "valuations.json"]:
            p = os.path.join(ctx.artifacts_dir, fname)
            if os.path.exists(p):
                artifacts.append(p)
        bundle_path = os.path.join(ctx.artifacts_dir, "snapshot_manifest.json")
        with open(bundle_path, "w", encoding="utf-8") as f:
            json.dump({"artifacts": artifacts}, f, indent=2)
        ended = time.time()
        return JobResult(name="export_snapshots", ok=True, started_at=started, ended_at=ended,
                         metrics={"artifacts": len(artifacts)}, artifacts=[bundle_path])
    except Exception as e:
        ended = time.time()
        return JobResult(name="export_snapshots", ok=False, started_at=started, ended_at=ended, error=str(e))
