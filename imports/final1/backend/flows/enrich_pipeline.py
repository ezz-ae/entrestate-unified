import os, json, time
from backend.src.jobs.registry import register_job
from backend.src.jobs.types import JobResult, JobContext
try:
    from backend.providers.gemini import GeminiClient
    G=GeminiClient()
except Exception:
    G=None

def _enrich(r:dict)->dict:
    if G and G.live:
        data=G.extract_json('Normalize: '+json.dumps(r), ['name','developer','area','status','price_from_aed','handover_year'])
        data['project_id']=r.get('project_id'); return data
    from backend.agents.enricher_stub import enrich_record
    return enrich_record(r)

@register_job('enrich_projects', description='Normalize & enrich -> ../export/projects.json')
def run(ctx: JobContext) -> JobResult:
    s=time.time()
    try:
        src=os.path.join('..','data_sources','projects_seed.json')
        recs=json.load(open(src)) if os.path.exists(src) else [{'project_id':'demo-tower','name':'Demo Tower','price_from_aed':750000,'handover_year':2028}]
        enriched=[_enrich(x) for x in recs]
        os.makedirs(ctx.artifacts_dir, exist_ok=True)
        out=os.path.join(ctx.artifacts_dir,'projects.json')
        json.dump(enriched, open(out,'w'), indent=2)
        e=time.time()
        return JobResult(name='enrich_projects', ok=True, started_at=s, ended_at=e, metrics={'count':len(enriched)}, artifacts=[out])
    except Exception as ex:
        e=time.time(); return JobResult(name='enrich_projects', ok=False, started_at=s, ended_at=e, error=str(ex))
