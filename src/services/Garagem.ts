import { Garagem } from "entities/Garagem";
import { ApiInstance, EnvOptions, getApiClient } from "./apiClient";

type CreateGaragemRequestBody = Garagem;

type CreateGaragemResponse = {
    messages: string;
    result: boolean;
};

class GaragemService {
    private api: ApiInstance;
    constructor(env?: EnvOptions) {
        this.api = getApiClient(env);
    }

    public async createGaragem(body: CreateGaragemRequestBody, codigo_cidade: number): Promise<CreateGaragemResponse> {
        const response = await this.api({
            method: "post",
            url: `/garagem/${codigo_cidade}`,
            data: body,
        });

        const data = (await response.data) as CreateGaragemResponse;
        return data;
    }
}

export { GaragemService };
