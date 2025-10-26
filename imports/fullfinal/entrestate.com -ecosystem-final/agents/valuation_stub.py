# Simple valuation math demo. Replace with real comps + Gemini assist.
from typing import Dict, Any

def indicative_yield(price_aed: float, annual_rent_aed: float) -> float:
    if not price_aed:
        return 0.0
    return round((annual_rent_aed / price_aed) * 100.0, 2)
