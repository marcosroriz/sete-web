import { ApiInstance, EnvOptions, getApiClient } from "./apiClient";
import { Fornecedor, FornecedorListObj } from "entities/Fornecedor";

type CreateFornecedorRequestBody = Fornecedor;
type CreateFornecedorResponse = {
    messages: string;
    result: boolean;
};

type ListFornecedorResponse = {
    data: FornecedorListObj[];
    total: number;
    result: boolean;
};

class FornecedoresService {
    private api: ApiInstance;

    constructor(env?: EnvOptions) {
        this.api = getApiClient(env);
    }

    public async createFornecedor(body: CreateFornecedorRequestBody, codigo_cidade: number): Promise<CreateFornecedorResponse> {
        const response = await this.api({
            method: "post",
            url: `/fornecedores/${codigo_cidade}`,
            data: body,
        });

        const data = (await response.data) as CreateFornecedorResponse;
        return data;
    }

    public async listFornecedores(codigo_cidade: number): Promise<ListFornecedorResponse> {
        const response = await this.api({
            method: "get",
            url: `/fornecedores/${codigo_cidade}`,
        });

        const data = (await response.data) as ListFornecedorResponse;
        return data;
    }

    public async deleteFornecedor(id_fornecedor: number, codigo_cidade: number): Promise<void> {
        const response = await this.api({
            url: `/fornecedores/${codigo_cidade}/${id_fornecedor}`,
            method: "delete",
        });
        const data = await response.data;
    }
}

export { FornecedoresService };
