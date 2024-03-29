import axios from "axios";

const getToken = () => {
  return JSON.parse(localStorage.getItem("userInfo"))?.token;
};

// Adding the Base url

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
    "Access-Control-Allow-Origin": "*",
  },
});

export const http = {
  get: api.get,
  post: api.post,
  put: api.put,
  delete: api.delete,
  defaults: api.defaults,
};
