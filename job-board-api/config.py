import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")

    if not SQLALCHEMY_DATABASE_URI:
        SQLALCHEMY_DATABASE_URI = "sqlite:///job_board.db"

    SQLALCHEMY_TRACK_MODIFICATIONS = False
