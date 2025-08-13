import axios from "axios";
import cookies from "nookies";

const httpMain = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SMS_API_URL,
    timeout: 100000,
});

httpMain.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json';
    const token = cookies.get().accessToken;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

httpMain.interceptors.response.use(response => response.data, error => {
    return Promise.reject(error.response);
});

export default httpMain;
