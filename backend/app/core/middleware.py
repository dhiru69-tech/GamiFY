from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import time, os

def setup_middleware(app: FastAPI):
    origins = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
    ]
    # Add production frontend URL from env
    frontend_url = os.getenv("FRONTEND_URL", "")
    if frontend_url:
        origins.append(frontend_url)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_origin_regex=r"https://.*\.(vercel\.app|netlify\.app)",
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allow_headers=["*"],
    )

    @app.middleware("http")
    async def security_headers(request: Request, call_next):
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        return response

    @app.middleware("http")
    async def log_requests(request: Request, call_next):
        start = time.time()
        response = await call_next(request)
        ms = round((time.time() - start) * 1000, 1)
        print(f"[{request.method}] {request.url.path} {response.status_code} ({ms}ms)")
        return response
