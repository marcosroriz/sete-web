import { Veiculo } from "entities/Veiculo";
import * as yup from "yup";

const dadosBasicosSchema = yup.object().shape({
    modo: yup.string().required("Esse campo é obrigatório").nullable(true),
    tipo: yup.string().required("Esse campo é obrigatório"),
    marca: yup.string().required("Esse campo é obrigatório"),
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
        .matches(/^[A-Z]{3}-[0-9]{4}$/, "Deve ser no formato AAA-0000"),
    renavam: yup.string().required("Esse campo é obrigatório"),
    km_inicial: yup.lazy((value) => {
        if (value === "") {
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
    manutencao: yup.string().required("Esse campo é obrigatório").nullable(true),
});

export type FormData = {
    modo: string;
    tipo: string;
    marca: string;
    modelo: string;
    ano: string;
    numero_pneus: string;
    vida_util_pneu: string;
    potencia: string;
    preco: string;
    origem: string;
    placa: string;
    renavam: string;
    km_atual: string;
    km_inicial: string;
    capacidade: string;
    manutencao: string;
    ipva: string;
    dpvat: string;
    seguro_anual: string;
    consumo: string;
    tipo_combustivel: string;
};

const defaultValues: FormData = {
    modo: "",
    tipo: "",
    marca: "",
    modelo: "",
    ano: "",
    numero_pneus: "",
    vida_util_pneu: "",
    potencia: "",
    preco: "",
    origem: "",
    placa: "",
    renavam: "",
    km_atual: "",
    km_inicial: "",
    capacidade: "",
    manutencao: "",
    ipva: "",
    dpvat: "",
    seguro_anual: "",
    consumo: "",
    tipo_combustivel: "",
};

function getBody(data: FormData): Veiculo {
    return {
        modo: Number(data.modo),
        tipo: Number(data.tipo),
        marca: data.marca,
        modelo: Number(data.modelo),
        ano: Number(data.ano),
        //numero_pneus: data.numero_pneus,
        //vida_util_pneu: data.vida_util_pneu,
        //potencia: data.potencia,
        //preco: data.preco,
        origem: Number(data.origem),
        placa: data.placa.replace("-", ""),
        //renavam: data.renavam,
        km_inicial: Number(data.km_inicial),
        km_atual: Number(data.km_atual),
        capacidade: Number(data.capacidade),
        //manutencao: data.manutencao,
        ipva: Number(data.ipva),
        dpvat: Number(data.dpvat),
        seguro_anual: Number(data.seguro_anual),
        consumo: Number(data.consumo),
        tipo_combustivel: data.tipo_combustivel,
    };
}
export { dadosBasicosSchema, detalhesVeiculoSchema, defaultValues, getBody };
