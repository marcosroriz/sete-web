import React from "react";
import { EscolaListObj, EscolaTableField } from "entities/Escola";
import { FaUserAlt, FaSearch, FaEdit, FaRegTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

class EscolasTableHelper {
    public treatData(data: EscolaListObj[]): EscolaTableField[] {
        return data.map((escolaObj) => ({
            nome: escolaObj.nome,
            localizacao: "Rural - Urbano",
            gps: escolaObj.loc_latitude && escolaObj.loc_longitude ? "Sim" : "Não",
            nivel: [
                escolaObj.ensino_pre_escola === "S" ? "Infantil" : "",
                escolaObj.ensino_fundamental === "S" ? "Fundamental" : "",
                escolaObj.ensino_medio === "S" ? "Médio" : "",
                escolaObj.ensino_superior === "S" ? "Superior" : "",
            ]
                .filter((val) => val !== "")
                .join(", "),
            horario_funcionamento: [
                escolaObj.horario_matutino === "S" ? "Manhã" : "",
                escolaObj.horario_vespertino === "S" ? "Tarde" : "",
                escolaObj.horario_noturno === "S" ? "Noite" : "",
            ]
                .filter((val) => val !== "")
                .join(", "),
            qtd_alunos: escolaObj.qtd_alunos,
            acoes: this.acoesComponent(escolaObj),
        }));
    }

    public acoesComponent(escolaObj: EscolaListObj) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Link
                    to={`/alunos/gerenciar/visualizar/${escolaObj.id_escola}`}
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
                    to={`/alunos/gerenciar/editar/${escolaObj.id_escola}`}
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

const escolasTableHelper = new EscolasTableHelper();

export { escolasTableHelper, EscolasTableHelper };
