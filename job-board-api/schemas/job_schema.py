from pydantic import BaseModel
from datetime import date
from typing import Optional

class JobCreateSchema(BaseModel):
    title: str
    company: str
    location: str
    employment_type: str
    salary_min: int
    salary_max: int
    description: str
    posted_date: Optional[date] = None

class JobUpdateSchema(BaseModel):
    title: Optional[str] = None
    company: Optional[str] = None
    location: Optional[str] = None
    employment_type: Optional[str] = None
    salary_min: Optional[int] = None
    salary_max: Optional[int] = None
    description: Optional[str] = None
    posted_date: Optional[date] = None

