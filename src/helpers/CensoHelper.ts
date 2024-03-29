import Papa from "papaparse";
import { Aluno } from "entities/Aluno";
import { Escola } from "entities/Escola";

class CensoHelper {
    public baseDados: any;
    public gestor: any;
    public gestorNome: any;
    public gestorEmail: any;

    public parseBaseCenso(arq: File, onComplete: (base: any) => void, onError?: (err: Error) => void) {
        this.baseDados = {};
        Papa.parse(arq, {
            delimiter: "|",
            encoding: "ISO-8859-1",
            worker: false,
            step: (registro: any) => {
                let tipoDeRegistroAtual = registro.data[0];

                switch (tipoDeRegistroAtual) {
                    case "00":
                        this.processRegistro00(registro);
                        break;
                    case "20":
                        this.processRegistro20(registro);
                        break;
                    case "30":
                        this.processRegistro30(registro);
                        break;
                    case "40":
                        this.processRegistro40(registro);
                        break;
                    case "60":
                        this.processRegistro60(registro);
                        break;
                    default:
                        break;
                }
            },
            error: (err) => {
                if (onError) {
                    onError(err);
                }
            },
            complete: () => {
                Object.keys(this.baseDados).forEach((escolaID) => {
                    delete this.baseDados[escolaID]["PESSOAS"];
                    delete this.baseDados[escolaID]["TURMAS"];
                    delete this.baseDados[escolaID]["DISTRITO"];
                    delete this.baseDados[escolaID]["SITUACAO"];
                    this.baseDados[escolaID]["MEC_CO_UF"] = Number(String(this.baseDados[escolaID]["MEC_CO_MUNICIPIO"]).substr(0, 2));
                });
                onComplete(this.baseDados);
            },
        });
    }
    public parseRegistro00(registro) {
        // Campos default
        let escola = {
            PESSOAS: {},
            ALUNOS: {},
            TURMAS: {},
            CONTATO_RESPONSAVEL: "",
            CONTATO_TELEFONE: "",
            MEC_IN_REGULAR: false,
            MEC_IN_EJA: false,
            MEC_IN_PROFISSIONALIZANTE: false,
            MEC_IN_ESPECIAL_EXCLUSIVA: false,
            HORARIO_MATUTINO: false,
            HORARIO_VESPERTINO: false,
            HORARIO_NOTURNO: false,
            ENSINO_PRE_ESCOLA: false,
            ENSINO_FUNDAMENTAL: false,
            ENSINO_MEDIO: false,
            ENSINO_SUPERIOR: false,
        };

        // Campos Obrigatórios
        escola["ID_ESCOLA"] = Number(registro.data[1]);
        escola["MEC_CO_ENTIDADE"] = Number(registro.data[1]);
        escola["SITUACAO"] = Number(registro.data[2]);
        escola["NOME"] = registro.data[5];
        escola["MEC_NO_ENTIDADE"] = registro.data[5];
        escola["LOC_CEP"] = registro.data[6];
        escola["MEC_CO_MUNICIPIO"] = Number(registro.data[7]);
        escola["DISTRITO"] = registro.data[8];
        escola["LOC_ENDERECO"] = registro.data[9];

        // Campos opcionais referentes a localização e contato
        if (registro.data[10] != null && registro.data[10] != "") {
            escola["LOC_ENDERECO"] = escola["LOC_ENDERECO"] + " - NUM " + registro.data[10];
        }
        if (registro.data[11] != null && registro.data[11] != "") {
            escola["LOC_ENDERECO"] = escola["LOC_ENDERECO"] + " - " + registro.data[11];
        }
        if (registro.data[12] != null && registro.data[12] != "") {
            escola["LOC_ENDERECO"] = escola["LOC_ENDERECO"] + " - BAIRRO: " + registro.data[12];
        }
        if (registro.data[13] != null && registro.data[13] != "") {
            escola["CONTATO_TELEFONE"] = "(" + registro.data[13] + ")";
        }
        if (registro.data[14] != null && registro.data[15] != "") {
            escola["CONTATO_TELEFONE"] = escola["CONTATO_TELEFONE"] + " " + registro.data[14];
        }

        // Campos obrigatórios restantes (localização da escola)
        escola["MEC_TP_LOCALIZACAO"] = Number(registro.data[18]);
        escola["MEC_TP_LOCALIZACAO_DIFERENCIADA"] = Number(registro.data[19]);
        escola["MEC_TP_DEPENDENCIA"] = Number(registro.data[20]);

        return escola;
    }

