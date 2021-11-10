interface Aluno {
    loc_latitude?: string;
    loc_longitude?: string;
    loc_endereco?: string;
    loc_cep?: string;
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
    grau_responsavel?: number;
    mec_tp_localizacao: number;
    cpf?: string;
    def_caminhar?: string; // 'S' ou 'N'
    def_ouvir?: string; // 'S' ou 'N'
    def_enxergar?: string; // 'S' ou 'N'
    def_mental?: string; // 'S' ou 'N'
}

interface AlunoListObj {
    codigo_cidade: number;
    id_aluno: number;
    nome: string;
    cpf: string;
    loc_latitude: string;
    log_longitude: string;
    nivel: number;
    turno: number;
    escola: string;
    rota: string;
    _links: {
        _self: string;
    };
}

interface AlunosTableField {
    nome: string;
    localizacao: string;
    gps: string;
    escola: string;
    nivel: string;
    turno: string;
    rota: string;
}

export type { Aluno, AlunoListObj, AlunosTableField };
