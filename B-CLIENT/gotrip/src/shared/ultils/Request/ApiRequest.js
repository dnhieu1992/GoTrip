import axios from 'axios';
import userService from '../../services/userSerivce.js';

const httpClient = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        "Content-Type": "application/json",
    }
});

const getAuthToken = () => {
    const user = userService.getCurrentUser();
    const token = user?.token;
    return token;
}

const authInterceptor = (config) => {
    const token = getAuthToken();
    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
}

httpClient.interceptors.request.use(authInterceptor);

const errorInterceptors = error => {
    if (!error.response) {
        throw new Error("Network error.");
    }
    const errorMessage = error.response.data?.error;

    switch (error.response.status) {
        case 400:
            errorMessage = errorMessage || "Data not found.";
            break;
        case 409:
            errorMessage = errorMessage || "The item exists.";
            break;
        case 401:
        case 403:
            userService.removeCurrentUser();
            window.location = "/login";
            return Promise.reject(error);
        default:
            errorMessage = errorMessage || "Server error";
            break;
    }

    throw new Error(errorMessage);
}

httpClient.interceptors.response.use(
    res => res,
    errorInterceptors
);

export default httpClient;