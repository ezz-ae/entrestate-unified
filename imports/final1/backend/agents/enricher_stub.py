def enrich_record(r:dict)->dict:
    o=dict(r); o.setdefault('confidence',0.6); return o
