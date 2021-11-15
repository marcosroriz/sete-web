import { ApiInstance, EnvOptions, getApiClient } from "./apiClient";
import { Aluno, AlunoListObj } from "entities/Aluno";

type CreateAlunoRequestBody = Aluno;
type CreateAlunoResponse = {
    messages: string;
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
    messages: string;
    result: boolean;
};

class AlunosService {
    private api: ApiInstance;

    constructor(env?: EnvOptions) {
        this.api = getApiClient(env);
    }

    public async createAluno(body: CreateAlunoRequestBody, codigo_cidade: number): Promise<CreateAlunoResponse> {
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

    public async updateAluno(body: UpdateAlunoRequestBody, alunoId: number, codigo_cidade: number): Promise<UpdateAlunoResponse> {
        const response = await this.api({
            method: "put",
            url: `/alunos/${codigo_cidade}/${alunoId}`,
            data: body,
        });

        const data = (await response.data) as UpdateAlunoResponse;
        return data;
    }
}

export { AlunosService };
