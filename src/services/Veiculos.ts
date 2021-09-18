import { ApiInstance, EnvOptions, getApiClient } from "./apiClient";
import { cookie } from "helpers/Cookie";
import { User } from "entities/User";

type GetUserInfoResponse = {
    data: User;
    result: boolean;
};

type CreateVeiculoRequestBody = {
    placa: string;
    modelo: string;
    ano: number;
    modo: number;
    origem: number;
    km_inicial?: number;
    km_atual?: number;
    capacidade: number;
    tipo: number;
};

type CreateVeiculoResponse = {
    messages: string;
    result: boolean;
};

class VeiculosService {
    private api: ApiInstance;
    constructor(env?: EnvOptions) {
        this.api = getApiClient(env);
    }

    public async createVeiculo(body: CreateVeiculoRequestBody, codigo_cidade: number): Promise<CreateVeiculoResponse> {
        const response = await this.api({
            url: `/veiculos/${codigo_cidade}`,
            method: "post",
            data: body,
        });
        const data = (await response.data) as CreateVeiculoResponse;
        return data;
    }
}

export { VeiculosService };
