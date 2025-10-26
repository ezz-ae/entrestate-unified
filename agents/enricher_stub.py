# Gemini Enricher Stub (no external calls). Replace with real Gemini logic.
from typing import Dict, Any

def enrich_record(record: Dict[str, Any]) -> Dict[str, Any]:
    # Minimal demo enrichment
    out = dict(record)
    out.setdefault("confidence", 0.6)
    out.setdefault("sources", [])
    return out
