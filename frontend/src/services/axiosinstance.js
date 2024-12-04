import axios from 'axios';

export const API_BASE_URL = 'http://localhost:8000/api/';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response) {
      const originalRequest = error.config;
      
      // If token expired
      if (error.response.status === 401 && originalRequest.url === '/token/refresh/') {
        window.location.href = '/login/';
        return Promise.reject(error);
      }

      // Tries to refresh token
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const response = await axiosInstance.post('/token/refresh/', {
            refresh: localStorage.getItem('refresh_token')
          });
          if (response.status === 200) {
            localStorage.setItem('access_token', response.data.access);
            axiosInstance.defaults.headers['Authorization'] = 'JWT ' + response.data.access;
            originalRequest.headers['Authorization'] = 'JWT ' + response.data.access;
            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          console.error("Refresh token invalid or network error", refreshError);
          window.location.href = '/login/';
        }
      }
    } else {
      // If no HTTP Response
      console.error("Network error or no HTTP response", error);
      return Promise.reject(new Error("Network error or no HTTP response"));
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;