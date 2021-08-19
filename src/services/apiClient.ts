import axios, { AxiosInstance } from "axios";
import { cookie } from "helpers/Cookie";

const envUrls = {
    api: process.env.REACT_APP_API_URL,
};

type EnvOptions = keyof typeof envUrls;

const getApiClient = (env?: EnvOptions): AxiosInstance => {
    const api = axios.create({
        baseURL: envUrls[env || "api"],
    });
    api.interceptors.request.use((req) => {
        const token = cookie.get("@sete-web:token");
        if (token) {
            req.headers["Authorization"] = token;
        }
        return req;
    });
    return api;
};

export { getApiClient };
export type { EnvOptions, AxiosInstance };
