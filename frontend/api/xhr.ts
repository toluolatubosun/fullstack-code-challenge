import axios from "axios";
import { hasCookie, getCookie } from "cookies-next";

const baseURL = process.env.BACKEND_BASE_URL;

const config: any = {
    timeout: 30000,
    baseURL: `${baseURL}/v1`,
    headers: {
        "Content-Type": "application/json"
    }
};

// Create new axios instance
const $http = axios.create(config);

$http.interceptors.request.use(async (config: any) => {
    // If auth-token is available, add it to the Axios API header
    if (hasCookie("access_token")) {
        config.headers["Authorization"] = `Bearer ${getCookie("access_token")}`;
    }

    return config;
});

export default $http;
