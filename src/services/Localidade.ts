import { ApiInstance, EnvOptions, getApiClient } from "./apiClient";

type GetEstadosResponse = {
    data: {
        codigo: number;
        nome: string;
        uf: string;
    }[];
    total: number;
    result: boolean;
};

type GetMunicipiosFromEstadoResponse = {
    data: {
        codigo_uf: number;
        nm_cidade: string;
        codigo_cidade: number;
        estado: string;
    }[];
    total: number;
    result: boolean;
};

class LocalidadeService {
    private api: ApiInstance;
    constructor(env?: EnvOptions) {
        this.api = getApiClient(env);
    }

    public async getEstados(): Promise<GetEstadosResponse> {
        const response = await this.api({
            url: "/localidades/estados",
            method: "get",
        });
        const data = (await response.data) as GetEstadosResponse;
        return data;
    }

    public async getMunicipiosFromEstado(codigo_estado: number): Promise<GetMunicipiosFromEstadoResponse> {
        const response = await this.api({
            url: `/localidades/municipios/${codigo_estado}`,
            method: "get",
        });
        const data = (await response.data) as GetMunicipiosFromEstadoResponse;
        return data;
    }
}

export { LocalidadeService };
