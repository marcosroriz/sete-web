import { Rotas } from "entities/Rotas";
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

const importRotaSchema = yup.object().shape({
    arquivo: yup.mixed().required("Esse campo é obrigatório").nullable(true),
});

const gpxRouteSchema = yup.object().shape({
    gpx: yup.object(),
});

const saveRouteSchema = yup.object().shape({
    rota: yup.string(),
});

export type FormData = {
    nome: string;
    tipo_rotas: string;
    turno: boolean[];
    obstaculos: boolean[];
    quilometragem: string;
    tempo_estimado: string;
    hora_ida_inicio: string;
    hora_ida_termino: string;
    hora_volta_inicio: string;
    hora_volta_termino: string;
    alunos: number[];
    escolas: number[];
};

export const formData = {
    nome: "",
    tipo_rotas: "",
    turno: [false, false, false],
    obstaculos: [false, false, false, false, false],
    quilometragem: "",
    tempo_estimado: "",
    hora_ida_inicio: "",
    hora_ida_termino: "",
    hora_volta_inicio: "",
    hora_volta_termino: "",
    alunos: [],
    escolas: [],
};
// Busca dados do backend e os transforma em dados do formulário react
//function getFields(data: Escola): FormData {}
