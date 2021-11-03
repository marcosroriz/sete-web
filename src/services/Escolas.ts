import { ApiInstance, EnvOptions, getApiClient } from "./apiClient";
import { cookie } from "helpers/Cookie";
import { User } from "entities/User";
import { Escola, EscolaListObj } from "entities/Escola";

type ListEscolaResponse = {
    data: EscolaListObj[];
    result: boolean;
    total: number;
};

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
}

export { EscolasService };
