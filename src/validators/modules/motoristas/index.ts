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

const dadosPessoaisSchema = yup.object().shape({
    nome: yup.string().required("Esse campo é obrigatório"),
    cpf: yup
        .string()
        .matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, "Esse campo deve ser um cpf válido")
        .required("Esse campo é obrigatório"),
    telefone: yup.lazy((value) =>
        !value
            ? yup.string()
            : yup
                  .string()
                  .matches(/^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/, "Deve ser um telefone"),
    ),
    nascimento: yup
        .string()
        .matches(/^\d{2}\/\d{2}\/\d{4}/, "Esse campo deve ser valido")
        .required("Esse campo é obrigatório"),
    sexo: yup.string().required("Esse campo é obrigatório").nullable(true),
    arquivos: yup.array().max(3, "Apenas 3 devem ser informados"),
});

const dadosTransportesSchema = yup.object().shape({
    numero_cnh: yup.string().required("Esse campo é obrigatório"),
    vencimento_cnh: yup.lazy((value) => (!value ? yup.string() : yup.string().matches(/^\d{2}\/\d{2}\/\d{4}/, "Esse campo deve ser valido"))),
    tipo_cnh: yup.array().of(yup.boolean()).test("atLeastOne", "Pelo menos um valor deve ser informado", handleAtLeastOne),
    turno: yup.array().of(yup.boolean()).test("atLeastOne", "Pelo menos um valor deve ser informado", handleAtLeastOne),
});

export { dadosPessoaisSchema, dadosTransportesSchema };
