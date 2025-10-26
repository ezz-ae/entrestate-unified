import yaml, os
from typing import Any, Dict, List
def load_flow(path:str)->List[Dict[str,Any]]:
    if not os.path.exists(path): raise FileNotFoundError(path)
    data=yaml.safe_load(open(path)); steps=data.get('steps',[])
    if not isinstance(steps,list): raise ValueError('steps must be list')
    return steps
