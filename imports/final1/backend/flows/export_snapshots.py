import os, json, time
from backend.src.jobs.registry import register_job
from backend.src.jobs.types import JobResult, JobContext
@register_job('export_snapshots', description='Bundle export manifest')
def run(ctx: JobContext) -> JobResult:
    s=time.time()
    try:
        arts=[]
        for fn in ['projects.json','valuations.json']:
            p=os.path.join(ctx.artifacts_dir,fn)
            if os.path.exists(p): arts.append(p)
        man=os.path.join(ctx.artifacts_dir,'snapshot_manifest.json')
        json.dump({'artifacts':arts}, open(man,'w'), indent=2)
        e=time.time(); return JobResult(name='export_snapshots', ok=True, started_at=s, ended_at=e, metrics={'artifacts':len(arts)}, artifacts=[man])
    except Exception as ex:
        e=time.time(); return JobResult(name='export_snapshots', ok=False, started_at=s, ended_at=e, error=str(ex))
