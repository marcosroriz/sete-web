import React from "react";

import { AlunoListObj, AlunosTableField } from "entities/Aluno";
import { Link } from "react-router-dom";
import { FaEdit, FaRegTimesCircle, FaSearch, FaUserAlt } from "react-icons/fa";

class AlunosTableHelper {
    public treatData(data: AlunoListObj[]): AlunosTableField[] {
        return data.map((alunoObj) => ({
            escola: alunoObj.escola,
            rota: alunoObj.rota,
            nome: alunoObj.nome,
            localizacao: "-",
            gps: alunoObj.loc_latitude && alunoObj.log_longitude ? "Sim" : "Não",
            nivel: alunoObj.nivel.toString(),
            turno: alunoObj.turno.toString(),
            acoes: this.acoesComponent(alunoObj),
        }));
    }

    public acoesComponent(alunoObj: AlunoListObj) {
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
                    onClick={() => console.log("Clicou4")}
                >
                    <FaRegTimesCircle size={"17px"} color={"red"} />
                </button>
            </div>
        );
    }
}

const alunosTableHelper = new AlunosTableHelper();

export { alunosTableHelper, AlunosTableHelper };
