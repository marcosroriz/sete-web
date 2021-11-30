import { ApiInstance, EnvOptions, getApiClient } from "./apiClient";
import { Escola, EscolaTableField, EscolaListObj } from "entities/Escola";

type CreateEscolaRequestBody = Escola;
type CreateEscolaResponse = {
    messages: string | { [key: string]: any };
    result: boolean;
};

type ListEscolaResponse = {
    data: EscolaListObj[];
    result: boolean;
    total: number;
};

type GetEscolaResponse = Escola & { result: boolean };

class EscolasService {
    private api: ApiInstance;
    constructor(env?: EnvOptions) {
        this.api = getApiClient(env);
    }

    public async listEscolas(codigo_cidade: number): Promise<ListEscolaResponse> {
        const response = await this.api({
            url: `/escolas/${codigo_cidade}`,
            method: "get",
        });
        const data = (await response.data) as ListEscolaResponse;
        return data;
    }

    public async createEscolas(body: CreateEscolaRequestBody, codigo_cidade: number): Promise<CreateEscolaResponse> {
        const response = await this.api({
            url: `/escolas/${codigo_cidade}`,
            method: "post",
            data: body,
        });
        const data = (await response.data) as CreateEscolaResponse;
        return data;
    }

    public async getEscola(veiculo_id: number, codigo_cidade: number): Promise<GetEscolaResponse> {
        const response = await this.api({
            url: `/escolas/${codigo_cidade}/${veiculo_id}`,
            method: "get",
        });
        const data = (await response.data) as GetEscolaResponse;
        return data;
    }

    public async deleteEscola(id_escola: number, codigo_cidade: number): Promise<void> {
        const response = await this.api({
            url: `/escolas/${codigo_cidade}/${id_escola}`,
            method: "delete",
        });
        const data = await response.data;
    }
}

export { EscolasService };
