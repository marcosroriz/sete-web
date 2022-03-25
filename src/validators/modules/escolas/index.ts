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

export { localizacaoSchema, dadosBasicosSchema, dadosEscolaresSchema };
