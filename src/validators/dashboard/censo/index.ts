import * as yup from "yup";

const baseDadosSchema = yup.object().shape({
    arquivo: yup.mixed().required("Esse campo é obrigatório").nullable(true),
});

const importarSchema = yup.object().shape({
    selecionado: yup.array().min(1, "Pelo menos um deve ser informado"),
});

export { baseDadosSchema, importarSchema };
