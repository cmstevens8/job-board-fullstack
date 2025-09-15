from pydantic import BaseModel, EmailStr
from typing import Optional, Literal

class UserCreateSchema(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: Optional[Literal["job-seeker", "employer"]] = "job-seeker"

class UserLoginSchema(BaseModel):
    email: EmailStr
    password: str


