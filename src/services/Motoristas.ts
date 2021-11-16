import { ApiInstance, EnvOptions, getApiClient } from "./apiClient";
import { cookie } from "helpers/Cookie";
import { User } from "entities/User";
import { Motorista, MotoristaListObj } from "entities/Motorista";

type CreateMotoristaRequestBody = Motorista;
type CreateMotoristaResponse = {
    messages: string;
    result: boolean;
};

type ListMotoristaResponse = {
    data: MotoristaListObj[];
    result: boolean;
    total: number;
};

type GetMotoristaResponse = Motorista;

type UpdateMotoristaRequestBody = Motorista;
type UpdateMotoristaResponse = Motorista;

class MotoristasService {
    private api: ApiInstance;
    constructor(env?: EnvOptions) {
        this.api = getApiClient(env);
    }

    public async listMotoristas(codigo_cidade: number): Promise<ListMotoristaResponse> {
        const response = await this.api({
            url: `/motoristas/${codigo_cidade}`,
            method: "get",
        });
        const data = (await response.data) as ListMotoristaResponse;
        return data;
    }

    public async createMotorista(body: CreateMotoristaRequestBody, codigo_cidade: number): Promise<CreateMotoristaResponse> {
        const response = await this.api({
            url: `/motoristas/${codigo_cidade}`,
            method: "post",
            data: body,
        });
        const data = (await response.data) as CreateMotoristaResponse;
        return data;
    }

    public async getMotorista(codigo_cidade: number, cpf: string): Promise<GetMotoristaResponse> {
        const response = await this.api({
            url: `/motoristas/${codigo_cidade}/${cpf}`,
            method: "get",
        });
        const data = (await response.data) as GetMotoristaResponse;
        return data;
    }

    public async updateMotorista(body: UpdateMotoristaRequestBody, codigo_cidade: number, cpf: string): Promise<UpdateMotoristaResponse> {
        const response = await this.api({
            url: `/motoristas/${codigo_cidade}/${cpf}`,
            method: "put",
            data: body,
        });
        const data = (await response.data) as UpdateMotoristaResponse;
        return data;
    }

    public async deleteMotorista(cpf_motorista: string, codigo_cidade: number): Promise<void> {
        const response = await this.api({
            url: `/motoristas/${codigo_cidade}/${cpf_motorista}`,
            method: "delete",
        });
        const data = await response.data;
    }
}

export { MotoristasService };
