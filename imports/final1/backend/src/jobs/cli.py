import argparse, os, json, sys
from .registry import JOBS
from .executor import JobExecutor
from .planner import load_flow
def main():
    p=argparse.ArgumentParser(); s=p.add_subparsers(dest='cmd', required=True)
    s.add_parser('list'); r=s.add_parser('run-job'); r.add_argument('name')
    f=s.add_parser('run-flow'); f.add_argument('flow_path'); a=p.parse_args()
    env={}
    if os.path.exists('.env'):
        for line in open('.env'):
            line=line.strip();
            if not line or line.startswith('#'): continue
            if '=' in line:
                k,v=line.split('=',1); env[k.strip()]=v.strip()
    ex=JobExecutor(env=env, artifacts_dir='../export')
    if a.cmd=='list':
        for k,v in JOBS.items(): print(f'- {k}: {v.description}')
        return
    if a.cmd=='run-job':
        res=ex.run_job(a.name); print(json.dumps(res.__dict__, indent=2)); sys.exit(0 if res.ok else 1)
    if a.cmd=='run-flow':
        steps=load_flow(a.flow_path); rs=ex.run_flow(steps); ok=all(r.ok for r in rs)
        print(json.dumps([r.__dict__ for r in rs], indent=2)); sys.exit(0 if ok else 1)
if __name__=='__main__': main()
