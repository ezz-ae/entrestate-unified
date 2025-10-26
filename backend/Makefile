PY:=python3
.PHONY: install run-flow jobs-list
install: ; $(PY) -m pip install -r requirements.txt
jobs-list: ; $(PY) -m src.jobs.cli list
run-flow: ; $(PY) -m src.jobs.cli run-flow flows/flow.yml
