import { ApiInstance, EnvOptions, getApiClient } from "./apiClient";

import { Escola } from "entities/Escola";
import { Aluno } from "entities/Aluno";

type CreateCensoRegistroRequestBody = {
    alunos: Aluno[];
    escolas: Escola[];
};

class CensoService {
    private api: ApiInstance;

    constructor(env?: EnvOptions) {
        this.api = getApiClient(env);
    }

    public async createCensoRegistro(body: CreateCensoRegistroRequestBody, codigo_cidade: number): Promise<void> {
        const response = await this.api({
            method: "post",
            url: `/censo/${codigo_cidade}`,
            data: body,
        });
        console.log(response.data);
    }
}

export { CensoService };
