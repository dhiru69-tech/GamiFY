from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.middleware import setup_middleware
from app.api import auth, challenges, progress, leaderboard
from app.database import Base, engine
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
import app.models

limiter = Limiter(key_func=get_remote_address)
app = FastAPI(title="Gamify API", version="2.0.0", docs_url="/api/docs", redoc_url=None)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
setup_middleware(app)

app.include_router(auth.router,        prefix="/api")
app.include_router(challenges.router,  prefix="/api")
app.include_router(progress.router,    prefix="/api")
app.include_router(leaderboard.router, prefix="/api")

@app.on_event("startup")
async def startup():
    Base.metadata.create_all(bind=engine)
    print("Gamify v2.0 started successfully")

@app.get("/")
async def root():
    return {"status": "ok", "version": "2.0.0", "message": "Gamify API is running"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

# Extra wake-up endpoint frontend can ping
@app.get("/api/ping")
async def ping():
    return {"pong": True}
