import { ApiInstance, EnvOptions, getApiClient } from "./apiClient";
import { Escola, EscolaTableField, EscolaListObj } from "entities/Escola";

type ListEscolaResponse = {
    data: EscolaListObj[];
    result: boolean;
    total: number;
};

type CreateEscolaRequestBody = {
    loc_latitude: string;
    loc_longitude: string;
    mec_co_uf: number;
    mec_co_municipio: number;
    loc_endereco: string;
    loc_cep: string;
    mec_tp_localizacao: number;
    mec_tp_localizacao_diferenciada: number;

    nome: string;
    contato_responsavel: string;
    contato_telefone: string;
    contato_email: string;
    // escola_tipo: string;

    mec_in_regular: string;
    mec_in_eja: string;
    mec_in_profissionalizante: string;
    ensino_pre_escola: string;
    ensino_fundamental: string;
    ensino_medio: string;
    ensino_superior: string;
    horario_matutino: string;
    horario_vespertino: string;
    horario_noturno: string;
};

type CreateEscolaResponse = {
    result: boolean;
};

type GetEscolaResponse = Escola & { result: boolean };

class EscolasService {
    private api: ApiInstance;
    constructor(env?: EnvOptions) {
        this.api = getApiClient(env);
    }

    public async listEscolas(codigo_cidade: number): Promise<ListEscolaResponse> {
        const response = await this.api({
            url: `/escolas/${codigo_cidade}`,
            method: "get",
        });
        const data = (await response.data) as ListEscolaResponse;
        return data;
    }

    public async createEscolas(body: CreateEscolaRequestBody, codigo_cidade: number): Promise<CreateEscolaResponse> {
        const response = await this.api({
            url: `/escolas/${codigo_cidade}`,
            method: "post",
            data: body,
        });
        const data = (await response.data) as CreateEscolaResponse;
        return data;
    }

    public async getEscola(veiculo_id: number, codigo_cidade: number): Promise<GetEscolaResponse> {
        const response = await this.api({
            url: `/escolas/${codigo_cidade}/${veiculo_id}`,
            method: "get",
        });
        const data = (await response.data) as GetEscolaResponse;
        return data;
    }

    public async deleteEscola(id_escola: number, codigo_cidade: number): Promise<void> {
        const response = await this.api({
            url: `/escolas/${codigo_cidade}/${id_escola}`,
            method: "delete",
        });
        const data = await response.data;
    }
}

export { EscolasService };
