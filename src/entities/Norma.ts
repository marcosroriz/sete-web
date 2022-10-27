interface Norma {
    codigo_cidade?: number;
    titulo?: string;
    data_norma?: string;
    tipo_norma?: string;
    assunto?: string;
    aplicabilidade?: string;
}

interface NormaListObj {
    titulo?: string;
    data_norma?: string;
    tipo_norma?: string;
    assunto?: string;
    aplicabilidade?: string;
}

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

export { AssuntosEnum, AssuntosLabel };
export type { Norma, NormaListObj };
