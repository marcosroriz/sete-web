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
    turno: yup.string().required("Esse campo é obrigatório").nullable(true),
    nivel: yup.string().required("Esse campo é obrigatório").nullable(true),
});

export { localizacaoSchema, dadosPessoaisSchema, dadosEscolaresSchema };
