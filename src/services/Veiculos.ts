import { ApiInstance, EnvOptions, getApiClient } from "./apiClient";
import { cookie } from "helpers/Cookie";
import { User } from "entities/User";

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

type GetVeiculoResponse = {
    codigo_cidade: number;
    id_veiculo: number;
    placa: string;
    modelo: string;
    ano: number;
    modo: string;
    origem: number;
    km_inicial: string;
    capacidade: number;
    km_atual: string;
    tipo: number;
    renavam: string;
    manutencao: string;
    marca: string;
    id_firebase: string;
    _links: {
        _self: string;
    };
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

    public async getVeiculo(veiculoId: number, codigo_cidade: number): Promise<GetVeiculoResponse> {
        const response = await this.api({
            url: `/veiculos/${codigo_cidade}/${veiculoId}`,
            method: "get",
        });
        const data = (await response.data) as GetVeiculoResponse;
        return data;
    }
}

export { VeiculosService };
