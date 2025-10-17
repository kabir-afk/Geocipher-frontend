import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      !originalRequest.retry &&
      originalRequest.url !== "api/token/refresh/"
    ) {
      originalRequest.retry = true;
      try {
        // setting the body blank coz refresh token was already set in httponly cookie and
        // is being sent with each browser request , so backend fetches the refresh token cookie
        // by itself
        const response = await axiosInstance.post("api/token/refresh/", {});
        const newAccessToken = response.data.access;
        Cookies.set("accessToken", newAccessToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // catching the error when refresh token expires and then logging the user out
        // and removing the cookies
        console.log(refreshError);
        Cookies.remove("accessToken");
        await axiosInstance.post("api/v1/logout/", {});
        // window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
