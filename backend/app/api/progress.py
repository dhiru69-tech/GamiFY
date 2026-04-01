from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.progress import UserProgress
from app.models.challenge import Challenge
from app.models.user import User
from app.schemas.progress import ProgressOut
from app.schemas.user import UserPublic
from app.api.auth import get_current_user

router = APIRouter(prefix="/progress", tags=["Progress"])

@router.get("/me", response_model=UserPublic)
async def me(current_user: User=Depends(get_current_user)):
    return current_user

@router.get("/my-challenges", response_model=List[ProgressOut])
async def my_challenges(db: Session=Depends(get_db), current_user: User=Depends(get_current_user)):
    return db.query(UserProgress).filter(UserProgress.user_id==current_user.id).all()

@router.get("/stats")
async def stats(db: Session=Depends(get_db), current_user: User=Depends(get_current_user)):
    all_prog = db.query(UserProgress).filter(UserProgress.user_id==current_user.id).all()
    completed = [p for p in all_prog if p.completed]
    lang_stats = {}
    for lang in ["python","javascript","cpp","java"]:
        total = db.query(Challenge).filter(Challenge.language==lang).count()
        done  = db.query(UserProgress).join(Challenge).filter(
            UserProgress.user_id==current_user.id,
            UserProgress.completed==True,
            Challenge.language==lang
        ).count()
        lang_stats[lang] = {"total": total, "completed": done, "pct": round(done/max(total,1)*100,1)}
    return {
        "username": current_user.username, "level": current_user.level,
        "xp": current_user.xp, "total_xp": current_user.total_xp,
        "streak_days": current_user.streak_days, "completed": len(completed),
        "total_attempts": sum(p.attempts for p in all_prog),
        "accuracy": round(len(completed)/max(len(all_prog),1)*100,1),
        "badges": current_user.badges, "lang_stats": lang_stats,
    }
