// src/utils/axiosConfig.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/admin", // Replace with your backend base URL
});

export default axiosInstance;
