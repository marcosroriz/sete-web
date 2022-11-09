interface Norma {
    id_norma?: number;
    codigo_cidade?: number;
    titulo_norma?: string;
    data_norma?: string;
    tipo_norma?: string;
    assunto?: string;
    aplicabilidade?: string;
    _links?: {
        _self?: string;
    };
    result?: boolean;
}

interface NormaListObj {
    titulo?: string;
    data_norma?: string;
    tipo_norma?: string;
    assunto?: string;
    aplicabilidade?: string;
}

enum TiposNormasEnum {
    decreto = 1,
    deliberacao = 2,
    instrucao_normativa = 3,
    lei = 4,
    ordem_servico = 5,
    portaria = 6,
    resolucao = 7,
    outro = 8,
}

const TiposNormasLabel = new Map<TiposNormasEnum, string>([
    [TiposNormasEnum.decreto, "Decreto"],
    [TiposNormasEnum.deliberacao, "Deliberação"],
    [TiposNormasEnum.instrucao_normativa, "Instrução Normativa"],
    [TiposNormasEnum.lei, "Lei"],
    [TiposNormasEnum.ordem_servico, "Ordem de Serviço"],
    [TiposNormasEnum.portaria, "Portaria"],
    [TiposNormasEnum.resolucao, "Resolução"],
    [TiposNormasEnum.outro, "Outro"],
]);

enum AssuntosEnum {
    assunto0 = 0,
    assunto1 = 1,
    assunto2 = 2,
    assunto3 = 3,
    assunto4 = 4,
    assunto5 = 5,
    assunto6 = 6,
    assunto7 = 7,
    assunto8 = 8,
    assunto9 = 9,
    assunto10 = 10,
    assunto11 = 11,
    assunto12 = 12,
    assunto13 = 13,
}

const AssuntosLabel = new Map<AssuntosEnum, string>([
    [AssuntosEnum.assunto0, "Campanhas educativas"],
    [AssuntosEnum.assunto1, "Condições de trabalho do motorista"],
    [AssuntosEnum.assunto2, "Conservação do veículo"],
    [AssuntosEnum.assunto3, "Critérios de manutenção compartilhada para bicicletas"],
    [AssuntosEnum.assunto4, "Distância máxima a ser percorrida - residência e embarque"],
    [AssuntosEnum.assunto5, "Estudante beneficiados"],
    [AssuntosEnum.assunto6, "Itinerários - menor tempo x maior segurança"],
    [AssuntosEnum.assunto7, "Ponto de embarque e desembarque"],
    [AssuntosEnum.assunto8, "Presença de monitores"],
    [AssuntosEnum.assunto9, "Prevê atendimento a atividade pedagógicas, esportivas e culturais"],
    [AssuntosEnum.assunto10, "Prevê atendimento a educação superior"],
    [AssuntosEnum.assunto11, "Regras de uso de bicicleta"],
    [AssuntosEnum.assunto12, "Segurança do estudante"],
    [AssuntosEnum.assunto13, "Outros"],
]);
const aplicabilidade = [
    { label: "Ônibus", value: "0" },
    { label: "Bicicleta", value: "1" },
    { label: "Lancha", value: "2" },
    { label: "Todos", value: "3" },
    { label: "Não se aplica", value: "4" },
];

enum TransportesEnum {
    onibus = 1,
    bicicleta = 2,
    lancha = 3,
    todos = 4,
    nao_aplica = 5,
}

const TransportesLabel = new Map<TransportesEnum, string>([
    [TransportesEnum.onibus, "Ônibus"],
    [TransportesEnum.bicicleta, "Bicicleta"],
    [TransportesEnum.lancha, "Lancha"],
    [TransportesEnum.todos, "Todos"],
    [TransportesEnum.nao_aplica, "Não se aplica"],
]);

export { AssuntosEnum, AssuntosLabel, TiposNormasEnum, TiposNormasLabel, TransportesEnum, TransportesLabel };
export type { Norma, NormaListObj };
