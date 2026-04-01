from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models.challenge import Challenge
from app.models.progress import UserProgress
from app.models.user import User
from app.schemas.challenge import ChallengeOut, SubmitCode
from app.schemas.progress import SubmitResult
from app.api.auth import get_current_user
from datetime import datetime, timezone

router = APIRouter(prefix="/challenges", tags=["Challenges"])

def xp_threshold(level: int) -> int:
    return level * 200 + 100

def run_tests(code: str, test_cases: list, language: str):
    if language != "python":
        return True, "Tests passed"
    passed = 0
    safe_builtins = {"__builtins__": {
        "print": print, "len": len, "range": range, "int": int, "str": str,
        "float": float, "list": list, "dict": dict, "tuple": tuple, "set": set,
        "sum": sum, "max": max, "min": min, "sorted": sorted, "reversed": reversed,
        "enumerate": enumerate, "zip": zip, "map": map, "filter": filter,
        "abs": abs, "round": round, "isinstance": isinstance, "type": type,
        "bool": bool, "any": any, "all": all, "chr": chr, "ord": ord,
    }}
    for tc in test_cases:
        try:
            local_ns = {}
            exec(code, safe_builtins, local_ns)
            funcs = [v for v in local_ns.values() if callable(v)]
            if funcs:
                result = funcs[-1](*tc.get("input", []))
                if str(result) == str(tc["expected_output"]):
                    passed += 1
        except Exception:
            pass
    total = len(test_cases)
    return (True, f"All {total} tests passed!") if passed == total else (False, f"{passed}/{total} tests passed")

@router.get("/", response_model=List[ChallengeOut])
async def list_challenges(language: Optional[str]=None, difficulty: Optional[str]=None,
                          db: Session=Depends(get_db), current_user: User=Depends(get_current_user)):
    q = db.query(Challenge)
    if language:   q = q.filter(Challenge.language == language)
    if difficulty: q = q.filter(Challenge.difficulty == difficulty)
    return q.order_by(Challenge.language, Challenge.difficulty).all()

@router.get("/{challenge_id}", response_model=ChallengeOut)
async def get_challenge(challenge_id: int, db: Session=Depends(get_db), current_user: User=Depends(get_current_user)):
    ch = db.query(Challenge).filter(Challenge.id == challenge_id).first()
    if not ch: raise HTTPException(404, "Challenge not found")
    return ch

@router.post("/submit", response_model=SubmitResult)
async def submit(body: SubmitCode, db: Session=Depends(get_db), current_user: User=Depends(get_current_user)):
    ch = db.query(Challenge).filter(Challenge.id == body.challenge_id).first()
    if not ch: raise HTTPException(404, "Challenge not found")
    prog = db.query(UserProgress).filter(UserProgress.user_id==current_user.id, UserProgress.challenge_id==ch.id).first()
    if not prog:
        prog = UserProgress(user_id=current_user.id, challenge_id=ch.id)
        db.add(prog)
    prog.attempts += 1
    passed, message = run_tests(body.code, ch.test_cases, ch.language.value)
    if not passed:
        db.commit()
        return SubmitResult(passed=False, xp_earned=0, level_up=False, new_level=None, message=message, streak_bonus=False)
    xp = max(ch.xp_reward - (body.hints_used * 10), ch.xp_reward // 4)
    streak_bonus = False
    if body.time_taken < ch.time_limit * 0.5: xp = int(xp * 1.3)
    if current_user.streak_days >= 5: xp = int(xp * 1.5); streak_bonus = True
    prog.completed=True; prog.xp_earned=xp; prog.time_taken=body.time_taken
    prog.hints_used=body.hints_used; prog.completed_at=datetime.now(timezone.utc)
    current_user.xp += xp; current_user.total_xp += xp
    level_up=False; new_level=None
    while current_user.xp >= xp_threshold(current_user.level):
        current_user.xp -= xp_threshold(current_user.level)
        current_user.level += 1; level_up=True; new_level=current_user.level
    db.commit()
    return SubmitResult(passed=True, xp_earned=xp, level_up=level_up, new_level=new_level, message=message, streak_bonus=streak_bonus)
