interface Escola {
    id_escola?: number;
    nome?: string;
    mec_co_entidade?: number;
    mec_co_uf?: number;
    mec_co_municipio?: number;
    mec_no_entidade?: string;
    mec_tp_dependencia?: number;
    mec_tp_localizacao?: number;
    mec_in_regular?: string;
    mec_in_eja?: string;
    mec_in_profissionalizante?: string;
    mec_in_especial_exclusiva?: string;
    loc_latitude?: string;
    loc_longitude?: string;
    loc_endereco?: string;
    loc_cep?: string;
    contato_responsavel?: string;
    contato_telefone?: string;
    contato_email?: string;
    horario_matutino?: string;
    horario_vespertino?: string;
    horario_noturno?: string;
    ensino_superior?: string;
    ensino_medio?: string;
    ensino_fundamental?: string;
    ensino_pre_escola?: string;
    _links?: {
        _self?: string;
    };
}

interface EscolaTableField {
    id_escola: number;
    nome: string;
    horario_matutino: string;
    horario_vespertino: string;
    horario_noturno: string;
    ensino_pre_escola: string;
    ensino_fundamental: string;
    ensino_medio: string;
    ensino_superior: string;
    nivel: string;
    horario_funcionamento: string;
    qtd_alunos: number;
}

export type { Escola, EscolaTableField };
