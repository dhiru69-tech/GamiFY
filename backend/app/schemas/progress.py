from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ProgressOut(BaseModel):
    challenge_id: int
    completed: bool
    attempts: int
    xp_earned: int
    time_taken: Optional[float]
    hints_used: int
    completed_at: Optional[datetime]

    class Config:
        orm_mode = True

class SubmitResult(BaseModel):
    passed: bool
    xp_earned: int
    level_up: bool
    new_level: Optional[int]
    message: str
    streak_bonus: bool
