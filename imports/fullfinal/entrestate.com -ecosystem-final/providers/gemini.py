"""Lightweight Gemini provider with graceful fallback.
Uses google-generativeai if GEMINI_API_KEY present; otherwise, falls back to a mock that passes inputs through.
This is designed to run headless (no UI changes).
"""
from __future__ import annotations
import os
from typing import Any, Dict, List, Optional

class GeminiClient:
    def __init__(self, model: str = None, api_key: Optional[str] = None):
        self.api_key = api_key or os.environ.get("GEMINI_API_KEY")
        self.model = model or os.environ.get("GEMINI_MODEL", "gemini-1.5-pro")
        self._live = False
        self._model_obj = None
        if self.api_key:
            try:
                import google.generativeai as genai  # type: ignore
                genai.configure(api_key=self.api_key)
                self._model_obj = genai.GenerativeModel(self.model)
                self._live = True
            except Exception:
                # silent fallback to mock
                self._live = False

    @property
    def live(self) -> bool:
        return self._live

    def extract_json(self, prompt: str, schema_hint: Dict[str, Any]) -> Dict[str, Any]:
        """Ask model to return a JSON following schema_hint keys only.
        Returns {} on failure or mock mode.
        """
        if not self._live or self._model_obj is None:
            # mock mode: return keys with None values
            return {k: None for k in schema_hint.keys()}
        try:
            sys = (
                "You are a strict JSON extractor."                "Return ONLY valid JSON matching the provided keys."                "If unsure, set value to null."            )
            content = [
                {"role": "user", "parts": [{"text": sys + "\n\n" + prompt}]}
            ]
            resp = self._model_obj.generate_content(content)
            txt = resp.text or "{}"
            import json as _json
            data = _json.loads(txt)
            # keep only expected keys
            out = {}
            for k in schema_hint.keys():
                out[k] = data.get(k, None) if isinstance(data, dict) else None
            return out
        except Exception:
            return {k: None for k in schema_hint.keys()}

    def summarize_md(self, prompt: str, bullets: int = 6) -> str:
        if not self._live or self._model_obj is None:
            return "- Summary not available (mock)"
        try:
            sys = "Summarize in concise bullet points (max %d)." % bullets
            content = [{"role": "user", "parts": [{"text": sys + "\n\n" + prompt}]}]
            resp = self._model_obj.generate_content(content)
            return resp.text or ""
        except Exception:
            return "- Summary not available"
