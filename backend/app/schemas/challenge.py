from pydantic import BaseModel
from typing import Optional, List
from app.models.challenge import Difficulty, GameMode, Language

class ChallengeOut(BaseModel):
    id: int
    title: str
    description: str
    story: Optional[str]
    difficulty: Difficulty
    game_mode: GameMode
    language: Language
    level_req: int
    starter_code: str
    hints: List[str]
    xp_reward: int
    time_limit: int

    class Config:
        orm_mode = True

class SubmitCode(BaseModel):
    challenge_id: int
    code: str
    time_taken: float
    hints_used: int = 0
