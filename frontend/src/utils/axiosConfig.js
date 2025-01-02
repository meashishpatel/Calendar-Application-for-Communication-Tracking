// src/utils/axiosConfig.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://calendar-application-for-communication-16bb.onrender.com", // Update to your backend base URL
});

export default axiosInstance;
