import { ApiInstance, EnvOptions, getApiClient } from "./apiClient";
import { cookie } from "helpers/Cookie";
import { User } from "entities/User";
import { Veiculo, VeiculoListObj } from "entities/Veiculo";

type CreateVeiculoRequestBody = Veiculo;
type CreateVeiculoResponse = {
    messages: string;
    result: boolean;
};

type ListVeiculoResponse = {
    data: VeiculoListObj[];
    result: boolean;
    total: number;
};

type UpdateVeiculoRequestBody = Veiculo;
type UpdateVeiculoResponse = Veiculo;

type GetVeiculoResponse = Veiculo;
type GetTiposVeiculoResponse = {
    data: { id: number; tipo: string }[];
    result: boolean;
    total: number;
};
type GetMarcasVeiculoResponse = {
    data: { id: number; marca: string }[];
    result: boolean;
    total: number;
};

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

    public async getTiposVeiculo(): Promise<GetTiposVeiculoResponse> {
        const response = await this.api({
            url: "/veiculos/tipo",
            method: "get",
        });
        const data = (await response.data) as GetTiposVeiculoResponse;
        return data;
    }

    public async getMarcasVeiculo() {
        const response = await this.api({
            url: "/veiculos/marcas",
            method: "get",
        });
        const data = (await response.data) as GetMarcasVeiculoResponse;
        return data;
    }

    public async deleteVeiculo(id_veiculo: number, codigo_cidade: number): Promise<void> {
        const response = await this.api({
            url: `/veiculos/${codigo_cidade}/${id_veiculo}`,
            method: "delete",
        });
        const data = await response.data;
    }
}

export { VeiculosService };
