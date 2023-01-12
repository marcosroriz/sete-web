interface Rota {
    codigo_cidade?: number;
    id_rota?: number;
    nome?: string;
    km?: number;
    tempo?: number;
    tipo?: number;
    da_porteira?: string; // 'S' ou 'N'
    da_mataburro?: string; // 'S' ou 'N'
    da_colchete?: string; // 'S' ou 'N'
    da_atoleiro?: string; // 'S' ou 'N'
    da_ponterustica?: string; // 'S' ou 'N'
    turno_matutino?: string; // 'S' ou 'N'
    turno_vespertino?: string; // 'S' ou 'N'
    turno_noturno?: string; // 'S' ou 'N'
    shape?: string;
    hora_ida_inicio?: string;
    hora_ida_termino?: string;
    hora_volta_inicio?: string;
    hora_volta_termino?: string;
    _links?: {
        _self?: string;
    };
}

interface RotaListObj {
    id_rota: number;
    codigo_cidade: number;
    nome: string;
    turno_matutino: string; // 'S' ou 'N'
    turno_vespertino: string; // 'S' ou 'N'
    turno_noturno: string; // 'S' ou 'N'
    gps: string;
    km: number;
    _links: {
        _self: string;
    };
}

interface RotaTableField {
    nome: string;
    turno: string;
    gps: string;
    quilometragem: number;
    alunos_atendidos: any;
    escolas_atendidas: number;
}

enum TiposVeiculosEnum {
    EscolherDepois = -1,
    AnimalTracao = 0,
    BarcoAluminio = 1,
    Bicicleta = 2,
    MicroOnibusKWI = 3,
    MicroOnibusKWY = 4,
    OnibusAAA = 5,
    OnibusADS = 6,
    OnibusKEO = 7,
    OnibusNLA = 8,
    Outro = 9,
    Van = 10,
}
const TiposVeiculosLabel = new Map<TiposVeiculosEnum, string>([
    [TiposVeiculosEnum.EscolherDepois, "Escolher veículo depois"],
    [TiposVeiculosEnum.AnimalTracao, "Animal de Tração (JZZ-4639)"],
    [TiposVeiculosEnum.BarcoAluminio, "Barco de Alumínio (LLL-1111)"],
    [TiposVeiculosEnum.Bicicleta, "Bicicleta (AAA-2222)"],
    [TiposVeiculosEnum.MicroOnibusKWI, "Micro-Ônibus (KWI-7I10)"],
    [TiposVeiculosEnum.MicroOnibusKWY, "Micro-Ônibus (KWY-7I10)"],
    [TiposVeiculosEnum.OnibusAAA, "Ônibus (AAA-9999)"],
    [TiposVeiculosEnum.OnibusADS, "Ônibus (ADS-FASA)"],
    [TiposVeiculosEnum.OnibusKEO, "Ônibus (KEO-9180)"],
    [TiposVeiculosEnum.OnibusNLA, "Ônibus (NLA-6606)"],
    [TiposVeiculosEnum.Outro, "Outro (AAA-1221)"],
    [TiposVeiculosEnum.Van, "Van (NLA-6616)"],
]);

export { TiposVeiculosEnum, TiposVeiculosLabel };
export type { Rota, RotaListObj, RotaTableField };
