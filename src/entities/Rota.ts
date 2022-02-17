interface Rota {
    codigo_cidade?: number;
    id_rota?: number;
    nome?: string;
    km?: number;
    tempo?: number;
    tipo?: number;
    da_porteira?: string; // 'S' ou 'N'
    da_mataburro?: string; // 'S' ou 'N'
    da_colchete?: string; // 'S' ou 'N'
    da_atoleiro?: string; // 'S' ou 'N'
    da_ponterustica?: string; // 'S' ou 'N'
    turno_matutino?: string; // 'S' ou 'N'
    turno_vespertino?: string; // 'S' ou 'N'
    turno_noturno?: string; // 'S' ou 'N'
    shape?: string;
    hora_ida_inicio?: string;
    hora_ida_termino?: string;
    hora_volta_inicio?: string;
    hora_volta_termino?: string;
    _links?: {
        _self?: string;
    };
}

interface RotaListObj {
    id_rota: number;
    codigo_cidade: number;
    nome: string;
    turno_matutino: string; // 'S' ou 'N'
    turno_vespertino: string; // 'S' ou 'N'
    turno_noturno: string; // 'S' ou 'N'
    gps: string;
    km: number;
    _links: {
        _self: string;
    };
}

interface RotaTableField {
    nome: string;
    turno: string;
    gps: string;
    quilometragem: number;
    alunos_atendidos: any;
    escolas_atendidas: number;
}

export type { Rota, RotaListObj, RotaTableField };
