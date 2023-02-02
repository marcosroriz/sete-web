import { Norma } from "entities/Norma";
import * as yup from "yup";

// Nem sempre os dados do formulário vão ser os mesmo dos da API.
export type FormData = {
    id_tipo: string;
    titulo: string;
    tipo_veiculo: string;
    id_assunto: string[];
    outro_assunto: string;
    outro_tipo: string;
    data_norma: string;
};

const defaultValues: FormData = {
    id_tipo: "",
    titulo: "",
    tipo_veiculo: "",
    id_assunto: [],
    outro_assunto: "",
    outro_tipo: "",
    data_norma: "",
};

function getBody(data: FormData): Norma {
    return {
        id_tipo: Number(data.id_tipo),
        titulo: data.titulo,
        tipo_veiculo: Number(data.tipo_veiculo),
        id_assunto: data.id_assunto.map(function (str) {
            return parseInt(str);
        }),
        outro_assunto: data.outro_assunto,
        outro_tipo: data.outro_tipo,
        data_norma: data.data_norma,
    };
}
// Busca dados do backend e os transforma em dados do formulário react
//function getFields(data: Aluno): FormData {}

export { defaultValues, getBody };
