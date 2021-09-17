import { EnvOptions, ApiInstance, getApiClient } from "./apiClient";
import { cookie } from "helpers/Cookie";
import { Permission } from "entities/Permission";
import { User } from "entities/User";

type SignInRequestBody = {
    usuario: string;
    senha: string;
};

type SignInResponse = {
    access_token: {
        access_token: string;
        expires_in: number;
        tipo_permissao: Permission;
    };
    data: User;
    messages: string;
};

type IsAuthenticatedResponse = {
    data: User;
    result: boolean;
};
class AuthenticatorService {
    private api: ApiInstance;

    constructor(env?: EnvOptions) {
        this.api = getApiClient(env);
    }

    public async signIn(body: SignInRequestBody): Promise<SignInResponse> {
        const response = await this.api({
            url: "/authenticator/sete",
            method: "post",
            data: body,
        });
        const data = (await response.data) as SignInResponse;
        cookie.set("@sete-web:token", data.access_token.access_token, { maxAge: data.access_token.expires_in });
        return data;
    }

    public async signOut(): Promise<void> {
        cookie.destroy("@sete-web:token");
        await this.api({
            url: "/users/logout",
        });
    }

    public async isAuthenticated(): Promise<IsAuthenticatedResponse | undefined> {
        try {
            const token = cookie.get("@sete-web:token");
            if (!token) {
                throw { messages: "Token de Autorização Ausente" };
            }
            const response = await this.api({
                url: "/authenticator/sete",
                method: "get",
            });
            const data = (await response.data) as IsAuthenticatedResponse;
            return data;
        } catch (err) {
            cookie.destroy("@sete-web:token");
            throw err;
        }
    }
}

export { AuthenticatorService };
