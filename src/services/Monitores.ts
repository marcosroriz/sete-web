import { ApiInstance, EnvOptions, getApiClient } from "./apiClient";
import { Monitor, MonitorListObj } from "entities/Monitor";

type CreateMonitorRequestBody = Monitor;
type CreateMonitorResponse = {
    messages: string;
    result: boolean;
};

type ListMonitorResponse = {
    data: MonitorListObj[];
    result: boolean;
    total: number;
};

type GetMonitorResponse = Monitor;

type UpdateMonitorRequestBody = Monitor;
type UpdateMonitorResponse = Monitor;

class MonitoresService {
    private api: ApiInstance;
    constructor(env?: EnvOptions) {
        this.api = getApiClient(env);
    }

    public async listMonitores(codigo_cidade: number): Promise<ListMonitorResponse> {
        const response = await this.api({
            url: `/monitores/${codigo_cidade}`,
            method: "get",
        });
        const data = (await response.data) as ListMonitorResponse;
        return data;
    }

    public async createMonitor(body: CreateMonitorRequestBody, codigo_cidade: number): Promise<CreateMonitorResponse> {
        console.log(body);
        const response = await this.api({
            url: `/monitores/${codigo_cidade}`,
            method: "post",
            data: body,
        });
        const data = (await response.data) as CreateMonitorResponse;
        return data;
    }

    public async getMonitor(cpf_monitor: string, codigo_cidade: number): Promise<GetMonitorResponse> {
        const response = await this.api({
            url: `/monitores/${codigo_cidade}/${cpf_monitor}`,
            method: "get",
        });
        const data = (await response.data) as GetMonitorResponse;
        return data;
    }

    public async updateMonitor(body: UpdateMonitorRequestBody, cpf_Monitor: string, codigo_cidade: number): Promise<UpdateMonitorResponse> {
        const response = await this.api({
            url: `/monitores/${codigo_cidade}/${cpf_Monitor}`,
            method: "put",
            data: body,
        });
        const data = (await response.data) as UpdateMonitorResponse;
        return data;
    }

    public async deleteMonitor(cpf_monitor: string, codigo_cidade: number): Promise<void> {
        const response = await this.api({
            url: `/monitores/${codigo_cidade}/${cpf_monitor}`,
            method: "delete",
        });
        const data = await response.data;
    }
}

export { MonitoresService };
