import { Admin } from "entities/Admins";
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

const dadosUsuarioSchema = yup.object().shape({
    nome: yup.string().required("Esse campo é obrigatório"),
    cpf: yup
        .string()
        .matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, "Esse campo deve ser um cpf válido")
        .required("Esse campo é obrigatório"),
    telefone: yup
        .string()
        .matches(/^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/, "Deve ser um telefone válido")
        .required("Esse campo é obrigatório"),
    email: yup.string().required("Esse campo é obrigatório"),
    senha: yup
        .string()
        .required("Esse campo é obrigatório")
        .matches(/\w{6,}/i, "Deve ter no mínimo 6 dígitos"),
});

export type FormData = {
    id_admin?: string;
    nome: string;
    sexo: string;
    email?: string;
    cpf?: string;
    id_escola?: number;
    telefone?: string;
    senha?: string;
    papel_usuario?: string;
};

const defaultValues: FormData = {
    id_admin: "",
    nome: "",
    email: "",
    sexo: "",
    cpf: "",
    telefone: "",
    senha: "",
    papel_usuario: "",
};

function getBody(data: FormData): Admin {
    return {
        id_admin: data.id_admin,
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        cpf: data.cpf,
        senha: data.senha,
        papel_usuario: data.papel_usuario,
    };
}

export { dadosUsuarioSchema, defaultValues, getBody };
