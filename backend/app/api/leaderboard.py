from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.api.auth import get_current_user

router = APIRouter(prefix="/leaderboard", tags=["Leaderboard"])

@router.get("/")
async def leaderboard(limit: int=Query(default=20,le=50), db: Session=Depends(get_db), current_user: User=Depends(get_current_user)):
    top = db.query(User).filter(User.is_active==True,User.is_banned==False).order_by(User.total_xp.desc()).limit(limit).all()
    board = [{"rank":i+1,"username":u.username,"level":u.level,"total_xp":u.total_xp,"streak":u.streak_days,"is_me":u.id==current_user.id} for i,u in enumerate(top)]
    if not any(e["is_me"] for e in board):
        my_rank = db.query(User).filter(User.total_xp>current_user.total_xp,User.is_active==True).count()+1
        board.append({"rank":my_rank,"username":current_user.username,"level":current_user.level,"total_xp":current_user.total_xp,"streak":current_user.streak_days,"is_me":True})
    return board
