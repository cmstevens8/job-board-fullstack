import pytest
from flask import json

# --- CREATE APPLICATION ---
def test_create_application(client, test_job, auth_headers):
    payload = {"job_id": test_job.id}
    response = client.post("/applications", json=payload, headers=auth_headers)
    assert response.status_code == 201
    data = response.get_json()
    assert data["job_id"] == test_job.id
    assert data["status"] == "pending"  # default status

# --- GET APPLICATIONS ---
def test_get_applications(client, test_application, auth_headers):
    response = client.get("/applications", headers=auth_headers)
    assert response.status_code == 200
    data = response.get_json()
    assert "data" in data
    assert isinstance(data["data"], list)

# --- UPDATE APPLICATION ---
def test_update_application(client, test_application, auth_headers):
    payload = {"status": "accepted"}
    response = client.put(f"/applications/{test_application.id}", json=payload, headers=auth_headers)
    assert response.status_code == 200
    data = response.get_json()
    assert data["status"] == "accepted"

# --- DELETE APPLICATION ---
def test_delete_application(client, test_application, auth_headers):
    response = client.delete(f"/applications/{test_application.id}", headers=auth_headers)
    assert response.status_code == 204
