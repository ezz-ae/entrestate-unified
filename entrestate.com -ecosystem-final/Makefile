# Makefile for backend jobs (no UI changes)
PY := python3

.PHONY: install jobs-list run-flow run-enrich run-valuate run-export

install:
	$(PY) -m pip install -r requirements.txt

jobs-list:
	$(PY) -m src.jobs.cli list

run-flow:
	$(PY) -m src.jobs.cli run-flow flows/flow.yml

run-enrich:
	$(PY) -m src.jobs.cli run-job enrich_projects

run-valuate:
	$(PY) -m src.jobs.cli run-job valuate_projects

run-export:
	$(PY) -m src.jobs.cli run-job export_snapshots
