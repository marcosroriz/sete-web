import * as yup from "yup";

const updateUserSchema = yup.object().shape({
    nome: yup.string().required("Esse campo é obrigatório"),
    telefone: yup
        .string()
        .matches(/\(\d{2}\)\s\d{4,5}\-\d{4}/, "Esse campo deve ser um telefone válido")
        .required("Esse campo é obrigatório"),
});

const updatePasswordSchema = yup.object().shape({
    senha_atual: yup.string().required("Digite sua senha atual"),
    nova_senha: yup.string().required("Digite sua nova senha"),
});

export { updateUserSchema, updatePasswordSchema };
