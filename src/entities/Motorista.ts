interface Motorista {
    codigo_cidade?: number;
    nome?: string;
    cpf?: string;
    data_nascimento?: string;
    sexo?: number;
    telefone?: string;
    cnh?: string;
    data_validade_cnh?: string;
    turno_manha?: string;
    turno_tarde?: string;
    turno_noite?: string;
    tem_cnh_a?: string;
    tem_cnh_b?: string;
    tem_cnh_c?: string;
    tem_cnh_d?: string;
    tem_cnh_e?: string;
}

interface MotoristaTableField {
    nome: string;
}

export type { Motorista, MotoristaTableField };
