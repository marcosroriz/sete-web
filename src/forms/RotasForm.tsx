import * as yup from "yup";

const importRotaSchema = yup.object().shape({
    arquivo: yup.mixed().required("Esse campo é obrigatório").nullable(true),
});

const gpxRouteSchema = yup.object().shape({
    gpx: yup.object(),
});

const saveRouteSchema = yup.object().shape({
    rota: yup.string(),
});

export { importRotaSchema, gpxRouteSchema, saveRouteSchema };
