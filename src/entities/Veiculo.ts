interface Veiculo {
    codigo_cidade?: number;
    id_veiculo?: number;
    placa?: string;
    modelo?: string;
    ano?: number;
    modo?: string;
    origem?: number;
    km_inicial?: string;
    capacidade?: number;
    km_atual?: string;
    tipo?: number;
    renavam?: string;
    manutencao?: string;
    marca?: string;
    id_firebase?: number;
    marca_str?: string;
    modo_str?: string;
    origem_str?: string;
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
