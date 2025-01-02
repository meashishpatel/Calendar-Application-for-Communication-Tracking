import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://calendar-application-for-communication-16bb.onrender.com", // Correct base URL without /api
});

export default axiosInstance;
