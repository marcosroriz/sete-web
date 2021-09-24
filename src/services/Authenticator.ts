import { EnvOptions, ApiInstance, getApiClient } from "./apiClient";
import { cookie } from "helpers/Cookie";
import { formatHelper } from "helpers/FormatHelper";
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
        const cookieObj = {
            codigo_cidade: data.data.codigo_cidade,
            token: data.access_token.access_token,
        };
        cookie.set("@sete-web:info", cookieObj, { maxAge: data.access_token.expires_in });
        return data;
    }

    public async signOut(): Promise<void> {
        cookie.destroy("@sete-web:info");
        await this.api({
            url: "/users/logout",
        });
    }

    public async isAuthenticated(): Promise<IsAuthenticatedResponse | undefined> {
        try {
            const info = cookie.get("@sete-web:info");
            if (!info?.token) {
                throw { messages: "Token de Autorização Ausente" };
            }
            const response = await this.api({
                url: "/authenticator/sete",
                method: "get",
            });
            const data = (await response.data) as IsAuthenticatedResponse;
            data.data.foto = formatHelper.concatUrlImg(data.data.foto || "");
            return data;
        } catch (err) {
            cookie.destroy("@sete-web:info");
            throw err;
        }
    }
}

export { AuthenticatorService };
