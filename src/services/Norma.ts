import { ApiInstance, EnvOptions, getApiClient } from "./apiClient";
import { Norma, NormaListObj } from "entities/Norma";
import { boolean } from "yup";

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

type GetNormasResponse = Norma & { result: boolean };

type GetTiposAssuntosResponse = {
    data: { id: number; assunto: string }[];
    result: boolean;
    total: number;
};

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

    public async getTiposAssuntos(): Promise<GetTiposAssuntosResponse> {
        const response = await this.api({
            url: "/veiculos/assunto",
            method: "get",
        });
        const data = (await response.data) as GetTiposAssuntosResponse;
        return data;
    }

    public async getNorma(normaId: number, codigo_cidade: number): Promise<GetNormasResponse> {
        const response = await this.api({
            method: "get",
            url: `/normas/${codigo_cidade}/${normaId}`,
        });
        const data = (await response.data) as GetNormasResponse;
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

    public async deleteNorma(id_norma: number, codigo_cidade: number): Promise<void> {
        await this.api({
            url: `/normas/${codigo_cidade}/${id_norma}`,
            method: "delete",
        });
    }
}

export { NormasService };
