import os

class Config:
    DB_USER = os.getenv("DB_USER")
    DB_PASSWORD = os.getenv("DB_PASSWORD")
    DB_HOST = os.getenv("DB_HOST", "localhost")
    DB_PORT = os.getenv("DB_PORT", "5432")
    DB_NAME = os.getenv("DB_NAME", "job_board_db")

    if DB_USER and DB_PASSWORD:
        # Use PostgreSQL if credentials are provided
        SQLALCHEMY_DATABASE_URI = (
            f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
        )
    else:
        # Fallback to local SQLite
        SQLALCHEMY_DATABASE_URI = "sqlite:///job_board.db"

    SQLALCHEMY_TRACK_MODIFICATIONS = False
