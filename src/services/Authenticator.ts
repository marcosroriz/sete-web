import { EnvOptions, AxiosInstance, getApiClient, updateApiClient } from "./apiClient";
import { cookie } from "helpers/Cookie";
import { Permission } from "entities/Permission";

type SignInRequest = {
    usuario: string;
    senha: string;
};

type SignInResponse = {
    access_token: {
        access_token: string;
        expires_in: number;
        tipo_permissao: string;
    };
    messages: string;
};

type IsAuthenticatedResponse = {
    data: {
        nome: string;
        tipo_permissao: Permission;
        codigo_cidade: number;
        cidade: string;
        estado: string;
    };
    result: boolean;
};

class AuthenticatorService {
    private api: AxiosInstance;

    constructor(env?: EnvOptions) {
        this.api = getApiClient(env);
    }

    public async signIn(body: SignInRequest): Promise<SignInResponse> {
        const response = await this.api({
            url: "/authenticator/sete",
            method: "post",
            data: body,
        });
        const data = (await response.data) as SignInResponse;
        cookie.set("@sete-web:token", data.access_token.access_token, { maxAge: data.access_token.expires_in });
        updateApiClient(this.api, data.access_token.access_token);
        return data;
    }

    public async signOut(): Promise<void> {
        await this.api({
            url: "/users/logout",
        });
        cookie.destroy("@sete-web:token");
        updateApiClient(this.api, "");
    }

    public async isAuthenticated(): Promise<IsAuthenticatedResponse | undefined> {
        const token = cookie.get("@sete-web:token");
        if (!token) {
            return;
        }
        const response = await this.api({
            url: "/authenticator/sete",
            method: "get",
        });
        const data = (await response.data) as IsAuthenticatedResponse;
        return data;
    }
}

export { AuthenticatorService };