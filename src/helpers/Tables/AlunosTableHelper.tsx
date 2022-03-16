import React from "react";

import { AlunoListObj, AlunosTableField, TurnoTableLabel, NivelTableLabel, MecTpLocalizacaoEnum, MecTpLocalizacaoTableLabel } from "entities/Aluno";
import { Link } from "react-router-dom";
import { FaEdit, FaRegTimesCircle, FaSearch } from "react-icons/fa";

type AdditionalOptions = {
    delete: (escola: AlunoListObj) => Promise<void>;
};

class AlunosTableHelper {
    public treatData(data: AlunoListObj[], addOptions?: AdditionalOptions): AlunosTableField[] {
        return data.map((alunoObj) => ({
            id_aluno: alunoObj.id_aluno,
            escola: alunoObj.escola,
            rota: alunoObj.rota,
            nome: alunoObj.nome,
            localizacao: MecTpLocalizacaoTableLabel.get(alunoObj.mec_tp_localizacao as MecTpLocalizacaoEnum) || "-",
            gps: !alunoObj.loc_latitude || !alunoObj.log_longitude ? "Não" : "Sim",
            nivel: NivelTableLabel.get(alunoObj.nivel) || "",
            turno: TurnoTableLabel.get(alunoObj.turno) || "",
            acoes: this.acoesComponent(alunoObj, addOptions),
        }));
    }

    public acoesComponent(alunoObj: AlunoListObj, addOptions?: AdditionalOptions) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Link
                    to={`/alunos/gerenciar/visualizar/${alunoObj.id_aluno}`}
                    style={{
                        display: "block",
                        marginBottom: "-2px",
                        border: "none",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                    }}
                >
                    <FaSearch size={"16px"} color={"gray"} />
                </Link>
                <Link
                    to={`/alunos/gerenciar/editar/${alunoObj.id_aluno}`}
                    style={{
                        display: "block",
                        marginLeft: "6px",
                        border: "none",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                    }}
                >
                    <FaEdit size={"18px"} color={"orange"} />
                </Link>
                <button
                    style={{
                        border: "none",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        addOptions?.delete(alunoObj);
                    }}
                >
                    <FaRegTimesCircle size={"17px"} color={"red"} />
                </button>
            </div>
        );
    }

    public treatDataAlunosAtendidos(data: any[]): any[] {
        return data.map((alunoObj) => ({
            nome: alunoObj.nome,
            cpf: alunoObj.cpf || "-",
            turno: TurnoTableLabel.get(alunoObj.turno),
            nivel: NivelTableLabel.get(alunoObj.nivel),
        }));
    }
}

const alunosTableHelper = new AlunosTableHelper();

export { alunosTableHelper, AlunosTableHelper };
