"""
reset_users.py
--------------
Run this ONCE before handing the project to a client.
Deletes every user account and their progress from the database.
Challenges and seed data are NOT touched.

Usage:
    cd backend
    python reset_users.py
"""

from app.database import SessionLocal, engine, Base
from app.models.user import User
from app.models.progress import UserProgress  # adjust import if model name differs

def reset():
    db = SessionLocal()
    try:
        # Delete progress first (FK constraint)
        progress_count = db.query(UserProgress).delete()
        user_count = db.query(User).delete()
        db.commit()
        print(f"Deleted {user_count} users and {progress_count} progress records.")
        print("Database is clean and ready for the client.")
    except Exception as e:
        db.rollback()
        print(f"Error: {e}")
        print("Check your model import names match your actual models.")
    finally:
        db.close()

if __name__ == "__main__":
    confirm = input("This will DELETE ALL USERS. Type 'yes' to continue: ")
    if confirm.strip().lower() == "yes":
        reset()
    else:
        print("Aborted.")
