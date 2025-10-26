import os, json
class GeminiClient:
    def __init__(self, model=None, api_key=None):
        self.api_key=api_key or os.environ.get('GEMINI_API_KEY')
        self.model=model or os.environ.get('GEMINI_MODEL','gemini-1.5-pro')
        self.live=False; self._m=None
        if self.api_key:
            try:
                import google.generativeai as genai
                genai.configure(api_key=self.api_key)
                self._m=genai.GenerativeModel(self.model); self.live=True
            except Exception: self.live=False
    def extract_json(self, prompt:str, keys:list[str]):
        if not self.live or not self._m: return {k:None for k in keys}
        try:
            resp=self._m.generate_content(prompt); data=json.loads(resp.text or '{}')
            return {k:data.get(k) for k in keys} if isinstance(data,dict) else {k:None for k in keys}
        except Exception:
            return {k:None for k in keys}