    // Dados de Cadastro das Turmas da Escola
    public parseRegistro20(registro) {
        let turma = {
            MEC_IN_REGULAR: false,
            MEC_IN_EJA: false,
            MEC_IN_PROFISSIONALIZANTE: false,
            MEC_IN_ESPECIAL_EXCLUSIVA: false,
            HORARIO_MATUTINO: false,
            HORARIO_VESPERTINO: false,
            HORARIO_INTEGRAL: false,
            HORARIO_NOTURNO: false,
            ENSINO_PRE_ESCOLA: false,
            ENSINO_FUNDAMENTAL: false,
            ENSINO_MEDIO: false,
            ENSINO_SUPERIOR: false,
        };

        // Turma regular (1) ou é de atividade complementar (0) ?
        if (Number(registro.data[17]) == 1) {
            // Modalidade de ensino da turma
            let modalidade = Number(registro.data[27]);
            switch (modalidade) {
                case 1:
                    turma["MEC_IN_REGULAR"] = true;
                    break;
                case 2:
                    turma["MEC_IN_ESPECIAL_EXCLUSIVA"] = true;
                    break;
                case 3:
                    turma["MEC_IN_EJA"] = true;
                    break;
                case 4:
                    turma["MEC_IN_PROFISSIONALIZANTE"] = true;
                    break;
                default:
                    turma["MEC_IN_REGULAR"] = true;
            }

            // Etapa (série) de ensino da turma
            let etapa = Number(registro.data[28]);
            if ([1, 2, 3, 56].includes(etapa)) {
                turma["ENSINO_PRE_ESCOLA"] = true;
            } else if ((4 <= etapa && etapa <= 24) || etapa == 65 || etapa == 69 || etapa == 70 || etapa == 72 || etapa == 73) {
                turma["ENSINO_FUNDAMENTAL"] = true;
            } else {
                turma["ENSINO_MEDIO"] = true;
            }

            // Horário de inicío da turma
            if (registro.data[6] != null && registro.data[6] != "") {
                let horaInicial = Number(registro.data[6]);
                let horaFinal = Number(registro.data[8]);

                if (horaInicial >= 18) {
                    turma["HORARIO_NOTURNO"] = true;
                } else if (horaInicial >= 12) {
                    turma["HORARIO_VESPERTINO"] = true;
                } else if (horaInicial >= 5 && horaFinal >= 15) {
                    turma["HORARIO_INTEGRAL"] = true;
                } else {
                    turma["HORARIO_MATUTINO"] = true;
                }
            }
        }

        return turma;
    }

    public parseRegistro30(registro) {
        // Valores padrão
        let dadoPessoa = {
            DEF_CAMINHAR: false,
            DEF_OUVIR: false,
            DEF_ENXERGAR: false,
            DEF_MENTAL: false,
        };

        if (registro.data[4] != null && registro.data[4] != "") {
            dadoPessoa["CPF"] = registro.data[4];
        }

        dadoPessoa["NOME"] = registro.data[5];
        dadoPessoa["DATA_NASCIMENTO"] = registro.data[6];

        // Possui informações dos responsáveis?
        if (Number(registro.data[7]) == 1) {
            if (registro.data[8] != null && registro.data[8] != "") {
                dadoPessoa["NOME_RESPONSAVEL"] = registro.data[8];
            } else {
                dadoPessoa["NOME_RESPONSAVEL"] = registro.data[9];
            }
        }

        dadoPessoa["SEXO"] = Number(registro.data[10]);
        dadoPessoa["COR"] = Number(registro.data[11]);

        // Possui deficiência?
        if (Number(registro.data[15]) == 1) {
            if (Number(registro.data[16]) == 1) dadoPessoa["DEF_CAMINHAR"] = true;
            if (Number(registro.data[17]) == 1) dadoPessoa["DEF_ENXERGAR"] = true;
            if (Number(registro.data[18]) == 1) dadoPessoa["DEF_OUVIR"] = true;
            if (Number(registro.data[19]) == 1) dadoPessoa["DEF_OUVIR"] = true;
            if (Number(registro.data[20]) == 1) {
                dadoPessoa["DEF_ENXERGAR"] = true;
                dadoPessoa["DEF_OUVIR"] = true;
            }
            if (Number(registro.data[21]) == 1) dadoPessoa["DEF_CAMINHAR"] = true;
            if (Number(registro.data[22]) == 1) dadoPessoa["DEF_MENTAL"] = true;
            if (Number(registro.data[24]) == 1) dadoPessoa["DEF_MENTAL"] = true;
        }

        // Localização
        if (registro.data[41] != null && registro.data[41] != "") {
            dadoPessoa["LOC_CEP"] = registro.data[41];
        }

        if (registro.data[43] != null && registro.data[43] != "") {
            dadoPessoa["MEC_TP_LOCALIZACAO"] = Number(registro.data[43]);
        }

        // Contato Email
        if (registro.data[80] != null && registro.data[80] != "") {
            dadoPessoa["EMAIL"] = registro.data[80];
        }

        return dadoPessoa;
    }

