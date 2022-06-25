import React from "react";
import { AlunoListObj, AlunosList } from "entities/Aluno";

class AlunosListHelper {
    public treatData(data: AlunoListObj[]): AlunosList[] {
        return data.map((alunoObj) => ({
            label: alunoObj.nome || "",
            value: alunoObj.id_aluno.toString(),
        }));
    }
}

const alunosListHelper = new AlunosListHelper();

export { alunosListHelper, AlunosListHelper };
