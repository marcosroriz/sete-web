import axios, { AxiosInstance } from "axios";
import { cookie } from "helpers/Cookie";

const envUrls = {
    api: process.env.REACT_APP_API_URL,
};

type EnvOptions = keyof typeof envUrls;

const getApiClient = (env?: EnvOptions): AxiosInstance => {
    const token = cookie.get("@sete-web:token");
    const api = axios.create({
        baseURL: envUrls[env || "api"],
    });
    if (token) {
        api.defaults.headers["Authorization"] = token;
    }
    return api;
};

const updateApiClient = (api: AxiosInstance, token?: string): void => {
    if (!token) {
        cookie.destroy("@sete-web:token");
    }
    api.defaults.headers["Authorization"] = token || "";
};

export { getApiClient, updateApiClient };
export type { EnvOptions, AxiosInstance };
