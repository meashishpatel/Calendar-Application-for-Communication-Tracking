import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api", // Use relative path
});

export default axiosInstance;
