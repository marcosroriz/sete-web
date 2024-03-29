import { ApiInstance, EnvOptions, getApiClient } from "./apiClient";
import { Fornecedor, FornecedorListObj } from "entities/Fornecedor";

type CreateFornecedorRequestBody = Fornecedor;
type CreateFornecedorResponse = {
    messages: string;
    result: boolean;
};

type UpdateFornecedorRequestBody = Fornecedor;
type UpdateFornecedorResponse = {
    messages: string | { [key: string]: any };
    result: boolean;
};

type ListFornecedorResponse = {
    data: FornecedorListObj[];
    total: number;
    result: boolean;
};

type GetFornecedorResponse = Fornecedor & { result: boolean };

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

    public async getFornecedor(id_fornecedor: number, codigo_cidade: number): Promise<GetFornecedorResponse> {
        const response = await this.api({
            method: "get",
            url: `/fornecedores/${codigo_cidade}/${id_fornecedor}`,
        });

        const data = (await response.data) as GetFornecedorResponse;
        return data;
    }

    public async updateFornecedor(body: UpdateFornecedorRequestBody, id_fornecedor: number, codigo_cidade: number): Promise<UpdateFornecedorResponse> {
        const response = await this.api({
            method: "put",
            url: `/fornecedores/${codigo_cidade}/${id_fornecedor}`,
            data: body,
        });

        const data = (await response.data) as UpdateFornecedorResponse;
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
