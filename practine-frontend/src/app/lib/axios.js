import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000", // backend laravel kamu
  withCredentials: true, // WAJIB untuk Sanctum cookie
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default axiosClient;
