from db import db
from datetime import date
from models.user import User  

class Job(db.Model):
    __tablename__ = "jobs"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    company = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    employment_type = db.Column(db.String(50), nullable=False)
    salary_min = db.Column(db.Integer, nullable=False)
    salary_max = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text, nullable=False)
    posted_date = db.Column(db.Date, nullable=False, default=date.today)
    
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user = db.relationship("User", backref=db.backref("jobs", lazy=True))

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "company": self.company,
            "location": self.location,
            "employment_type": self.employment_type,
            "salary_min": self.salary_min,
            "salary_max": self.salary_max,
            "description": self.description,
            "posted_date": self.posted_date.isoformat(),
            "user_id": self.user_id  
        }