    public processRegistro00(registro) {
        let escola = this.parseRegistro00(registro);
        let codEscola = Number(registro.data[1]);

        // Verifica se o cod da escola já está na base de dados
        if (!(codEscola in this.baseDados)) {
            this.baseDados[codEscola] = escola;
        } else {
            Object.assign(this.baseDados[codEscola], this.baseDados[codEscola], escola);
        }
    }

    public processRegistro20(registro) {
        let turma = this.parseRegistro20(registro);
        let codEscola = Number(registro.data[1]);
        let codTurma = registro.data[2];

        // TODO: colocar isso em um laço
        this.baseDados[codEscola]["MEC_IN_REGULAR"] = this.baseDados[codEscola]["MEC_IN_REGULAR"] || turma["MEC_IN_REGULAR"];
        this.baseDados[codEscola]["MEC_IN_EJA"] = this.baseDados[codEscola]["MEC_IN_EJA"] || turma["MEC_IN_EJA"];
        this.baseDados[codEscola]["MEC_IN_PROFISSIONALIZANTE"] = this.baseDados[codEscola]["MEC_IN_PROFISSIONALIZANTE"] || turma["MEC_IN_PROFISSIONALIZANTE"];
        this.baseDados[codEscola]["MEC_IN_ESPECIAL_EXCLUSIVA"] = this.baseDados[codEscola]["MEC_IN_ESPECIAL_EXCLUSIVA"] || turma["MEC_IN_ESPECIAL_EXCLUSIVA"];

        this.baseDados[codEscola]["HORARIO_MATUTINO"] = this.baseDados[codEscola]["HORARIO_MATUTINO"] || turma["HORARIO_MATUTINO"];
        this.baseDados[codEscola]["HORARIO_VESPERTINO"] = this.baseDados[codEscola]["HORARIO_VESPERTINO"] || turma["HORARIO_VESPERTINO"];
        this.baseDados[codEscola]["HORARIO_NOTURNO"] = this.baseDados[codEscola]["HORARIO_NOTURNO"] || turma["HORARIO_NOTURNO"];

        this.baseDados[codEscola]["ENSINO_PRE_ESCOLA"] = this.baseDados[codEscola]["ENSINO_PRE_ESCOLA"] || turma["ENSINO_PRE_ESCOLA"];
        this.baseDados[codEscola]["ENSINO_FUNDAMENTAL"] = this.baseDados[codEscola]["ENSINO_FUNDAMENTAL"] || turma["ENSINO_FUNDAMENTAL"];
        this.baseDados[codEscola]["ENSINO_MEDIO"] = this.baseDados[codEscola]["ENSINO_MEDIO"] || turma["ENSINO_MEDIO"];

        this.baseDados[codEscola]["TURMAS"][codTurma] = turma;
    }

    public processRegistro30(registro) {
        let pessoa = this.parseRegistro30(registro);
        let codEscola = Number(registro.data[1]);
        let codPessoa = registro.data[2];

        if (codPessoa == "") {
            codPessoa = registro.data[3];
        }

        this.baseDados[codEscola]["PESSOAS"][codPessoa] = pessoa;
    }

    public processRegistro40(registro) {
        let codEscola = Number(registro.data[1]);
        let codGestor = registro.data[2];

        if (codGestor == "") {
            codGestor = registro.data[3];
        }

        if (codGestor in this.baseDados[codEscola]["PESSOAS"]) {
            this.gestor = this.baseDados[codEscola]["PESSOAS"][codGestor];
            this.gestorNome = this.gestor["NOME"];
            this.gestorEmail = this.gestor["EMAIL"];

            this.baseDados[codEscola]["CONTATO_RESPONSAVEL"] = this.gestorNome;
            this.baseDados[codEscola]["CONTATO_EMAIL"] = this.gestorEmail;
        }
    }

