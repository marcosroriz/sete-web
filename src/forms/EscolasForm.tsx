import { Escola } from "entities/Escola";
import * as yup from "yup";

const handleAtLeastOne: yup.TestFunction<(boolean | undefined)[] | undefined, {}> = (arr) => {
    if (!arr) {
        return false;
    }
    let arrLength = arr.length;
    arr.forEach((arrItem) => {
        if (!arrItem) arrLength--;
    });
    return arrLength > 0;
};

const localizacaoSchema = yup.object().shape({
    mec_co_uf: yup.string().required("Esse campo é obrigatório"),
    mec_co_municipio: yup.string().required("Esse campo é obrigatório"),
    mec_tp_localizacao: yup.string().required("Esse campo é obrigatório").nullable(true),
    mec_tp_localizacao_diferenciada: yup.string().required("Esse campo é obrigatório").nullable(true),
});

const dadosBasicosSchema = yup.object().shape({
    nome: yup.string().required("Esse campo é obrigatório"),
    contato_telefone: yup.lazy((value) =>
        !value
            ? yup.string()
            : yup
                  .string()
                  .matches(/^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/, "Deve ser um telefone"),
    ),
    contato_email: yup.string().email("Deve ser um email"),
    mec_tp_dependencia: yup.string().required("Esse campo é obrigatório").nullable(true),
});

const dadosEscolaresSchema = yup.object().shape({
    mec_in: yup.array().of(yup.boolean()).test("atLeastOne", "Pelo menos um valor deve ser informado", handleAtLeastOne),
    ensino: yup.array().of(yup.boolean()).test("atLeastOne", "Pelo menos um valor deve ser informado", handleAtLeastOne),
    horario: yup.array().of(yup.boolean()).test("atLeastOne", "Pelo menos um valor deve ser informado", handleAtLeastOne),
});

export type FormData = {
    latlng: [string, string];
    mec_co_uf: string;
    mec_co_municipio: string;
    loc_endereco: string;
    loc_cep: string;
    mec_tp_localizacao: string;
    mec_tp_localizacao_diferenciada: string;
    mec_tp_dependencia: string;
    nome: string;
    contato_responsavel: string;
    contato_telefone: string;
    contato_email: string;
    mec_in: boolean[];
    ensino: boolean[];
    horario: boolean[];
};

const defaultValues: FormData = {
    latlng: ["", ""],
    mec_co_uf: "",
    mec_co_municipio: "",
    loc_endereco: "",
    loc_cep: "",
    mec_tp_localizacao: "",
    mec_tp_localizacao_diferenciada: "",
    mec_tp_dependencia: "",
    nome: "",
    contato_responsavel: "",
    contato_telefone: "",
    contato_email: "",
    mec_in: [false, false, false, false],
    ensino: [false, false, false, false],
    horario: [false, false, false],
};

function getBody(data: FormData): Escola {
    return {
        loc_latitude: data.latlng[0],
        loc_longitude: data.latlng[1],
        mec_co_uf: Number(data.mec_co_uf),
        mec_co_municipio: Number(data.mec_co_municipio),
        mec_no_entidade: data.nome,
        loc_endereco: data.loc_endereco,
        loc_cep: data.loc_cep,
        mec_tp_localizacao: Number(data.mec_tp_localizacao),
        mec_tp_localizacao_diferenciada: Number(data.mec_tp_localizacao_diferenciada),
        mec_tp_dependencia: Number(data.mec_tp_dependencia),
        nome: data.nome,
        contato_responsavel: data.contato_responsavel,
        contato_telefone: data.contato_telefone,
        contato_email: data.contato_email,
        mec_in_regular: data.mec_in[0] ? "S" : "N",
        mec_in_eja: data.mec_in[1] ? "S" : "N",
        mec_in_profissionalizante: data.mec_in[2] ? "S" : "N",
        mec_in_especial_exclusiva: data.mec_in[3] ? "S" : "N",
        ensino_pre_escola: data.ensino[0] ? "S" : "N",
        ensino_fundamental: data.ensino[1] ? "S" : "N",
        ensino_medio: data.ensino[2] ? "S" : "N",
        ensino_superior: data.ensino[3] ? "S" : "N",
        horario_matutino: data.horario[0] ? "S" : "N",
        horario_vespertino: data.horario[1] ? "S" : "N",
        horario_noturno: data.horario[2] ? "S" : "N",
    };
}
// Busca dados do backend e os transforma em dados do formulário react
//function getFields(data: Escola): FormData {}

export { localizacaoSchema, dadosBasicosSchema, dadosEscolaresSchema, defaultValues, getBody };
