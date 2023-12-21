import axios from "axios";

const baseURL = "https://cg-assignment-server.onrender.com";

const api = axios.create({
  baseURL,
});

export default api;
