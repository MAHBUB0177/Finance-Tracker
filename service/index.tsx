import axios from "axios";

const axiosInstance = axios.create({
  baseURL:" http://localhost:5000/"
});

// Remove token-related logic
axiosInstance.interceptors.request.use(async (config) => {
  // If you want to add any other headers globally, you can do so here.
  return config;
});

export default axiosInstance;
