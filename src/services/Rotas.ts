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

type GetRotaResponse = Rota & { result: boolean };

type UpdateRotaRequestBody = Rota;
type UpdateRotaResponse = {
    messages: string | { [key: string]: any };
    result: boolean;
};

type BindEscolasToRotaRequestBody = {
    escolas: number[];
};

type BindAlunosToRotaRequestBody = {
    alunos: number[];
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

    public async getRota(id_rota: number, codigo_cidade: number): Promise<GetRotaResponse> {
        const response = await this.api({
            method: "get",
            url: `/rotas/${codigo_cidade}/${id_rota}`,
        });

        const data = (await response.data) as GetRotaResponse;
        return data;
    }

    public async updateRota(body: UpdateRotaRequestBody, id_rota: number, codigo_cidade: number): Promise<UpdateRotaResponse> {
        const response = await this.api({
            method: "put",
            url: `/rotas/${codigo_cidade}/${id_rota}`,
            data: body,
        });

        const data = (await response.data) as UpdateRotaResponse;
        return data;
    }

    public async bindEscolasToRota(body: BindEscolasToRotaRequestBody, id_rota: number, codigo_cidade: number): Promise<any> {
        const response = await this.api({
            method: "post",
            url: `/rotas/${codigo_cidade}/${id_rota}/escolas`,
            data: body,
        });

        const data = (await response.data) as any;
        return data;
    }

    public async bindAlunosToRota(body: BindAlunosToRotaRequestBody, id_rota: number, codigo_cidade: number): Promise<any> {
        console.log(body);
        const response = await this.api({
            method: "post",
            url: `/rotas/${codigo_cidade}/${id_rota}/alunos`,
            data: body,
        });

        const data = (await response.data) as any;
        return data;
    }
}

export { RotasService };