    public processRegistro60(registro) {
        // Vamos verificar se o aluno (registro tipo 60) utiliza transporte escolar
        // Isto se encontra no registro 20
        if (registro.data[20] != null && registro.data[20] != "") {
            if (Number(registro.data[20]) == 1) {
                // aluno utiliza transporte escolar
                // adicionar ao campo de aluno da escola
                let codEscola = registro.data[1];
                let codAluno = registro.data[2];
                let temIdProprio = true;

                if (codAluno == "") {
                    temIdProprio = false;
                    codAluno = registro.data[3];
                }

                let codTurma = registro.data[4];

                if (codAluno in this.baseDados[codEscola]["PESSOAS"]) {
                    let aluno = this.baseDados[codEscola]["PESSOAS"][codAluno];
                    let turma = this.baseDados[codEscola]["TURMAS"][codTurma];

                    if (temIdProprio) {
                        aluno["mec_id_proprio"] = codAluno;
                    } else {
                        aluno["mec_id_inep"] = codAluno;
                    }

                    if (turma["ENSINO_PRE_ESCOLA"]) {
                        aluno["NIVEL"] = 1;
                    } else if (turma["ENSINO_FUNDAMENTAL"]) {
                        aluno["NIVEL"] = 2;
                    } else if (turma["ENSINO_MEDIO"]) {
                        aluno["NIVEL"] = 3;
                    } else {
                        aluno["NIVEL"] = 5;
                    }

                    if (turma["HORARIO_MATUTINO"]) {
                        aluno["TURNO"] = 1;
                    } else if (turma["HORARIO_VESPERTINO"]) {
                        aluno["TURNO"] = 2;
                    } else if (turma["HORARIO_INTEGRAL"]) {
                        aluno["TURNO"] = 3;
                    } else {
                        aluno["TURNO"] = 4; // Noite
                    }

                    this.baseDados[codEscola]["ALUNOS"][codAluno] = aluno;
                    delete this.baseDados[codEscola]["PESSOAS"][codAluno];
                }
            }
        }
    }
    public convertBaseToAluno(aluno: any, idEscola: string): Aluno {
        let alunoJSON = {
            id_escola: Number(idEscola),
            nome: aluno["NOME"], // string
            data_nascimento: aluno["DATA_NASCIMENTO"], // string
            nome_responsavel: aluno["NOME_RESPONSAVEL"],
            sexo: aluno["SEXO"], // int
            cor: aluno["COR"], // int
            mec_tp_localizacao: aluno["MEC_TP_LOCALIZACAO"],
            turno: aluno["TURNO"], // int
            nivel: aluno["NIVEL"],
            def_caminhar: aluno["DEF_CAMINHAR"] ? "S" : "N", // str
            def_ouvir: aluno["DEF_OUVIR"] ? "S" : "N", // str
            def_enxergar: aluno["DEF_ENXERGAR"] ? "S" : "N", // str
            def_mental: aluno["DEF_MENTAL"] ? "S" : "N", // str
        };
        if (aluno["mec_id_inep"]) alunoJSON["mec_id_inep"] = aluno["mec_id_inep"];
        if (aluno["mec_id_proprio"]) alunoJSON["mec_id_proprio"] = aluno["mec_id_proprio"];
        if (aluno["LOC_CEP"]) alunoJSON["loc_cep"] = aluno["LOC_CEP"];
        if (aluno["CPF"]) alunoJSON["cpf"] = String(aluno["CPF"]).replace(/\D/g, "");

        return alunoJSON;
    }

    public convertBaseToEscola(escola: any): Escola {
        let escolaJSON = {};
        for (let attr of Object.keys(escola)) {
            escolaJSON[attr.toLowerCase()] = escola[attr];
        }
        delete escolaJSON["alunos"];

        let booleanProps = [
            "mec_in_regular",
            "mec_in_eja",
            "mec_in_profissionalizante",
            "mec_in_especial_exclusiva",
            "ensino_fundamental",
            "ensino_pre_escola",
            "ensino_medio",
            "ensino_superior",
            "horario_matutino",
            "horario_vespertino",
            "horario_noturno",
        ];

        for (let prop of booleanProps) {
            escolaJSON[prop] = escolaJSON[prop] ? "S" : "N";
        }
        return escolaJSON;
    }
}

export { CensoHelper };
