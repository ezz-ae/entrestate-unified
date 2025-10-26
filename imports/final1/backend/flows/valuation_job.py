import os, json, time
from backend.src.jobs.registry import register_job
from backend.src.jobs.types import JobResult, JobContext
from backend.agents.valuation_stub import indicative_yield
@register_job('valuate_projects', description='Compute yields -> ../export/valuations.json')
def run(ctx: JobContext) -> JobResult:
    s=time.time()
    try:
        pj=os.path.join(ctx.artifacts_dir,'projects.json')
        if not os.path.exists(pj): raise FileNotFoundError('Run enrich_projects first')
        projects=json.load(open(pj))
        vals=[]
        for p in projects:
            price=float(p.get('price_from_aed') or 0)
            rent=price*0.06
            vals.append({'project_id':p.get('project_id'),'indicative_yield':indicative_yield(price,rent)})
        out=os.path.join(ctx.artifacts_dir,'valuations.json')
        json.dump(vals, open(out,'w'), indent=2)
        e=time.time(); return JobResult(name='valuate_projects', ok=True, started_at=s, ended_at=e, metrics={'count':len(vals)}, artifacts=[out])
    except Exception as ex:
        e=time.time(); return JobResult(name='valuate_projects', ok=False, started_at=s, ended_at=e, error=str(ex))
