from marshmallow import Schema, fields, validate, EXCLUDE
from datetime import date

class JobSchema(Schema):
    id = fields.Int(dump_only=True)
    title = fields.Str(required=True)
    company = fields.Str(required=True)
    location = fields.Str(required=True)
    employment_type = fields.Str(required=True, validate=validate.OneOf(["Full-Time", "Part-Time", "Contract", "Internship"]))
    salary_min = fields.Int(required=True)
    salary_max = fields.Int(required=True)
    description = fields.Str(required=True)
    posted_date = fields.Date(dump_only=True)
    user_id = fields.Int(dump_only=True)

    class Meta:
        unknown = EXCLUDE

class JobCreateSchema(Schema):
    title = fields.Str(required=True)
    company = fields.Str(required=True)
    location = fields.Str(required=True)
    employment_type = fields.Str(required=True)
    salary_min = fields.Int(required=True)
    salary_max = fields.Int(required=True)
    description = fields.Str(required=True)
    posted_date = fields.Date(load_default=date.today)

    class Meta:
        unknown = EXCLUDE

class JobUpdateSchema(Schema):
    title = fields.Str()
    company = fields.Str()
    location = fields.Str()
    employment_type = fields.Str()
    salary_min = fields.Int()
    salary_max = fields.Int()
    description = fields.Str()

    class Meta:
        unknown = EXCLUDE
