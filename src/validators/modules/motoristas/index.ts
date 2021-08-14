import * as yup from "yup";

export const dadosPessoaisSchema = yup.object().shape({
    nome: yup.string().required("Esse campo é obrigatório"),
    cpf: yup
        .string()
        .matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, "Esse campo deve ser um cpf válido")
        .required("Esse campo é obrigatório"),
    nascimento: yup
        .string()
        .matches(/^\d{2}\/\d{2}\/\d{4}/, "Esse campo deve ser valido")
        .required("Esse campo é obrigatório"),
    sexo: yup.string().required("Esse campo é obrigatório").nullable(true),
});

export const dadosTransportesSchema = yup.object().shape({
    cnh: yup
        .string()
        .matches(/\(\d{2}\)\s\d{4,5}\-\d{4}/, "Esse campo deve ser um telefone válido")
        .required("Esse campo é obrigatório"),
    vencimento_cnh: yup
        .string()
        .matches(/^\d{2}\/\d{2}\/\d{4}/, "Esse campo deve ser valido")
        .required("Esse campo é obrigatório"),
});
