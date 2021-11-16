import { ApiInstance, EnvOptions, getApiClient } from "./apiClient";
import { Rota, RotaListObj } from "entities/Rota";

type CreateRotaRequestBody = Rota;
type CreateRotaResponse = {
    messages: string;
    result: boolean;
};

type ListRotaResponse = {
    data: RotaListObj[];
    total: number;
    result: boolean;
};

class RotasService {
    private api: ApiInstance;

    constructor(env?: EnvOptions) {
        this.api = getApiClient(env);
    }

    public async createRota(body: CreateRotaRequestBody, codigo_cidade: number): Promise<CreateRotaResponse> {
        const response = await this.api({
            method: "post",
            url: `/rotas/${codigo_cidade}`,
            data: body,
        });

        const data = (await response.data) as CreateRotaResponse;
        return data;
    }

    public async listRotas(codigo_cidade: number): Promise<ListRotaResponse> {
        const response = await this.api({
            method: "get",
            url: `/rotas/${codigo_cidade}`,
        });

        const data = (await response.data) as ListRotaResponse;
        return data;
    }
}

export { RotasService };
