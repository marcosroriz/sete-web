import { Aluno, GrauParentescoEnum } from "entities/Aluno";
import * as yup from "yup";

const handleAtLeastOne: yup.TestFunction<(string | undefined)[] | undefined, {}> = (arr) => {
    if (!arr) {
        return false;
    }
    let arrLength = arr.length;
    arr.forEach((arrItem) => {
        if (arrItem != "") arrLength--;
    });
    return arrLength == 0;
};

const localizacaoSchema = yup.object().shape({
    mec_tp_localizacao: yup.string().required("Esse campo é obrigatório").nullable(true),
});

const dadosPessoaisSchema = yup.object().shape({
    nome: yup.string().required("Esse campo é obrigatório"),
    cpf: yup.lazy((value) => (!value ? yup.string() : yup.string().matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, "Esse campo deve ser um cpf válido"))),
    data_nascimento: yup.string().required("Esse campo é obrigatório"),
    telefone_responsavel: yup.lazy((value) =>
        !value
            ? yup.string()
            : yup
                  .string()
                  .matches(/^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/, "Deve ser um telefone"),
    ),
    sexo: yup.string().required("Esse campo é obrigatório").nullable(true),
    cor: yup.string().required("Esse campo é obrigatório").nullable(true),
});

const dadosEscolaresSchema = yup.object().shape({
    turno: yup.string().required("Esse campo é obrigatório"),
    nivel: yup.string().required("Esse campo é obrigatório"),
    escola: yup.string().required("Esse campo é obrigatório"),
    rota: yup.string().required("Esse campo é obrigatório"),
});

// Nem sempre os dados do formulário vão ser os mesmo dos da API.
export type FormData = {
    latlng: [string, string];
    mec_tp_localizacao: string;
    loc_endereco: string;
    loc_cep: string;
    da_porteira: boolean;
    da_mataburro: boolean;
    da_colchete: boolean;
    da_atoleiro: boolean;
    da_ponterustica: boolean;
    nome: string;
    cpf: string;
    data_nascimento: string;
    nome_responsavel: string;
    telefone_responsavel: string;
    grau_responsavel: string;
    sexo: string;
    cor: string;
    def_caminhar: boolean;
    def_ouvir: boolean;
    def_enxergar: boolean;
    def_mental: boolean;
    escola: string;
    rota: string;
    turno: string;
    nivel: string;
};

const defaultValues: FormData = {
    latlng: ["", ""],
    mec_tp_localizacao: "",
    loc_endereco: "",
    loc_cep: "",
    da_porteira: false,
    da_mataburro: false,
    da_colchete: false,
    da_atoleiro: false,
    da_ponterustica: false,
    nome: "",
    cpf: "",
    data_nascimento: "",
    nome_responsavel: "",
    telefone_responsavel: "",
    grau_responsavel: "",
    sexo: "",
    cor: "",
    def_caminhar: false,
    def_ouvir: false,
    def_enxergar: false,
    def_mental: false,
    escola: "",
    rota: "",
    turno: "",
    nivel: "",
};

function getBody(data: FormData): Aluno {
    return {
        loc_latitude: data.latlng[0],
        loc_longitude: data.latlng[1],
        loc_endereco: data.loc_endereco,
        loc_cep: data.loc_cep,
        mec_tp_localizacao: Number(data.mec_tp_localizacao),
        da_porteira: data.da_porteira ? "S" : "N",
        da_mataburro: data.da_mataburro ? "S" : "N",
        da_colchete: data.da_colchete ? "S" : "N",
        da_atoleiro: data.da_atoleiro ? "S" : "N",
        da_ponterustica: data.da_ponterustica ? "S" : "N",
        nome: data.nome,
        cpf: data.cpf.replace(/\./g, "").replace(/-/g, ""),
        data_nascimento: data.data_nascimento,
        nome_responsavel: data.nome_responsavel,
        telefone_responsavel: data.telefone_responsavel,
        grau_responsavel: Number(data.grau_responsavel),
        sexo: Number(data.sexo),
        cor: Number(data.cor),
        def_caminhar: data.def_caminhar ? "S" : "N",
        def_ouvir: data.def_ouvir ? "S" : "N",
        def_enxergar: data.def_enxergar ? "S" : "N",
        def_mental: data.def_mental ? "S" : "N",
        turno: Number(data.turno),
        nivel: Number(data.nivel),
        id_escola: Number(data.escola),
        id_rota: Number(data.rota),
    };
}
// Busca dados do backend e os transforma em dados do formulário react
//function getFields(data: Aluno): FormData {}

export { localizacaoSchema, dadosPessoaisSchema, dadosEscolaresSchema, defaultValues, getBody };
