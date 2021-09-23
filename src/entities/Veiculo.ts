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
    _links?: {
        _self?: string;
    };
    result?: boolean;
}

export type { Veiculo };
