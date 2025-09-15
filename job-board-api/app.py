import os
from flask import Flask, jsonify
from db import db
from routes.job_routes import job_blp
from routes.user_routes import user_blp
from routes.application_routes import application_blp
from config import Config
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_smorest import Api
from flask_cors import CORS

# Initialize extensions
bcrypt = Bcrypt()
jwt = JWTManager()
db_instance = db
api = Api()  # Initialize without app

def create_app(testing=False):
    """
    Flask application factory.
    :param testing: If True, configures app for testing (in-memory SQLite DB)
    """
    app = Flask(__name__)
    CORS(app)
    
    # Load base config
    app.config.from_object(Config)
    
    # Override for testing
    if testing:
        app.config["TESTING"] = True
        app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"
        app.config["JWT_SECRET_KEY"] = "test-secret-key"
    
    # Ensure JWT secret key
    if not app.config.get("JWT_SECRET_KEY"):
        app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "super-secret-key")
    
    # OpenAPI / Swagger Config
    app.config["API_TITLE"] = "Job Board API"
    app.config["API_VERSION"] = "v1"
    app.config["OPENAPI_VERSION"] = "3.0.3"
    app.config["OPENAPI_URL_PREFIX"] = "/"
    app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"
    app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"
    
    # Initialize extensions
    db_instance.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    api.init_app(app)
    
    # Register blueprints
    api.register_blueprint(job_blp)
    api.register_blueprint(application_blp)
    api.register_blueprint(user_blp)
    
    # --- Global error handlers ---
    @app.errorhandler(400)
    def bad_request(e):
        return jsonify({"status": "error", "error": "Bad Request"}), 400

    @app.errorhandler(401)
    def unauthorized(e):
        return jsonify({"status": "error", "error": "Unauthorized"}), 401

    @app.errorhandler(403)
    def forbidden(e):
        return jsonify({"status": "error", "error": "Forbidden"}), 403

    @app.errorhandler(404)
    def not_found(e):
        return jsonify({"status": "error", "error": "Not Found"}), 404

    @app.errorhandler(Exception)
    def handle_global_errors(e):
        return jsonify({"status": "error", "error": str(e)}), 500
    
    # Create tables
    with app.app_context():
        db_instance.create_all()
    
    return app

# Instantiate app for running
app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
