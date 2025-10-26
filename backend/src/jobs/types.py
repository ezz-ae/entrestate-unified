from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Callable
@dataclass
class JobContext:
    env: Dict[str,str]=field(default_factory=dict)
    params: Dict[str,Any]=field(default_factory=dict)
    artifacts_dir: str = '../export'
@dataclass
class Job:
    name: str
    func: Callable[[Any],'JobResult']
    description: str=''
@dataclass
class JobResult:
    name: str
    ok: bool
    started_at: float
    ended_at: float
    metrics: Dict[str,Any]=field(default_factory=dict)
    artifacts: List[str]=field(default_factory=list)
    error: Optional[str]=None
