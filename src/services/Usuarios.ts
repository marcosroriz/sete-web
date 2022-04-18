import { ApiInstance, EnvOptions, getApiClient } from "./apiClient";
import { cookie } from "helpers/Cookie";
import { formatHelper } from "helpers/FormatHelper";
import { User, UserListObj } from "entities/User";

type CreateUserRequestBody = User;

type CreateUserResponse = {
    messages: string | { [key: string]: any };
    result: boolean;
};

type ListUserResponse = {
    data: UserListObj[];
    total: number;
    result: boolean;
};

type GetUserInfoResponse = {
    data: User;
    result: boolean;
};

type UpdateUserPasswordRequestBody = {
    id_usuario: number;
    senha_atual: string;
    nova_senha: string;
};

type UpdateUserPasswordResponse = {
    messages: string;
    result: boolean;
};

type UpdateUserPictureResponse = {
    messages: any;
    result: boolean;
};

class UsuariosService {
    private api: ApiInstance;
    constructor(env?: EnvOptions) {
        this.api = getApiClient(env);
    }

    public async createUser(body: CreateUserRequestBody, codigo_cidade: number): Promise<CreateUserResponse> {
        const response = await this.api({
            method: "post",
            url: `/users/sete/${codigo_cidade}`,
            data: body,
        });

        const data = (await response.data) as CreateUserResponse;
        return data;
    }

    public async listUsers(codigo_cidade: number): Promise<ListUserResponse> {
        const response = await this.api({
            method: "get",
            url: `/users/sete/${codigo_cidade}`,
        });

        const data = (await response.data) as ListUserResponse;
        return data;
    }

    public async deleteUser(id_usuario: number, codigo_cidade: number): Promise<void> {
        const response = await this.api({
            method: "delete",
            url: `/users/sete/${codigo_cidade}/${id_usuario}`,
        });

        const data = await response.data;
    }

    public async getUserInfo(): Promise<GetUserInfoResponse | undefined> {
        try {
            const info = cookie.get("@sete-web:info");
            if (!info?.token) {
                throw { messages: "Token de Autorização Ausente" };
            }
            const response = await this.api({
                url: "/authenticator/sete",
                method: "get",
            });
            const data = (await response.data) as GetUserInfoResponse;
            data.data.foto = formatHelper.concatUrlImg(data.data.foto || "");
            return data;
        } catch (err) {
            cookie.destroy("@sete-web:info");
            throw err;
        }
    }

    public async updateUserPassword(body: UpdateUserPasswordRequestBody, codigo_cidade: number): Promise<UpdateUserPasswordResponse> {
        const response = await this.api({
            url: `/users/sete/${codigo_cidade}/alterar-senha`,
            method: "put",
            data: body,
        });
        const data = (await response.data) as UpdateUserPasswordResponse;
        return data;
    }

    public async updateUserPicture(body: FormData, userId: number, codigo_cidade: number): Promise<UpdateUserPictureResponse> {
        const response = await this.api({
            url: `/users/sete/${codigo_cidade}/${userId}/foto`,
            method: "post",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: body,
        });
        const data = (await response.data) as UpdateUserPictureResponse;
        return data;
    }
}

export { UsuariosService };
