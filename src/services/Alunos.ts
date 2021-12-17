import { ApiInstance, EnvOptions, getApiClient } from "./apiClient";
import { Aluno, AlunoListObj } from "entities/Aluno";

type CreateAlunoRequestBody = Aluno;
type CreateAlunoResponse = {
    messages: string | { [key: string]: any };
    result: boolean;
};

type ListAlunoResponse = {
    data: AlunoListObj[];
    total: number;
    result: boolean;
};

type GetAlunoResponse = Aluno & { result: boolean };

type UpdateAlunoRequestBody = Aluno;
type UpdateAlunoResponse = {
    messages: string | { [key: string]: any };
    result: boolean;
};

type BindEscolaToAlunoRequestBody = {
    id_escola: number;
};

type ListBindEscolaToAlunoResponse = {
    nome: string;
    loc_latitude: string;
    loc_longitude: string;
    loc_endereco: string;
    loc_cep: string;
};

type BindRotaToAlunoRequestBody = {
    id_rota: number;
};

type ListBindRotaToAlunoResponse = {
    nome: string;
    loc_latitude: string;
    loc_longitude: string;
    loc_endereco: string;
    loc_cep: string;
};

class AlunosService {
    private api: ApiInstance;

    constructor(env?: EnvOptions) {
        this.api = getApiClient(env);
    }

    public async createAluno(body: CreateAlunoRequestBody, codigo_cidade: number): Promise<CreateAlunoResponse> {
        console.log(body);
        const response = await this.api({
            method: "post",
            url: `/alunos/${codigo_cidade}`,
            data: body,
        });

        const data = (await response.data) as CreateAlunoResponse;
        return data;
    }

    public async listAlunos(codigo_cidade: number): Promise<ListAlunoResponse> {
        const response = await this.api({
            method: "get",
            url: `/alunos/${codigo_cidade}`,
        });

        const data = (await response.data) as ListAlunoResponse;
        return data;
    }

    public async getAluno(alunoId: number, codigo_cidade: number): Promise<GetAlunoResponse> {
        const response = await this.api({
            method: "get",
            url: `/alunos/${codigo_cidade}/${alunoId}`,
        });

        const data = (await response.data) as GetAlunoResponse;
        return data;
    }

    public async updateAluno(body: UpdateAlunoRequestBody, id_aluno: number, codigo_cidade: number): Promise<UpdateAlunoResponse> {
        const response = await this.api({
            method: "put",
            url: `/alunos/${codigo_cidade}/${id_aluno}`,
            data: body,
        });

        const data = (await response.data) as UpdateAlunoResponse;
        return data;
    }

    public async bindEscolaToAluno(body: BindEscolaToAlunoRequestBody, id_aluno: number, codigo_cidade: number): Promise<any> {
        console.log(body);
        const response = await this.api({
            method: "put",
            url: `/alunos/${codigo_cidade}/${id_aluno}/escola`,
            data: body,
        });
        const data = await response.data;
    }

    public async listBindEscolaToAluno(id_aluno: number, codigo_cidade: number): Promise<ListBindEscolaToAlunoResponse> {
        const response = await this.api({
            method: "get",
            url: `/alunos/${codigo_cidade}/${id_aluno}/escola`,
        });
        const data = (await response.data) as ListBindEscolaToAlunoResponse;
        return data;
    }

    public async bindRotaToAluno(body: BindRotaToAlunoRequestBody, id_aluno: number, codigo_cidade: number): Promise<any> {
        const response = await this.api({
            method: "put",
            url: `/alunos/${codigo_cidade}/${id_aluno}/rota`,
            data: body,
        });
        const data = await response.data;
        console.log(data);
    }

    public async listBindRotaToAluno(id_aluno: number, codigo_cidade: number): Promise<void> {
        const response = await this.api({
            method: "get",
            url: `/alunos/${codigo_cidade}/${id_aluno}/rota`,
        });
        const data = (await response.data) as ListBindRotaToAlunoResponse;
    }

    public async deleteAluno(id_aluno: number, codigo_cidade: number): Promise<void> {
        const response = await this.api({
            url: `/alunos/${codigo_cidade}/${id_aluno}`,
            method: "delete",
        });
        const data = await response.data;
    }
}

export { AlunosService };
