from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from datetime import datetime, timezone
from app.database import get_db
from app.models.user import User
from app.schemas.user import UserRegister, UserLogin, TokenResponse, UserPublic, RefreshRequest, ForgotPasswordRequest
from app.core.security import hash_password, verify_password, create_access_token, create_refresh_token, decode_token
from slowapi import Limiter
from slowapi.util import get_remote_address

router  = APIRouter(prefix="/auth", tags=["Auth"])
limiter = Limiter(key_func=get_remote_address)

def get_current_user(request: Request, db: Session = Depends(get_db)) -> User:
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        raise HTTPException(401, "Authentication required")
    payload = decode_token(auth.split(" ")[1])
    if not payload or payload.get("type") != "access":
        raise HTTPException(401, "Session expired — please sign in again")
    user = db.query(User).filter(User.id == int(payload["sub"])).first()
    if not user or not user.is_active:
        raise HTTPException(401, "User not found")
    return user

@router.post("/register", response_model=UserPublic, status_code=201)
@limiter.limit("20/minute")
async def register(request: Request, body: UserRegister, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(
        User.username.ilike(body.username.strip())
    ).first()
    if existing_user:
        raise HTTPException(400, "Username already taken — please choose another")
    if db.query(User).filter(User.email == body.email.strip().lower()).first():
        raise HTTPException(400, "Email already registered — try signing in instead")
    user = User(
        username=body.username.strip(),
        email=body.email.strip().lower(),
        hashed_password=hash_password(body.password)
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@router.post("/login", response_model=TokenResponse)
@limiter.limit("20/minute")
async def login(request: Request, body: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(
        User.username.ilike(body.username.strip())
    ).first()
    if not user or not verify_password(body.password, user.hashed_password):
        raise HTTPException(401, "Wrong username or password")
    if user.is_banned:
        raise HTTPException(403, "This account has been suspended")
    user.last_active = datetime.now(timezone.utc)
    db.commit()
    token_data = {"sub": str(user.id), "username": user.username}
    return TokenResponse(
        access_token=create_access_token(token_data),
        refresh_token=create_refresh_token(token_data)
    )

@router.post("/refresh", response_model=TokenResponse)
async def refresh(body: RefreshRequest, db: Session = Depends(get_db)):
    payload = decode_token(body.refresh_token)
    if not payload or payload.get("type") != "refresh":
        raise HTTPException(401, "Session expired — please sign in again")
    user = db.query(User).filter(User.id == int(payload["sub"])).first()
    if not user or not user.is_active:
        raise HTTPException(401, "User not found")
    token_data = {"sub": str(user.id), "username": user.username}
    return TokenResponse(
        access_token=create_access_token(token_data),
        refresh_token=create_refresh_token(token_data)
    )

@router.post("/forgot-password")
@limiter.limit("10/minute")
async def forgot_password(request: Request, body: ForgotPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(
        User.username.ilike(body.username.strip())
    ).first()
    # Verify both username AND email match — security check
    if not user or user.email != body.email.strip().lower():
        raise HTTPException(400, "No account found with that username and email combination")
    user.hashed_password = hash_password(body.new_password)
    db.commit()
    return {"message": "Password updated successfully"}
