import React from "react";
import { EscolaTableField, EscolaListObj } from "entities/Escola";
import { FaSearch, FaEdit, FaRegTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

type AdditionalOptions = {
    delete: (escola: EscolaListObj) => Promise<void>;
};

class EscolasTableHelper {
    public treatData(data: EscolaListObj[], addOptions?: AdditionalOptions): EscolaTableField[] {
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
            acoes: this.acoesComponent(escolaObj, addOptions),
        }));
    }

    public acoesComponent(escolaObj: EscolaListObj, addOptions?: AdditionalOptions) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Link
                    to={`/escolas/gerenciar/visualizar/${escolaObj.id_escola}`}
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
                    to={`/escolas/gerenciar/editar/${escolaObj.id_escola}`}
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
                    onClick={() => addOptions?.delete(escolaObj)}
                >
                    <FaRegTimesCircle size={"17px"} color={"red"} />
                </button>
            </div>
        );
    }
}

const escolasTableHelper = new EscolasTableHelper();

export { escolasTableHelper, EscolasTableHelper };
