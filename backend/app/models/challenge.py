from sqlalchemy import Column, Integer, String, Text, Enum, JSON
from sqlalchemy.orm import relationship
from app.database import Base
import enum

class Difficulty(str, enum.Enum):
    easy="easy"; medium="medium"; hard="hard"; boss="boss"

class GameMode(str, enum.Enum):
    puzzle="puzzle"; battle="battle"; quest="quest"; debug="debug"; boss="boss"

class Language(str, enum.Enum):
    python="python"; javascript="javascript"; cpp="cpp"; java="java"

class Challenge(Base):
    __tablename__ = "challenges"
    id=Column(Integer,primary_key=True,index=True)
    title=Column(String(120),nullable=False)
    description=Column(Text,nullable=False)
    story=Column(Text,nullable=True)
    difficulty=Column(Enum(Difficulty),nullable=False)
    game_mode=Column(Enum(GameMode),nullable=False)
    language=Column(Enum(Language),nullable=False)
    level_req=Column(Integer,default=1)
    starter_code=Column(Text,nullable=False)
    solution=Column(Text,nullable=False)
    test_cases=Column(JSON,nullable=False)
    hints=Column(JSON,default=list)
    xp_reward=Column(Integer,default=100)
    time_limit=Column(Integer,default=300)
    progress=relationship("UserProgress",back_populates="challenge")
