from __future__ import annotations
import argparse, os, json, sys
from .registry import JOBS
from .executor import JobExecutor
from .planner import load_flow

def main():
    parser = argparse.ArgumentParser(prog="entrestate-jobs", description="Entrestate Backend Job Runner")
    sub = parser.add_subparsers(dest="cmd", required=True)

    sub.add_parser("list", help="List available jobs")  # jobs list

    p_run = sub.add_parser("run-job", help="Run a single job")
    p_run.add_argument("name")

    p_flow = sub.add_parser("run-flow", help="Run a flow YAML")
    p_flow.add_argument("flow_path")  # e.g., flows/flow.yml

    args = parser.parse_args()

    if args.cmd == "list":
        for k, v in JOBS.items():
            print(f"- {k}: {v.description}")
        return

    # env
    env = {}
    if os.path.exists(".env"):
        try:
            for line in open(".env", "r", encoding="utf-8"):
                line = line.strip()
                if not line or line.startswith("#"): continue
                if "=" in line:
                    k, v = line.split("=", 1)
                    env[k.strip()] = v.strip()
        except Exception:
            pass

    ex = JobExecutor(env=env, artifacts_dir=os.environ.get("SNAPSHOT_DIR", "export"))

    if args.cmd == "run-job":
        res = ex.run_job(args.name)
        print(json.dumps(res.__dict__, indent=2))
        sys.exit(0 if res.ok else 1)

    if args.cmd == "run-flow":
        steps = load_flow(args.flow_path)
        results = ex.run_flow(steps)
        ok = all(r.ok for r in results)
        print(json.dumps([r.__dict__ for r in results], indent=2))
        sys.exit(0 if ok else 1)

if __name__ == "__main__":
    main()
