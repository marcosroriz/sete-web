import { Fornecedor } from "entities/Fornecedor";
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
    cnpj: yup.string().required("Esse campo é obrigatório"),
    ramo: yup.array().of(yup.boolean()).test("atLeastOne", "Pelo menos um valor deve ser informado", handleAtLeastOne),
});

export type FormData = {
    latlng: [string, string];
    loc_endereco: string;
    loc_cep: string;
    nome: string;
    telefone: string;
    cnpj: string;
    ramo: boolean[];
};

const defaultValues: FormData = {
    latlng: ["", ""],
    loc_endereco: "",
    loc_cep: "",
    nome: "",
    telefone: "",
    cnpj: "",
    ramo: [false, false, false],
    // ramo_mecanica: false,
    // ramo_combustivel: false,
    // ramo_seguro: false,
};

function getBody(data: FormData): Fornecedor {
    return {
        cnpj: data.cnpj,
        nome: data.nome,
        ramo_mecanica: data.ramo[0] ? "S" : "N",
        ramo_combustivel: data.ramo[1] ? "S" : "N",
        ramo_seguro: data.ramo[2] ? "S" : "N",
        loc_latitude: data.latlng[0],
        loc_longitude: data.latlng[1],
        loc_endereco: data.loc_endereco,
        loc_cep: data.loc_cep,
        telefone: data.telefone,
    };
}

export { dadosInstitucionaisSchema, defaultValues, getBody };
