import { ApiInstance, EnvOptions, getApiClient } from "./apiClient";
import { Rotas, RotasListObj } from "entities/Rotas";
import { Console } from "console";

type CreateRotasRequestBody = Rotas;
type CreateRotasResponse = {
    messages: string;
    result: boolean;
};

type ListRotasResponse = {
    data: RotasListObj[];
    result: boolean;
    total: number;
};

type GetRotasResponse = Rotas & { result: boolean };

type UpdateRotasRequestBody = Rotas;
type UpdateRotasResponse = {
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

    public async createRota(body: CreateRotasRequestBody, codigo_cidade: number): Promise<CreateRotasResponse> {
        const response = await this.api({
            method: "post",
            url: `/rotas/${codigo_cidade}`,
            data: body,
        });
        const data = (await response.data) as CreateRotasResponse;
        return data;
    }

    public async listRotas(codigo_cidade: number): Promise<ListRotasResponse> {
        const response = await this.api({
            method: "get",
            url: `/rotas/${codigo_cidade}`,
        });

        const data = (await response.data) as ListRotasResponse;
        return data;
    }

    public async getRota(id_rota: string, codigo_cidade: number): Promise<GetRotasResponse> {
        const response = await this.api({
            method: "get",
            url: `/rotas/${codigo_cidade}/${id_rota}`,
        });

        const data = (await response.data) as GetRotasResponse;
        console.log(data);
        return data;
    }

    public async updateRota(body: UpdateRotasRequestBody, id_rota: string, codigo_cidade: number): Promise<UpdateRotasResponse> {
        const response = await this.api({
            method: "put",
            url: `/rotas/${codigo_cidade}/${id_rota}`,
            data: body,
        });

        const data = (await response.data) as UpdateRotasResponse;
        return data;
    }

    public async deleteRota(id_rota: number, codigo_cidade: number): Promise<void> {
        const response = await this.api({
            method: "delete",
            url: `/rotas/${codigo_cidade}/${id_rota}`,
        });
        const data = await response.data;
    }

    public async bindEscolasToRota(body: BindEscolasToRotaRequestBody, id_rota: number, codigo_cidade: number): Promise<any> {
        console.log("escoals rota", body);
        const response = await this.api({
            method: "post",
            url: `/rotas/${codigo_cidade}/${id_rota}/escolas`,
            data: body,
        });

        const data = (await response.data) as any;
        console.log(data);
        return data;
    }

    public async listBindEscolasToRota(id_rota: number, codigo_cidade: number): Promise<any> {
        const response = await this.api({
            method: "get",
            url: `/rotas/${codigo_cidade}/${id_rota}/escolas`,
        });

        const data = (await response.data) as any;
        return data;
    }

    public async bindAlunosToRota(body: BindAlunosToRotaRequestBody, id_rota: number, codigo_cidade: number): Promise<any> {
        console.log("alunos rota", body);
        const response = await this.api({
            method: "post",
            url: `/rotas/${codigo_cidade}/${id_rota}/alunos`,
            data: body,
        });

        const data = (await response.data) as any;
        console.log(data);
        return data;
    }

    public async listBindAlunosToRota(id_rota: number, codigo_cidade: number): Promise<any> {
        const response = await this.api({
            method: "get",
            url: `/rotas/${codigo_cidade}/${id_rota}/alunos`,
        });

        const data = (await response.data) as any;
        return data;
    }
}

export { RotasService };
