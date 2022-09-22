import * as yup from "yup";

const handleAtLeastOne: yup.TestFunction<(string | undefined)[] | undefined, {}> = (arr) => {
    if (!arr) {
        return false;
    }
    let arrLength = arr.length;
    arr.forEach((arrItem) => {
        if (arrItem != "") arrLength--;
    });
    return arrLength == 0;
};

const dadosGaragemSchema = yup.object().shape({
    latlng: yup.array().of(yup.string()).test("atLeastOne", "A Localização da Garagem (Latitude e Longitude) devem ser informadas", handleAtLeastOne),
});

export { dadosGaragemSchema };
