from flask import request, jsonify
from db import db
from models.user import User
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required
from datetime import timedelta
from flask_smorest import Blueprint as SmorestBlueprint
from schemas.user_marshmallow import UserSchema

user_blp = SmorestBlueprint("user_blp", __name__, description="Users operations")

@user_blp.route("/users", methods=["POST"])
@user_blp.arguments(UserSchema, location="json")
@user_blp.response(201, UserSchema)
def register_user(data):
    existing_user = User.query.filter_by(email=data["email"]).first()
    if existing_user:
        return jsonify({"status": "error", "error": "User with this email already exists"}), 400

    hashed_password = generate_password_hash(data["password"]).decode("utf-8")
    new_user = User(
        name=data["name"],
        email=data["email"],
        password=hashed_password,
        role=data.get("role", "job-seeker")
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "status": "success",
        "message": "User registered successfully",
        "id": new_user.id,
        "name": new_user.name,
        "email": new_user.email,
        "role": new_user.role
    }), 201

@user_blp.route("/login", methods=["POST"])
@user_blp.arguments(UserSchema(only=("email", "password")), location="json")
def login_user(data):
    user = User.query.filter_by(email=data["email"]).first()
    if not user or not check_password_hash(user.password, data["password"]):
        return jsonify({"status": "error", "error": "Invalid email or password"}), 401

    access_token = create_access_token(identity=str(user.id), expires_delta=timedelta(hours=1))
    return jsonify({
        "status": "success",
        "message": "Login successful",
        "access_token": access_token,
        "id": user.id,
        "role": user.role,
        "name": user.name,
        "email": user.email
    })

@user_blp.route("/users", methods=["GET"])
@jwt_required(optional=True)
def get_users():
    page = int(request.args.get("page", 1))
    per_page = int(request.args.get("per_page", 10))
    paginated = User.query.paginate(page=page, per_page=per_page, error_out=False)
    return jsonify({
        "status": "success",
        "page": page,
        "per_page": per_page,
        "total": paginated.total,
        "data": UserSchema(many=True).dump(paginated.items)
    })
