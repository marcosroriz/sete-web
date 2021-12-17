interface Veiculo {
    codigo_cidade?: number;
    id_veiculo?: number;
    modo?: number;
    tipo?: number;
    marca?: string;
    modelo?: number;
    ano?: number;
    numero_pneus?: number;
    vida_util_pneu?: number;
    potencia?: number;
    preco?: number;
    origem?: number;
    placa?: string;
    renavam?: string;
    km_atual?: number;
    km_inicial?: number;
    capacidade?: number;
    manutencao?: string;
    ipva?: number;
    dpvat?: number;
    seguro_anual?: number;
    consumo?: number;
    tipo_combustivel?: string;
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
