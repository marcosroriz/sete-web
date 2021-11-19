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

const dadosInstitucionaisSchema = yup.object().shape({
    nome: yup.string().required("Esse campo é obrigatório"),
    telefone: yup.lazy((value) =>
        !value
            ? yup.string()
            : yup
                  .string()
                  .matches(/^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/, "Deve ser um telefone"),
    ),
    cnpj: yup
        .string()
        .matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, "Esse campo deve ser um cpf ou um cnpj válido")
        .required("Esse campo é obrigatório"),
    ramo: yup.array().of(yup.boolean()).test("atLeastOne", "Pelo menos um valor deve ser informado", handleAtLeastOne),
});

export { dadosInstitucionaisSchema };
