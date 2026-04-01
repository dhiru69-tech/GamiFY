import os
from dotenv import load_dotenv
load_dotenv()

class Settings:
    database_url: str = os.getenv("DATABASE_URL", "postgresql://gamify:gem@localhost:5432/gamify_db")
    secret_key: str = os.getenv("SECRET_KEY", "change-this-in-production")
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    refresh_token_expire_days: int = 7

settings = Settings()
