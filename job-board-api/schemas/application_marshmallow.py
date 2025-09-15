from marshmallow import Schema, fields, EXCLUDE

class ApplicationSchema(Schema):
    id = fields.Int(dump_only=True)
    job_id = fields.Int(required=True)
    user_id = fields.Int(dump_only=True)
    status = fields.Str()
    applied_date = fields.Date(dump_only=True)

    class Meta:
        unknown = EXCLUDE

class ApplicationCreateSchema(Schema):
    job_id = fields.Int(required=True)

    class Meta:
        unknown = EXCLUDE

class ApplicationUpdateSchema(Schema):
    status = fields.Str(required=True)

    class Meta:
        unknown = EXCLUDE
