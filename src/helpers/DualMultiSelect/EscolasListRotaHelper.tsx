import React from "react";
import { EscolaListRota, EscolaListObj } from "entities/Escola";

class EscolasListHelper {
    public treatData(data: EscolaListObj[]): EscolaListRota[] {
        return data.map((escolaObj) => ({
            label: escolaObj.nome,
            value: escolaObj.id_escola.toString(),
        }));
    }
}

const escolasListHelper = new EscolasListHelper();

export { escolasListHelper, EscolasListHelper };
