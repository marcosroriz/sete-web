interface Escola {
    id_escola?: number;
    nome?: string;
    mec_co_entidade?: number;
    mec_co_uf?: number;
    mec_co_municipio?: number;
    mec_no_entidade?: string;
    mec_tp_dependencia?: number;
    mec_tp_localizacao?: number;
    mec_tp_localizacao_diferenciada?: number;
    mec_in_regular?: string; // S N
    mec_in_eja?: string; // S N
    mec_in_profissionalizante?: string; // S N
    mec_in_especial_exclusiva?: string; // S N
    loc_latitude?: string;
    loc_longitude?: string;
    loc_endereco?: string;
    loc_cep?: string;
    contato_responsavel?: string;
    contato_telefone?: string;
    contato_email?: string;
    horario_matutino?: string; // S N
    horario_vespertino?: string; // S N
    horario_noturno?: string; // S N
    ensino_superior?: string; // S N
    ensino_medio?: string; // S N
    ensino_fundamental?: string; // S N
    ensino_pre_escola?: string; // S N
    _links?: {
        _self?: string;
    };
}

interface EscolaListObj {
    id_escola: number;
    codigo_cidade: number;
    mec_tp_localizacao: number;
    ensino_fundamental: string; // 'S' ou 'N'
    ensino_medio: string; // 'S' ou 'N'
    ensino_pre_escola: string; // 'S' ou 'N'
    ensino_superior: string; // 'S' ou 'N'
    horario_matutino: string; // 'S' ou 'N'
    horario_noturno: string; // 'S' ou 'N'
    horario_vespertino: string; // 'S' ou 'N'
    loc_latitude: string;
    loc_longitude: string;
    nome: string;
    qtd_alunos: number;
    _links: {
        _self: string;
    };
}

interface EscolaTableField {
    nome: string;
    localizacao: string;
    gps: string;
    nivel: string;
    horario_funcionamento: string;
    qtd_alunos: number;
}

interface EscolaListRota {
    label: string;
    value: string;
}

enum MecTpDependenciaEnum {
    Federal = "1",
    Estadual = "2",
    Municipal = "3",
    Privatizada = "4",
}
const MecTpDependenciaLabel = new Map<MecTpDependenciaEnum, string>([
    [MecTpDependenciaEnum.Federal, "Federal"],
    [MecTpDependenciaEnum.Estadual, "Estadual"],
    [MecTpDependenciaEnum.Municipal, "Municipal"],
    [MecTpDependenciaEnum.Privatizada, "Privatizada"],
]);

enum MecTpLocalizacaoEnum {
    Urbana = "1",
    Rural = "2",
}
const MecTpLocalizacaoLabel = new Map<MecTpLocalizacaoEnum, string>([
    [MecTpLocalizacaoEnum.Urbana, "Área Urbana"],
    [MecTpLocalizacaoEnum.Rural, "Área Rural"],
]);

enum MecTpLocalizacaoDiferenciadaEnum {
    NaoSeAplica = "7",
    Assentamento = "1",
    Indigena = "2",
    Quilombo = "3",
}
const MecTpLocalizacaoDiferenciadaLabel = new Map<MecTpLocalizacaoDiferenciadaEnum, string>([
    [MecTpLocalizacaoDiferenciadaEnum.NaoSeAplica, "Não se aplica"],
    [MecTpLocalizacaoDiferenciadaEnum.Assentamento, "Área de Assentamento"],
    [MecTpLocalizacaoDiferenciadaEnum.Assentamento, "Terra Indígena"],
    [MecTpLocalizacaoDiferenciadaEnum.Assentamento, "Área remanescente de Quilombo"],
]);

export {
    MecTpDependenciaEnum,
    MecTpDependenciaLabel,
    MecTpLocalizacaoEnum,
    MecTpLocalizacaoLabel,
    MecTpLocalizacaoDiferenciadaEnum,
    MecTpLocalizacaoDiferenciadaLabel,
};
export type { Escola, EscolaListObj, EscolaTableField, EscolaListRota };
