interface Fornecedor {
    cnpj?: string;
    nome?: string;
    ramo_mecanica?: string;
    ramo_combustivel?: string;
    ramo_seguro?: string;
    loc_latitude?: string;
    loc_longitude?: string;
    loc_endereco?: string;
    loc_cep?: string;
    telefone?: string;
}

interface FornecedorListObj {
    nome: string;
    telefone: string;
    ramo_mecanica?: string;
    ramo_combustivel?: string;
    ramo_seguro?: string;
}

interface FornecedorTableField {
    nome: string;
    telefone: string;
    servicos_oferecidos: string;
    numero_servicos: number;
}

export type { Fornecedor, FornecedorListObj, FornecedorTableField };
