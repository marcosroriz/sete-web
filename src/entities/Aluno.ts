import { parseNode } from "ol/xml";

interface Aluno {
    id_aluno?: number;
    loc_latitude?: string;
    loc_longitude?: string;
    loc_endereco?: string;
    loc_cep?: string;
    mec_tp_localizacao: number;
    da_porteira?: string; // 'S' ou 'N'
    da_mataburro?: string; // 'S' ou 'N'
    da_colchete?: string; // 'S' ou 'N'
    da_atoleiro?: string; // 'S' ou 'N'
    da_ponterustica?: string; // 'S' ou 'N'
    nome: string;
    data_nascimento: string;
    sexo: number;
    cor: number;
    turno: number;
    nivel: number;
    nome_responsavel?: string;
    telefone_responsavel?: string; //Não tem na API
    grau_responsavel?: number;
    cpf?: string;
    def_caminhar?: string; // 'S' ou 'N'
    def_ouvir?: string; // 'S' ou 'N'
    def_enxergar?: string; // 'S' ou 'N'
    def_mental?: string; // 'S' ou 'N'
    id_escola?: number;
    id_rota?: number;
}

interface AlunoListObj {
    codigo_cidade: number;
    id_aluno: number;
    nome: string;
    cpf: string;
    loc_latitude: string;
    loc_longitude: string;
    mec_tp_localizacao: number;
    nivel: number;
    turno: number;
    escola: string;
    rota: string;
    _links: {
        _self: string;
    };
}

interface AlunosTableField {
    id_aluno: number;
    nome: string;
    localizacao: string;
    gps: string;
    escola: string;
    nivel: string;
    turno: string;
    rota: string;
}

interface AlunosList {
    label: string;
    value: string;
}

enum MecTpLocalizacaoEnum {
    Urbana = 1,
    Rural = 2,
}

const MecTpLocalizacaoLabel = new Map<MecTpLocalizacaoEnum, string>([
    [MecTpLocalizacaoEnum.Urbana, "Área Urbana"],
    [MecTpLocalizacaoEnum.Rural, "Área Rural"],
]);

const MecTpLocalizacaoTableLabel = new Map<MecTpLocalizacaoEnum, string>([
    [MecTpLocalizacaoEnum.Urbana, "Urbana"],
    [MecTpLocalizacaoEnum.Rural, "Rural"],
]);

enum SexoEnum {
    Masculino = 1,
    Feminino = 2,
    NaoInformado = 3,
}
const SexoLabel = new Map<SexoEnum, string>([
    [SexoEnum.NaoInformado, "Não Informado"],
    [SexoEnum.Masculino, "Masculino"],
    [SexoEnum.Feminino, "Feminino"],
]);

enum CorEnum {
    NaoInformada = 0,
    Amarelo = 1,
    Branco = 2,
    Indigena = 3,
    Pardo = 4,
    Preto = 5,
}
const CorLabel = new Map<CorEnum, string>([
    [CorEnum.NaoInformada, "Não Informada"],
    [CorEnum.Amarelo, "Amarelo"],
    [CorEnum.Branco, "Branco"],
    [CorEnum.Indigena, "Indígena"],
    [CorEnum.Pardo, "Pardo"],
    [CorEnum.Preto, "Preto"],
]);

enum GrauParentescoEnum {
    NaoInformado = -1,
    PaiMae = 0,
    Avo = 1,
    Irma = 2,
    OutroParente = 4,
}
const GrauParentescoLabel = new Map<GrauParentescoEnum, string>([
    [GrauParentescoEnum.NaoInformado, "Não Informado"],
    [GrauParentescoEnum.PaiMae, "Pai, Mãe Padrasto ou Madrasta"],
    [GrauParentescoEnum.Avo, "Avô ou Avó"],
    [GrauParentescoEnum.Irma, "Irmão ou Irmã"],
    [GrauParentescoEnum.OutroParente, "Outro parente"],
]);

enum TurnoEnum {
    Manha = 1,
    Tarde = 2,
    Integral = 3,
    Noite = 4,
}
const TurnoLabel = new Map<TurnoEnum, string>([
    [TurnoEnum.Manha, "Manhã"],
    [TurnoEnum.Tarde, "Tarde (Vespertino)"],
    [TurnoEnum.Integral, "Integral (Manhã + Tarde)"],
    [TurnoEnum.Noite, "Noite (Noturno)"],
]);

const TurnoTableLabel = new Map<TurnoEnum, string>([
    [TurnoEnum.Manha, "Manhã"],
    [TurnoEnum.Tarde, "Tarde"],
    [TurnoEnum.Integral, "Integral"],
    [TurnoEnum.Noite, "Noite"],
]);

enum NivelEnum {
    Infantil = 1,
    Fundamental = 2,
    Medio = 3,
    Superior = 4,
    Outro = 5,
}

const NivelLabel = new Map<NivelEnum, string>([
    [NivelEnum.Infantil, "Infantil(Creche e Pré-Escola)"],
    [NivelEnum.Fundamental, "Fundamental"],
    [NivelEnum.Medio, "Médio"],
    [NivelEnum.Superior, "Noite (Noturno)"],
    [NivelEnum.Outro, "Outro"],
]);

const NivelTableLabel = new Map<NivelEnum, string>([
    [NivelEnum.Infantil, "Infantil"],
    [NivelEnum.Fundamental, "Fundamental"],
    [NivelEnum.Medio, "Médio"],
    [NivelEnum.Superior, "Noite"],
    [NivelEnum.Outro, "Outro"],
]);

export {
    MecTpLocalizacaoEnum,
    MecTpLocalizacaoLabel,
    MecTpLocalizacaoTableLabel,
    GrauParentescoEnum,
    GrauParentescoLabel,
    SexoEnum,
    SexoLabel,
    CorEnum,
    CorLabel,
    TurnoEnum,
    TurnoLabel,
    TurnoTableLabel,
    NivelEnum,
    NivelLabel,
    NivelTableLabel,
};
export type { Aluno, AlunoListObj, AlunosTableField, AlunosList };
