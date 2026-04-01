from datetime import datetime, timedelta, timezone
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from app.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password[:72])

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain[:72], hashed)

def create_access_token(data: dict) -> str:
    p = data.copy()
    p.update({"exp": datetime.now(timezone.utc) + timedelta(minutes=settings.access_token_expire_minutes), "type": "access"})
    return jwt.encode(p, settings.secret_key, algorithm=settings.algorithm)

def create_refresh_token(data: dict) -> str:
    p = data.copy()
    p.update({"exp": datetime.now(timezone.utc) + timedelta(days=settings.refresh_token_expire_days), "type": "refresh"})
    return jwt.encode(p, settings.secret_key, algorithm=settings.algorithm)

def decode_token(token: str) -> Optional[dict]:
    try:
        return jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
    except JWTError:
        return None
