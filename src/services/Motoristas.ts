import { ApiInstance, EnvOptions, getApiClient } from "./apiClient";
import { cookie } from "helpers/Cookie";
import { User } from "entities/User";
import { Motorista, MotoristaTableField } from "entities/Motorista";

type ListMotoristaResponse = {
    data: MotoristaTableField[];
    result: boolean;
    total: number;
};

type CreateMotoristaRequestBody = {
    nome: string;
    cpf: string;
    data_nascimento: string;
    sexo: number;
    telefone: string;
    cnh: string;
    data_validade_cnh: string;
    turno_manha: string;
    turno_tarde: string;
    turno_noite: string;
    tem_cnh_a: string;
    tem_cnh_b: string;
    tem_cnh_c: string;
    tem_cnh_d: string;
    tem_cnh_e: string;
};

type CreateMotoristaResponse = {
    messages: string;
    result: boolean;
};

type GetMotoristaResponse = Motorista;

type UpdateMotoristaRequestBody = {
    nome: string;
    data_nascimento: string;
    sexo: number;
    telefone: string;
    cnh: string;
    data_validade_cnh: string;
    turno_manha: string;
    turno_tarde: string;
    turno_noite: string;
    tem_cnh_a: string;
    tem_cnh_b: string;
    tem_cnh_c: string;
    tem_cnh_d: string;
    tem_cnh_e: string;
};

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
        console.log(body);
        const response = await this.api({
            url: `/motoristas/${codigo_cidade}/${cpf}`,
            method: "put",
            data: body,
        });
        const data = (await response.data) as UpdateMotoristaResponse;
        return data;
    }
}

export { MotoristasService };
