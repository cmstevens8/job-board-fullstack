from flask import jsonify, request
from models.job import Job
from db import db
from schemas.job_marshmallow import JobSchema, JobCreateSchema, JobUpdateSchema
from datetime import date
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_smorest import Blueprint as SmorestBlueprint

job_blp = SmorestBlueprint("job_blp", __name__, description="Jobs operations")

@job_blp.route("/jobs", methods=["GET"])
@jwt_required(optional=True)
def get_jobs():
    """
    GET /jobs
    - Employers: only see jobs they posted
    - Job seekers / public: see all jobs
    """
    current_user_id = get_jwt_identity()  # None if no JWT
    jobs = Job.query

    if current_user_id:
        from models.user import User
        user = User.query.get(int(current_user_id))
        if user and user.role == "employer":
            # Only return this employer's jobs
            jobs = jobs.filter_by(user_id=user.id)

    jobs = jobs.all()
    schema = JobSchema(many=True)
    return jsonify({"jobs": schema.dump(jobs)}), 200

# NEW: GET a single job
@job_blp.route("/jobs/<int:job_id>", methods=["GET"])
@jwt_required(optional=True)
def get_job(job_id):
    job = Job.query.get_or_404(job_id)
    schema = JobSchema()
    return jsonify({"job": schema.dump(job)}), 200

@job_blp.route("/jobs", methods=["POST"])
@jwt_required()
@job_blp.arguments(JobCreateSchema)
@job_blp.response(201, JobSchema)
def create_job(data):
    current_user_id = int(get_jwt_identity())
    job = Job(
        title=data["title"],
        company=data["company"],
        location=data["location"],
        employment_type=data["employment_type"],
        salary_min=data["salary_min"],
        salary_max=data["salary_max"],
        description=data["description"],
        posted_date=data.get("posted_date") or date.today(),
        user_id=current_user_id
    )
    db.session.add(job)
    db.session.commit()
    return job

@job_blp.route("/jobs/<int:job_id>", methods=["PUT"])
@jwt_required()
@job_blp.arguments(JobUpdateSchema)
@job_blp.response(200, JobSchema)
def update_job(data, job_id):
    job = Job.query.get_or_404(job_id)
    for key, value in data.items():
        setattr(job, key, value)
    db.session.commit()
    return job

@job_blp.route("/jobs/<int:job_id>", methods=["DELETE"])
@jwt_required()
def delete_job(job_id):
    job = Job.query.get_or_404(job_id)
    db.session.delete(job)
    db.session.commit()
    return "", 204
