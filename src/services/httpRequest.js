import axios from "axios";
import cookies from "nookies"

const httpRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 100000,
});

const errorHandler = (error) => {
  return Promise.reject(error.response);
};

httpRequest.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json';
  const token = cookies.get().accessToken

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

httpRequest.interceptors.response.use(response => response.data, errorHandler);

export default httpRequest;
