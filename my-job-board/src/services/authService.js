import API from "./api.js";

export function login(credentials) {
  return API.post("/login", credentials).then((res) => res.data);
}

export function register(data) {
  return API.post("/register", data).then((res) => res.data);
}
