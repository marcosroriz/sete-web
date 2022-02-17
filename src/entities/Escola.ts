interface Escola {
    id_escola?: number;
    nome?: string;
    mec_co_entidade?: number;
    mec_co_uf?: number;
    mec_co_municipio?: number;
    mec_no_entidade?: string;
    mec_tp_dependencia?: number;
    mec_tp_localizacao?: number;
    mec_tp_localizacao_diferenciada?: number;
    mec_in_regular?: string; // S N
    mec_in_eja?: string; // S N
    mec_in_profissionalizante?: string; // S N
    mec_in_especial_exclusiva?: string; // S N
    loc_latitude?: string;
    loc_longitude?: string;
    loc_endereco?: string;
    loc_cep?: string;
    contato_responsavel?: string;
    contato_telefone?: string;
    contato_email?: string;
    horario_matutino?: string; // S N
    horario_vespertino?: string; // S N
    horario_noturno?: string; // S N
    ensino_superior?: string; // S N
    ensino_medio?: string; // S N
    ensino_fundamental?: string; // S N
    ensino_pre_escola?: string; // S N
    _links?: {
        _self?: string;
    };
}

interface EscolaListObj {
    id_escola: number;
    codigo_cidade: number;
    mec_tp_localizacao: number;
    ensino_fundamental: string; // 'S' ou 'N'
    ensino_medio: string; // 'S' ou 'N'
    ensino_pre_escola: string; // 'S' ou 'N'
    ensino_superior: string; // 'S' ou 'N'
    horario_matutino: string; // 'S' ou 'N'
    horario_noturno: string; // 'S' ou 'N'
    horario_vespertino: string; // 'S' ou 'N'
    loc_latitude: string;
    loc_longitude: string;
    nome: string;
    qtd_alunos: number;
    _links: {
        _self: string;
    };
}

interface EscolaTableField {
    nome: string;
    localizacao: string;
    gps: string;
    nivel: string;
    horario_funcionamento: string;
    qtd_alunos: number;
}

interface EscolaListRota {
    label: string;
    value: string;
}

export type { Escola, EscolaListObj, EscolaTableField, EscolaListRota };
