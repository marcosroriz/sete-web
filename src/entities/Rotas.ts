interface Rotas {
    id_rota?: number;
    nome?: string;
    tipo_veiculo?: number;
    tipo?: number;
    motoristas_responsaveis?: number;
    monitores?: string;
    escolas_atendidas?: number;
    alunos_atendidos?: number;
    turno?: string;
    turno_matutino?: string; // S N
    turno_vespertino?: string; // S N
    turno_noturno?: string; // S N
    da_porteira?: string; // 'S' ou 'N'
    da_mataburro?: string; // 'S' ou 'N'
    da_colchete?: string; // 'S' ou 'N'
    da_atoleiro?: string; // 'S' ou 'N'
    da_ponterustica?: string; // 'S' ou 'N'
    km?: number;
    tempo?: number;
    hora_ida_inicio: string;
    hora_ida_termino: string;
    hora_volta_inicio: string;
    hora_volta_termino: string;
    shape: string;
    _links?: {
        _self?: string;
    };
}

interface RotasListObj {
    id_rota: number;
    nome: string;
    codigo_cidade: number;
    km?: string;
    turno_matutino?: string;
    turno_vespertino?: string;
    turno_noturno?: string;
    escolas_atendidas?: number;
    alunos_atendidos?: number;
    _links: {
        _self: string;
    };
}

interface RotasTableField {
    id_rota: number;
    nome: string;
    km?: string;
    turno: string;
    escolas_atendidas?: number;
    alunos_atendidos?: number;
}

enum TiposVeiculosEnum {
    EscolherDepois = 0,
    AnimalTracao = 1,
    BarcoAluminio = 2,
    Bicicleta = 3,
    MicroOnibusKWI = 4,
    MicroOnibusKWY = 5,
    OnibusAAA = 6,
    OnibusADS = 7,
    OnibusKEO = 8,
    OnibusNLA = 9,
    Outro = 10,
    Van = 11,
}

const TiposVeiculosLabel = new Map<TiposVeiculosEnum, string>([
    [TiposVeiculosEnum.EscolherDepois, "Escolher veículo depois"],
    [TiposVeiculosEnum.AnimalTracao, "Animal de Tração (JZZ-4639)"],
    [TiposVeiculosEnum.BarcoAluminio, "Barco de Alumínio (LLL-1111)"],
    [TiposVeiculosEnum.Bicicleta, "Biciclete (AAA-2222)"],
    [TiposVeiculosEnum.MicroOnibusKWI, "Micro-Ônibus (KWI-7l10)"],
    [TiposVeiculosEnum.MicroOnibusKWY, "Micro-Ônibus (KWY-7l10)"],
    [TiposVeiculosEnum.OnibusAAA, "Ônibus (AAA-9999)"],
    [TiposVeiculosEnum.OnibusADS, "Ônibus (ADS-FASA)"],
    [TiposVeiculosEnum.OnibusKEO, "Ônibus (KEO-9180)"],
    [TiposVeiculosEnum.OnibusNLA, "Ônibus (NLA-6606)"],
    [TiposVeiculosEnum.Outro, "Outro (AAA-1221)"],
    [TiposVeiculosEnum.Van, "VAN (NLA-6616)"],
]);

enum TiposRotasEnum {
    Rodoviaria = 1,
    Aquaviaria = 2,
    Mista = 3,
}
const TiposRotasLabel = new Map<TiposRotasEnum, string>([
    [TiposRotasEnum.Rodoviaria, "Rodoviária"],
    [TiposRotasEnum.Aquaviaria, "Aquaviária"],
    [TiposRotasEnum.Mista, "Mista"],
]);

enum TiposMotoristasEnum {
    EscolherDepois = 0,
    fulano = 1,
    Teste = 2,
}

const TiposMotoristasLabel = new Map<TiposMotoristasEnum, string>([
    [TiposMotoristasEnum.EscolherDepois, "Escolher veículo depois"],
    [TiposMotoristasEnum.fulano, "fulano"],
    [TiposMotoristasEnum.Teste, "Motorista teste"],
]);

enum TiposMonitoresEnum {
    EscolherDepois = 0,
    fulano = 1,
    Teste = 2,
}

const TiposMonitoresLabel = new Map<TiposMonitoresEnum, string>([
    [TiposMonitoresEnum.EscolherDepois, "Escolher veículo depois"],
    [TiposMonitoresEnum.fulano, "fulano"],
    [TiposMonitoresEnum.Teste, "Motorista teste"],
]);

export {
    TiposVeiculosEnum,
    TiposVeiculosLabel,
    TiposRotasEnum,
    TiposRotasLabel,
    TiposMotoristasEnum,
    TiposMotoristasLabel,
    TiposMonitoresEnum,
    TiposMonitoresLabel,
};
export type { Rotas, RotasListObj, RotasTableField };
