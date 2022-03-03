import { ApiInstance, EnvOptions, getApiClient } from "./apiClient";
import { Escola, EscolaTableField, EscolaListObj } from "entities/Escola";
import { Console } from "console";

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

type UpdateEscolaRequestBody = Escola;
type UpdateEscolaResponse = {
    messages: string | { [key: string]: any };
    result: boolean;
};

class EscolasService {
    private api: ApiInstance;
    constructor(env?: EnvOptions) {
        this.api = getApiClient(env);
    }

    public async listEscolas(codigo_cidade: number): Promise<ListEscolaResponse> {
        const response = await this.api({
            method: "get",
            url: `/escolas/${codigo_cidade}`,
        });
        const data = (await response.data) as ListEscolaResponse;
        return data;
    }

    public async createEscolas(body: CreateEscolaRequestBody, codigo_cidade: number): Promise<CreateEscolaResponse> {
        console.log(body);
        const response = await this.api({
            method: "post",
            url: `/escolas/${codigo_cidade}`,
            data: body,
        });
        const data = (await response.data) as CreateEscolaResponse;
        return data;
    }

    public async getEscola(id_escola: number, codigo_cidade: number): Promise<GetEscolaResponse> {
        const response = await this.api({
            method: "get",
            url: `/escolas/${codigo_cidade}/${id_escola}`,
        });
        const data = (await response.data) as GetEscolaResponse;
        return data;
    }

    public async updateEscola(body: UpdateEscolaRequestBody, id_escola: number, codigo_cidade: number): Promise<UpdateEscolaResponse> {
        const response = await this.api({
            method: "put",
            url: `/escolas/${codigo_cidade}/${id_escola}`,
            data: body,
        });

        const data = (await response.data) as UpdateEscolaResponse;
        return data;
    }

    public async deleteEscola(id_escola: number, codigo_cidade: number): Promise<void> {
        const response = await this.api({
            method: "delete",
            url: `/escolas/${codigo_cidade}/${id_escola}`,
        });
        const data = await response.data;
    }

    public async listBindAlunosToEscola(id_escola: number, codigo_cidade: number): Promise<void> {
        const response = await this.api({
            method: "get",
            url: `/escolas/${codigo_cidade}/${id_escola}/alunos`,
        });
        const data = await response.data;
        return data;
    }
}

export { EscolasService };
