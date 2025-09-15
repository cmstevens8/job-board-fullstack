from flask import jsonify, request
from db import db
from models.application import Application
from models.job import Job
from schemas.application_marshmallow import ApplicationSchema, ApplicationCreateSchema, ApplicationUpdateSchema
from flask_smorest import Blueprint as SmorestBlueprint
from flask_jwt_extended import jwt_required, get_jwt_identity

application_blp = SmorestBlueprint("application_blp", __name__, description="Applications operations")

# --- GET APPLICATIONS ---
@application_blp.route("/applications", methods=["GET"])
@jwt_required()
def get_applications():
    current_user_id = int(get_jwt_identity())
    user_role = request.args.get("role")  # optional query param: "job-seeker" or "employer"

    query = Application.query.join(Job)

    if user_role == "job-seeker":
        query = query.filter(Application.user_id == current_user_id)
    elif user_role == "employer":
        query = query.filter(Job.user_id == current_user_id)

    applications = query.all()
    return jsonify(ApplicationSchema(many=True).dump(applications))

# --- CREATE APPLICATION ---
@application_blp.route("/applications", methods=["POST"])
@jwt_required()
@application_blp.arguments(ApplicationCreateSchema)
@application_blp.response(201, ApplicationSchema)
def create_application(data):
    current_user_id = int(get_jwt_identity())
    application = Application(
        user_id=current_user_id,
        job_id=data["job_id"],
        status="pending"
    )
    db.session.add(application)
    db.session.commit()
    return application

# --- UPDATE APPLICATION ---
@application_blp.route("/applications/<int:app_id>", methods=["PUT"])
@jwt_required()
@application_blp.arguments(ApplicationUpdateSchema)
@application_blp.response(200, ApplicationSchema)
def update_application(data, app_id):
    application = Application.query.get_or_404(app_id)
    for key, value in data.items():
        setattr(application, key, value)
    db.session.commit()
    return application

# --- DELETE APPLICATION ---
@application_blp.route("/applications/<int:app_id>", methods=["DELETE"])
@jwt_required()
def delete_application(app_id):
    application = Application.query.get_or_404(app_id)
    db.session.delete(application)
    db.session.commit()
    return "", 204
