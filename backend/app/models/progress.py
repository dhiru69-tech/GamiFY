from sqlalchemy import Column, Integer, Boolean, DateTime, ForeignKey, Float
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.database import Base

class UserProgress(Base):
    __tablename__ = "user_progress"
    id=Column(Integer,primary_key=True,index=True)
    user_id=Column(Integer,ForeignKey("users.id"),nullable=False)
    challenge_id=Column(Integer,ForeignKey("challenges.id"),nullable=False)
    completed=Column(Boolean,default=False)
    attempts=Column(Integer,default=0)
    xp_earned=Column(Integer,default=0)
    time_taken=Column(Float,nullable=True)
    hints_used=Column(Integer,default=0)
    completed_at=Column(DateTime(timezone=True),nullable=True)
    first_tried=Column(DateTime(timezone=True),default=lambda: datetime.now(timezone.utc))
    user=relationship("User",back_populates="progress")
    challenge=relationship("Challenge",back_populates="progress")
