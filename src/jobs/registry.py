from __future__ import annotations
from typing import Callable, Dict
from .types import Job, JobContext, JobResult

JOBS: Dict[str, Job] = {}

def register_job(name: str, description: str = "") -> Callable:
    def decorator(fn: Callable[[JobContext], JobResult]):
        JOBS[name] = Job(name=name, func=fn, description=description)
        return fn
    return decorator
