import * as yup from "yup";

const loginSchema = yup.object().shape({
    email: yup.string().required("Por favor digite seu endereço de e-mail").email("Digite um endereço de e-mail válido"),
    senha: yup.string().required("Por favor digite sua senha"),
});

const recuperarsenhaSchema = yup.object().shape({
    email: yup.string().required("Por favor digite seu endereço de e-mail").email("Digite um endereço de e-mail válido"),
});

const registrarSchema = yup.object().shape({
    nome: yup.string().required("Esse campo é obrigatório"),
    cpf: yup
        .string()
        .matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, "Esse campo deve ser um cpf válido")
        .required("Esse campo é obrigatório"),
    telefone: yup
        .string()
        .matches(/\(\d{2}\)\s\d{4,5}\-\d{4}/, "Esse campo deve ser um telefone válido")
        .required("Esse campo é obrigatório"),
    email_reg: yup.string().email("Esse campo deve ser um email válido").required("Esse campo é obrigatório"),
    rep_email_reg: yup.string().email("Esse campo deve ser um email válido").required("Esse campo é obrigatório"),
    senha_reg: yup.string().required("Esse campo é obrigatório"),
    rep_senha_reg: yup.string().oneOf([yup.ref("senha_reg"), null], "As senhas devem ser iguais"),
    estado: yup.string().required("Esse campo é obrigatório"),
    municipio: yup.string().required("Esse campo é obrigatório"),
});

export { loginSchema, recuperarsenhaSchema, registrarSchema };
