import { ApiInstance, EnvOptions, getApiClient } from "./apiClient";
import { Norma, NormaListObj } from "entities/Norma";

type CreateNormaRequestBody = Norma;
type CreateNormaResponse = {
    messages: string;
    result: boolean;
};

type ListNormaResponse = {
    data: NormaListObj[];
    result: boolean;
    total: number;
};

type GetNormaResponse = Norma & { result: boolean };

type UpdateNormaRequestBody = Norma;
type UpdateNormaResponse = {
    messages: string | { [key: string]: any };
    result: boolean;
};

class NormasService {
    private api: ApiInstance;
    constructor(env?: EnvOptions) {
        this.api = getApiClient(env);
    }

    public async listNormas(codigo_cidade: number): Promise<ListNormaResponse> {
        const response = await this.api({
            url: `/normas/${codigo_cidade}`,
            method: "get",
        });
        const data = (await response.data) as ListNormaResponse;
        return data;
    }

    public async createNorma(body: CreateNormaRequestBody, codigo_cidade: number): Promise<CreateNormaResponse> {
        const response = await this.api({
            url: `/normas/${codigo_cidade}`,
            method: "post",
            data: body,
        });
        const data = (await response.data) as CreateNormaResponse;
        return data;
    }

    public async updateNorma(body: UpdateNormaRequestBody, normaId: string, codigo_cidade: number): Promise<UpdateNormaResponse> {
        const response = await this.api({
            url: `/normas/${codigo_cidade}/${normaId}`,
            method: "put",
            data: body,
        });
        const data = (await response.data) as UpdateNormaResponse;
        return data;
    }
}

export { NormasService };
