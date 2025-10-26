from typing import Callable, Dict
from .types import Job
JOBS: Dict[str, Job] = {}
def register_job(name:str, description:str='')->Callable:
    def dec(fn):
        JOBS[name]=Job(name=name, func=fn, description=description); return fn
    return dec
