from db import db
from datetime import datetime

class Application(db.Model):
    __tablename__ = "applications"

    id = db.Column(db.Integer, primary_key=True)
    job_id = db.Column(db.Integer, db.ForeignKey("jobs.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    status = db.Column(db.String(20), default="applied")  
    applied_date = db.Column(db.Date, default=lambda: datetime.utcnow().date())

    # Relationships
    job = db.relationship("Job", backref=db.backref("applications", lazy=True))
    user = db.relationship("User", backref=db.backref("applications", lazy=True))

    def to_dict(self):
        return {
            "id": self.id,
            "job_id": self.job_id,
            "user_id": self.user_id,
            "status": self.status,
            "applied_date": self.applied_date.isoformat() if self.applied_date else None
        }
