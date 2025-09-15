from pydantic import BaseModel
from typing import Optional, Literal

class ApplicationCreateSchema(BaseModel):
    job_id: int  # required when creating an application

class ApplicationUpdateSchema(BaseModel):
    status: Optional[Literal["pending", "accepted", "rejected"]] = None
