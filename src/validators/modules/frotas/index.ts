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
    ano: yup.lazy((value) => {
        if (!value) {
            return yup.string().required("Esse campo é obrigatório");
        }
        return yup.number().min(1950, "Mínimo 1950 - Máximo 2050").max(2050, "Mínimo 1950 - Máximo 2050");
    }),
    origem: yup.string().required("Esse campo é obrigatório").nullable(true),
});

const detalhesVeiculoSchema = yup.object().shape({
    placa: yup
        .string()
        .required("Esse campo é obrigatório")
        .matches(/^[a-zA-Z]{3}-[0-9]{4}$/, "Deve ser no formato AAA-0000"),
    km_inicial: yup.lazy((value) => {
        if (!value) {
            return yup.string();
        }
        return yup.number().required("Esse campo é obrigatório");
    }),
    km_atual: yup.lazy((value) => {
        if (value === "") {
            return yup.string();
        }
        return yup.number().required("Esse campo é obrigatório");
    }),
    capacidade: yup.lazy((value) => {
        if (value === "") {
            return yup.string().required("Esse campo é obrigatório");
        }
        return yup.number().required("Esse campo é obrigatório");
    }),
});

export { dadosBasicosSchema, detalhesVeiculoSchema };
