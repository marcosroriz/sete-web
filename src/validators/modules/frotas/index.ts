import * as yup from "yup";

const dadosBasicosSchema = yup.object().shape({
    modo: yup.string().required("Esse campo é obrigatório").nullable(true),
    tipo: yup.object({ label: yup.string(), value: yup.string() }).test("checkSelect", "Esse campo é obrigatório", (option) => {
        if (!option) {
            return false;
        }
        return !!option.value;
    }),
    marca: yup.object({ label: yup.string(), value: yup.string() }).test("checkSelect", "Esse campo é obrigatório", (option) => {
        if (!option) {
            return false;
        }
        return !!option.value;
    }),
    aquisicao: yup.lazy((value) => {
        if (!value) {
            return yup.string().required("Esse campo é obrigatório");
        }
        return yup.number().min(1950, "Mínimo 1950 - Máximo 2050").max(2050, "Mínimo 1950 - Máximo 2050");
    }),
    origem: yup.string().required("Esse campo é obrigatório").nullable(true),
});

const detalhesEnvioSchema = yup.object().shape({
    placa: yup
        .string()
        .required("Esse campo é obrigatório")
        .matches(/^[a-zA-Z]{3}-[0-9]{4}$/, "Deve ser no formato AAA-0000"),
    renavam: yup.string().required("Esse campo é obrigatório"),
    capacidade: yup.string().required("Esse campo é obrigatório"),
    manutencao: yup.string().required("Esse campo é obrigatório").nullable(true),
});

export { dadosBasicosSchema, detalhesEnvioSchema };
