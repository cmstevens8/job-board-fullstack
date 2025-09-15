import API from "./api.js";

export function getApplications() {
  return API.get("/applications").then((res) => res.data);
}
