interface Escola {
    nome: string;
    mec_co_entidade: 0;
    mec_co_uf: 0;
    mec_co_municipio: 0;
    mec_no_entidade: string;
    mec_tp_dependencia: 1;
    mec_tp_localizacao: 1;
    mec_in_regular: "S" | "N";
    mec_in_eja: "S" | "N";
    mec_in_profissionalizante: "S" | "N";
    mec_in_especial_exclusiva: "S" | "N";
    loc_latitude: string;
    loc_longitude: string;
    loc_endereco: string;
    loc_cep: string;
    contato_responsavel: string;
    contato_telefone: string;
    contato_email: string;
    horario_matutino: "S" | "N";
    horario_vespertino: "S" | "N";
    horario_noturno: "S" | "N";
    ensino_superior: "S" | "N";
    ensino_medio: "S" | "N";
    ensino_fundamental: "S" | "N";
    ensino_pre_escola: "S" | "N";
}

export type { Escola };
