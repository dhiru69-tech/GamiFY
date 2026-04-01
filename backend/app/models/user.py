from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.database import Base

class User(Base):
    __tablename__ = "users"
    id              = Column(Integer, primary_key=True, index=True)
    username        = Column(String(30), unique=True, index=True, nullable=False)
    email           = Column(String(120), unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active       = Column(Boolean, default=True)
    is_banned       = Column(Boolean, default=False)
    level           = Column(Integer, default=1)
    xp              = Column(Integer, default=0)
    total_xp        = Column(Integer, default=0)
    streak_days     = Column(Integer, default=0)
    last_active     = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    created_at      = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    badges          = Column(String, default="[]")
    failed_attempts = Column(Integer, default=0)
    locked_until    = Column(DateTime(timezone=True), nullable=True)
    progress        = relationship("UserProgress", back_populates="user", cascade="all, delete-orphan")
