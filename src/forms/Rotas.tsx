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
    tipo: string;
    turno: boolean[];
    obstaculos: boolean[];
    km: string;
    tempo: string;
    hora_ida_inicio: string;
    hora_ida_termino: string;
    hora_volta_inicio: string;
    hora_volta_termino: string;
    alunos: number[];
    escolas: number[];
};

const defaultValues: FormData = {
    nome: "",
    tipo: "",
    turno: [false, false, false],
    obstaculos: [false, false, false, false, false],
    km: "",
    tempo: "",
    hora_ida_inicio: "",
    hora_ida_termino: "",
    hora_volta_inicio: "",
    hora_volta_termino: "",
    alunos: [],
    escolas: [],
};
// Busca dados do backend e os transforma em dados do formulário react
function getBody(data: FormData): Rotas {
    return {
        nome: data.nome,
        tipo: Number(data.tipo),
        turno_matutino: data.turno[0] ? "S" : "N",
        turno_vespertino: data.turno[1] ? "S" : "N",
        turno_noturno: data.turno[2] ? "S" : "N",
        da_porteira: data.obstaculos[0] ? "S" : "N",
        da_mataburro: data.obstaculos[1] ? "S" : "N",
        da_colchete: data.obstaculos[2] ? "S" : "N",
        da_atoleiro: data.obstaculos[3] ? "S" : "N",
        da_ponterustica: data.obstaculos[4] ? "S" : "N",
        km: Number(data.km),
        tempo: Number(data.tempo),
        hora_ida_inicio: data.hora_ida_inicio,
        hora_ida_termino: data.hora_ida_termino,
        hora_volta_inicio: data.hora_volta_inicio,
        hora_volta_termino: data.hora_volta_termino,
        // Falta Implementação
        shape: "",
    };
}

export { defaultValues, getBody };
