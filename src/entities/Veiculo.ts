interface Veiculo {
    codigo_cidade?: number;
    id_veiculo?: number;
    placa?: string;
    marca?: string;
    modelo?: number;
    ano?: number;
    modo?: number;
    origem?: number;
    km_atual?: number;
    km_inicial?: number;
    capacidade?: number;
    tipo?: number;
    ipva?: number;
    dpvat?: number;
    seguro_anual?: number;
    consumo?: number;
    tipo_combustivel?: string;
    numero_pneus?: number;
    vida_util_pneu?: number;
    potencia?: number;
    preco?: number;
    renavam?: string;
    manutencao?: string;
    id_firebase?: string;
    _links?: {
        _self?: string;
    };
    result?: boolean;
}

interface VeiculoListObj {
    id_veiculo: number;
    placa: string;
    tipo: string;
    marca: string;
    modelo: string;
    capacidade: string;
    manutencao: string;
    origem: string;
}

interface VeiculoTableField {
    placa: string;
    tipo: string;
    marca: string;
    modelo: string;
    capacidade: string;
    manutencao: string;
    origem: string;
}

export type { Veiculo, VeiculoListObj, VeiculoTableField };
