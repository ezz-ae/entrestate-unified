from __future__ import annotations
from typing import Dict, List
import traceback, time, os, json
from .types import JobContext, JobResult
from .registry import JOBS

class JobExecutor:
    def __init__(self, env: Dict[str, str] | None = None, artifacts_dir: str = "export"):
        self.env = env or {}
        self.artifacts_dir = artifacts_dir
        os.makedirs(self.artifacts_dir, exist_ok=True)

    def run_job(self, name: str, params: Dict | None = None) -> JobResult:
        if name not in JOBS:
            raise ValueError(f"Unknown job: {name}")
        job = JOBS[name]
        ctx = JobContext(env=self.env, params=params or {}, artifacts_dir=self.artifacts_dir)
        started = time.time()
        try:
            res = job.func(ctx)
            if not isinstance(res, JobResult):
                raise RuntimeError("Job did not return JobResult")
            return res
        except Exception as e:
            ended = time.time()
            return JobResult(
                name=name, ok=False, started_at=started, ended_at=ended,
                error=f"{type(e).__name__}: {e}\n" + traceback.format_exc()
            )

    def run_flow(self, steps: List[Dict]) -> List[JobResult]:
        results: List[JobResult] = []
        # naive sequential with simple dependency check
        completed = set()
        for step in steps:
            job_name = step["job"]
            needs = step.get("needs", [])
            if not set(needs).issubset(completed):
                missing = set(needs) - completed
                raise RuntimeError(f"Flow dependency not satisfied for {job_name}; missing: {missing}")
            params = step.get("params", {})
            res = self.run_job(job_name, params=params)
            results.append(res)
            if res.ok:
                completed.add(job_name)
            else:
                break
        # Write a simple run report
        report_path = os.path.join(self.artifacts_dir, "last_run_report.json")
        with open(report_path, "w", encoding="utf-8") as f:
            json.dump([r.__dict__ for r in results], f, indent=2)
        return results
