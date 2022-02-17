import React from "react";
import { AlunoListObj, AlunosListRota } from "entities/Aluno";

class AlunosListHelper {
    public treatData(data: AlunoListObj[]): AlunosListRota[] {
        return data.map((alunoObj) => ({
            label: alunoObj.nome,
            value: alunoObj.id_aluno.toString(),
        }));
    }
}

const alunosListHelper = new AlunosListHelper();

export { alunosListHelper, AlunosListHelper };
