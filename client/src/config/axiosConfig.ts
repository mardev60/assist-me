import axios from "axios";

const API_URL = "http://localhost:3000/api";

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            if (window.location.pathname !== "/connexion") {
                window.location.href = "/connexion";
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
