interface Monitor {
    codigo_cidade?: number;
    cpf?: string;
    nome?: string;
    data_nascimento?: string;
    sexo?: number;
    telefone?: string;
    vinculo?: number;
    rotas?: string;
    salario?: number;
    turno_manha?: string;
    turno_tarde?: string;
    turno_noite?: string;
    loc_latitude?: string;
    loc_longitude?: string;
}

interface MonitorListObj {
    nome?: string;
    telefone?: string;
    cpf?: string;
    turno_manha?: string;
    turno_tarde?: string;
    turno_noite?: string;
    _links: {
        _self: string;
    };
}

interface MonitorTableField {
    nome: string;
    telefone: string;
    turno?: string;
}

export type { Monitor, MonitorListObj, MonitorTableField };
