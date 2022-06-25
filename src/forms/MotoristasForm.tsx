import { Motorista } from "entities/Motorista";
import { FileData } from "entities/FileData";
import * as yup from "yup";

/**
 * Essa função serve como um helper para validar campos de checkbox com yup
 * @param {(boolean | undefined)[]} arr
 * @returns {boolean}
 */
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
    data_nascimento: yup
        .string()
        .matches(/^\d{2}\/\d{2}\/\d{4}/, "Esse campo deve ser valido")
        .required("Esse campo é obrigatório"),
    sexo: yup.string().required("Esse campo é obrigatório").nullable(true),
    arquivos: yup.array().max(3, "Apenas 3 devem ser informados"),
});

const dadosTransportesSchema = yup.object().shape({
    cnh: yup.string().required("Esse campo é obrigatório"),
    data_validade_cnh: yup.lazy((value) => (!value ? yup.string() : yup.string().matches(/^\d{2}\/\d{2}\/\d{4}/, "Esse campo deve ser valido"))),
    tipo_cnh: yup.array().of(yup.boolean()).test("atLeastOne", "Pelo menos um valor deve ser informado", handleAtLeastOne),
    turno: yup.array().of(yup.boolean()).test("atLeastOne", "Pelo menos um valor deve ser informado", handleAtLeastOne),
});

export type FormData = {
    nome: string;
    cpf: string;
    data_nascimento: string;
    ant_criminais: string;
    sexo: string;
    telefone: string;
    cnh: string;
    data_validade_cnh: string;
    vinculo: string;
    salario: string;
    tipo_cnh: boolean[];
    turno: boolean[];
    arquivos: FileData[];
};

const defaultValues = {
    nome: "",
    cpf: "",
    data_nascimento: "",
    ant_criminais: "",
    sexo: "",
    telefone: "",
    cnh: "",
    data_validade_cnh: "",
    vinculo: "",
    salario: "",
    tipo_cnh: [false, false, false, false],
    turno: [false, false, false],
};

function getBody(data: FormData): Motorista {
    return {
        nome: data.nome,
        cpf: data.cpf.replace(/[-.]/g, ""),
        ant_criminais: data.ant_criminais,
        data_nascimento: data.data_nascimento,
        sexo: Number(data.sexo),
        telefone: data.telefone,
        vinculo: Number(data.vinculo),
        salario: Number(data.salario),
        cnh: data.cnh.replace(/[-]/g, ""),
        data_validade_cnh: data.data_validade_cnh,
        turno_manha: data.turno[0] ? "S" : "N",
        turno_tarde: data.turno[1] ? "S" : "N",
        turno_noite: data.turno[2] ? "S" : "N",
        tem_cnh_a: data.tipo_cnh[0] ? "S" : "N",
        tem_cnh_b: data.tipo_cnh[1] ? "S" : "N",
        tem_cnh_c: data.tipo_cnh[2] ? "S" : "N",
        tem_cnh_d: data.tipo_cnh[3] ? "S" : "N",
        tem_cnh_e: data.tipo_cnh[4] ? "S" : "N",
    };
}

export { dadosPessoaisSchema, dadosTransportesSchema, defaultValues, getBody };
