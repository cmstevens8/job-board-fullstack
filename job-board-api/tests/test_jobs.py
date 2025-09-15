import pytest
from flask import json

# --- GET JOBS ---
def test_get_jobs(client, test_job, auth_headers):
    # List all jobs
    response = client.get("/jobs", headers=auth_headers)
    assert response.status_code == 200
    data = response.get_json()
    assert "jobs" in data
    assert isinstance(data["jobs"], list)
    assert any(job["id"] == test_job.id for job in data["jobs"])

# --- CREATE JOB ---
def test_create_job(client, auth_headers):
    payload = {
        "title": "New Job",
        "company": "New Company",
        "location": "Remote",
        "employment_type": "Full-Time",
        "salary_min": 50000,
        "salary_max": 70000,
        "description": "Job description"
    }
    # POST /jobs uses JWT to set user_id automatically
    response = client.post("/jobs", json=payload, headers=auth_headers)
    assert response.status_code == 201
    data = response.get_json()
    assert data["title"] == payload["title"]
    assert data["company"] == payload["company"]
    # Confirm user_id is set and not None
    assert "user_id" in data and data["user_id"] is not None

# --- UPDATE JOB ---
def test_update_job(client, test_job, auth_headers):
    payload = {"title": "Updated Job"}
    response = client.put(f"/jobs/{test_job.id}", json=payload, headers=auth_headers)
    assert response.status_code == 200
    data = response.get_json()
    assert data["title"] == "Updated Job"

# --- DELETE JOB ---
def test_delete_job(client, test_job, auth_headers):
    response = client.delete(f"/jobs/{test_job.id}", headers=auth_headers)
    assert response.status_code == 204

    # Verify deletion by querying the list of jobs
    get_response = client.get("/jobs", headers=auth_headers)
    assert get_response.status_code == 200
    data = get_response.get_json()
    # The deleted job should no longer exist in the list
    assert all(job["id"] != test_job.id for job in data["jobs"])
