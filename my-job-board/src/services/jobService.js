import API from "./api.js";

export function getJobs() {
  return API.get("/jobs").then((res) => res.data);
}

export function getJobById(id) {
  return API.get(`/jobs/${id}`).then((res) => res.data);
}
