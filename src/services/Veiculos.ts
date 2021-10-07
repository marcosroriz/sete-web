import { ApiInstance, EnvOptions, getApiClient } from "./apiClient";
import { cookie } from "helpers/Cookie";
import { User } from "entities/User";
import { Veiculo, VeiculoTableField } from "entities/Veiculo";

type ListVeiculoResponse = {
    data: VeiculoTableField[];
    result: boolean;
    total: number;
};

type CreateVeiculoRequestBody = {
    modo: number;
    tipo: number;
    marca: number;
    modelo: string;
    ano: number;
    origem: number;
    placa: string;
    renavam: string;
    km_inicial: number;
    km_atual: number;
    capacidade: number;
    manutencao: boolean;
};

type CreateVeiculoResponse = {
    messages: string;
    result: boolean;
};

type GetVeiculoResponse = Veiculo;

type UpdateVeiculoRequestBody = {
    modo: number;
    tipo: number;
    marca: number;
    modelo: string;
    ano: number;
    origem: number;
    renavam: string;
    km_inicial: number;
    km_atual: number;
    capacidade: number;
    manutencao: boolean;
};

type UpdateVeiculoResponse = Veiculo;

class VeiculosService {
    private api: ApiInstance;
    constructor(env?: EnvOptions) {
        this.api = getApiClient(env);
    }

    public async listVeiculos(codigo_cidade: number): Promise<ListVeiculoResponse> {
        const response = await this.api({
            url: `/veiculos/${codigo_cidade}`,
            method: "get",
        });
        const data = (await response.data) as ListVeiculoResponse;
        return data;
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

    public async updateVeiculo(body: UpdateVeiculoRequestBody, veiculoId: number, codigo_cidade: number): Promise<UpdateVeiculoResponse> {
        const response = await this.api({
            url: `/veiculos/${codigo_cidade}/${veiculoId}`,
            method: "put",
            data: body,
        });
        const data = (await response.data) as UpdateVeiculoResponse;
        return data;
    }
}

export { VeiculosService };
