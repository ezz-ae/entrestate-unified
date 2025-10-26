from __future__ import annotations
from typing import Any, Dict, List
import os, yaml

def load_flow(path: str) -> List[Dict[str, Any]]:
    if not os.path.exists(path):
        raise FileNotFoundError(f"Flow file not found: {path}")
    with open(path, "r", encoding="utf-8") as f:
        data = yaml.safe_load(f)
    steps = data.get("steps", [])
    if not isinstance(steps, list):
        raise ValueError("Invalid flow file: 'steps' must be a list")
    return steps
