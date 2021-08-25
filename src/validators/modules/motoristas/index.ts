import * as yup from "yup";

export const dadosPessoaisSchema = yup.object().shape({
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
});

const tipo_cnh_schema = yup.object().shape({ a: yup.boolean(), b: yup.boolean(), c: yup.boolean(), d: yup.boolean(), e: yup.boolean() });
const turno_schema = yup.object().shape({ manha: yup.boolean(), tarde: yup.boolean(), noite: yup.boolean() });

export const dadosTransportesSchema = yup.object().shape({
    numero_cnh: yup.string().required("Esse campo é obrigatório"),
    vencimento_cnh: yup.lazy((value) => (!value ? yup.string() : yup.string().matches(/^\d{2}\/\d{2}\/\d{4}/, "Esse campo deve ser valido"))),
    tipo_cnh: tipo_cnh_schema.test("atLeastOneChecked", "Pelo menos um deve ser selecionado", (obj) => {
        if (obj.a || obj.b || obj.c || obj.d || obj.e) {
            return true;
        }
        return false;
    }),
    turno: turno_schema.test("atLeastOneChecked", "Pelo menos um valor deve ser informado", (obj) => {
        const objectEntries = Object.entries(obj);
        let objectEntriesLength = objectEntries.length;
        objectEntries.forEach(([, value]) => {
            if (!value) {
                objectEntriesLength--;
            }
        });
        return objectEntriesLength > 0;
    }),
});
