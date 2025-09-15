import pytest
from flask import json

# --- REGISTER USER ---
def test_register_user(client):
    payload = {
        "name": "New User",
        "email": "newuser@example.com",
        "password": "password123",
        "role": "job-seeker"
    }
    response = client.post("/users", json=payload)
    assert response.status_code == 201
    data = response.get_json()
    assert data["name"] == payload["name"]
    assert data["email"] == payload["email"]

def test_register_existing_user(client, test_user):
    payload = {
        "name": test_user.name,
        "email": test_user.email,
        "password": "password123",
        "role": test_user.role
    }
    response = client.post("/users", json=payload)
    assert response.status_code == 400
    data = response.get_json()
    assert "error" in data

# --- LOGIN USER ---
def test_login_user(client, test_user):
    payload = {
        "email": test_user.email,
        "password": "password123"
    }
    response = client.post("/login", json=payload)
    assert response.status_code == 200
    data = response.get_json()
    assert "access_token" in data

def test_login_invalid_password(client, test_user):
    payload = {
        "email": test_user.email,
        "password": "wrongpassword"
    }
    response = client.post("/login", json=payload)
    assert response.status_code == 401
    data = response.get_json()
    assert "error" in data

# --- GET USERS WITH PAGINATION ---
def test_get_users_pagination(client, test_user):
    response = client.get("/users?page=1&per_page=10")
    assert response.status_code == 200
    data = response.get_json()
    assert "data" in data
    assert isinstance(data["data"], list)
