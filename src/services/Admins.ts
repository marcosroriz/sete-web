import { ApiInstance, EnvOptions, getApiClient } from "./apiClient";
import { Admin, AdminListObj } from "entities/Admins";
import { boolean } from "yup";

type CreateAdminRequestBody = Admin;
type CreateAdminResponse = {
    messages: string;
    result: boolean;
};

type ListAdminResponse = {
    data: AdminListObj[];
    result: boolean;
    total: number;
};

type GetAdminsResponse = Admin & { result: boolean };

type UpdateAdminRequestBody = Admin;
type UpdateAdminResponse = {
    messages: string;
    result: boolean;
};

class AdminsService {
    private api: ApiInstance;
    constructor(env?: EnvOptions) {
        this.api = getApiClient(env);
    }

    public async listAdmin(codigo_cidade: number): Promise<ListAdminResponse> {
        const response = await this.api({
            url: `/usuarios/${codigo_cidade}`,
            method: "get",
        });
        const data = (await response.data) as ListAdminResponse;
        return data;
    }

    public async createAdmin(body: CreateAdminRequestBody, codigo_cidade: number): Promise<CreateAdminResponse> {
        const response = await this.api({
            url: `/usuarios/${codigo_cidade}`,
            method: "post",
            data: body,
        });
        const data = (await response.data) as CreateAdminResponse;
        return data;
    }

    public async getAdmin(adminId: number, codigo_cidade: number): Promise<GetAdminsResponse> {
        const response = await this.api({
            method: "get",
            url: `/usuarios/${codigo_cidade}/${adminId}`,
        });
        const data = (await response.data) as GetAdminsResponse;
        return data;
    }

    public async updateAdmin(body: UpdateAdminRequestBody, adminId: string, codigo_cidade: number): Promise<UpdateAdminResponse> {
        const response = await this.api({
            url: `/usuarios/${codigo_cidade}/${adminId}`,
            method: "put",
            data: body,
        });
        const data = (await response.data) as UpdateAdminResponse;
        return data;
    }

    public async deleteAdmin(id_admin: number, codigo_cidade: number): Promise<void> {
        await this.api({
            url: `/usuarios/${codigo_cidade}/${id_admin}`,
            method: "delete",
        });
    }
}

export { AdminsService };
