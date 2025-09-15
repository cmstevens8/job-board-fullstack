import pytest
from app import create_app, db
from models.user import User
from models.job import Job
from models.application import Application
from flask_bcrypt import generate_password_hash
from flask_jwt_extended import create_access_token

def safe_delete(obj):
    """Safely delete an object from the DB without raising errors."""
    db.session.rollback()
    try:
        db.session.delete(obj)
        db.session.commit()
    except:
        db.session.rollback()

@pytest.fixture
def app():
    app = create_app(testing=True)
    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()

@pytest.fixture
def test_user(app):
    with app.app_context():
        user = User(
            name="Test User",
            email="testuser@example.com",
            password=generate_password_hash("password123").decode('utf-8'),
            role="job-seeker"
        )
        db.session.add(user)
        db.session.commit()
        yield user
        safe_delete(user)

@pytest.fixture
def access_token(app, test_user):
    with app.app_context():
        return create_access_token(identity=str(test_user.id))

@pytest.fixture
def auth_headers(access_token):
    return {"Authorization": f"Bearer {access_token}"}

@pytest.fixture
def test_job(app, test_user):
    with app.app_context():
        job = Job(
            title="Test Job",
            company="Test Company",
            location="Test Location",
            employment_type="Full-Time",
            salary_min=50000,
            salary_max=70000,
            description="Job description",
            user_id=test_user.id
        )
        db.session.add(job)
        db.session.commit()
        yield job
        safe_delete(job)

@pytest.fixture
def test_application(app, test_user, test_job):
    with app.app_context():
        application = Application(
            user_id=test_user.id,
            job_id=test_job.id,
            status="pending"
        )
        db.session.add(application)
        db.session.commit()
        yield application
        safe_delete(application)
