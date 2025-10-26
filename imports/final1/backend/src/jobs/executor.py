import os, json, time, traceback
from typing import Dict, List
from .types import JobContext, JobResult
from .registry import JOBS
class JobExecutor:
    def __init__(self, env:Dict[str,str]|None=None, artifacts_dir:str='../export'):
        self.env=env or {}; self.artifacts_dir=artifacts_dir; os.makedirs(self.artifacts_dir, exist_ok=True)
    def run_job(self,name:str,params:Dict|None=None)->JobResult:
        if name not in JOBS: raise ValueError(f'Unknown job: {name}')
        ctx=JobContext(env=self.env, params=params or {}, artifacts_dir=self.artifacts_dir)
        s=time.time();
        try:
            r=JOBS[name].func(ctx)
            if not isinstance(r, JobResult): raise RuntimeError('Invalid result')
            return r
        except Exception as e:
            e2=time.time(); return JobResult(name=name, ok=False, started_at=s, ended_at=e2, error=f"{e}\n{traceback.format_exc()}")
    def run_flow(self, steps:List[Dict])->List[JobResult]:
        rs=[]; done=set()
        for st in steps:
            needs=set(st.get('needs',[]))
            if not needs.issubset(done): raise RuntimeError(f'Missing deps: {needs - done}')
            r=self.run_job(st['job'], st.get('params')); rs.append(r)
            if r.ok: done.add(st['job'])
            else: break
        json.dump([r.__dict__ for r in rs], open(os.path.join(self.artifacts_dir,'last_run_report.json'),'w'), indent=2)
        return rs
