"""
seed_demo_user.py
-----------------
Creates a demo account used for the one-click "Continue with Demo Account" button.
Run this once after reset_users.py on the production DB.

    cd backend
    python seed_demo_user.py
"""
from app.database import SessionLocal
from app.models.user import User
from app.core.security import hash_password

DEMO_USERNAME = "demo_user"
DEMO_EMAIL    = "demo@gamify.app"
DEMO_PASSWORD = "demo1234"

def seed():
    db = SessionLocal()
    try:
        existing = db.query(User).filter(User.username == DEMO_USERNAME).first()
        if existing:
            print("Demo user already exists.")
            return
        user = User(
            username=DEMO_USERNAME,
            email=DEMO_EMAIL,
            hashed_password=hash_password(DEMO_PASSWORD),
        )
        db.add(user)
        db.commit()
        print(f"Demo user created: {DEMO_USERNAME} / {DEMO_PASSWORD}")
    finally:
        db.close()

if __name__ == "__main__":
    seed()
