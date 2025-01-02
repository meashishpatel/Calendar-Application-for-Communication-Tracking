import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    "https://calendar-application-for-communication-16bb.onrender.com/api", // Correct base URL with /api
});

export default axiosInstance;
