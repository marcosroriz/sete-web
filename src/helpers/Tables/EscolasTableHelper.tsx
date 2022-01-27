import React from "react";
import { Escola, EscolaTableField, EscolaListObj } from "entities/Escola";
import { FaSearch, FaEdit, FaRegTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

type AdditionalOptions = {
    delete: (escola: EscolaListObj) => Promise<void>;
};

class EscolasTableHelper {
    public treatData(data: EscolaListObj[], addOptions?: AdditionalOptions): EscolaTableField[] {
        return data.map((escolaObj) => ({
            nome: escolaObj.nome,
            localizacao: escolaObj.mec_tp_localizacao == 1 ? "Urbana" : escolaObj.mec_tp_localizacao == 2 ? "Rural" : "-",
            gps: escolaObj.loc_latitude === null ? "Não" : escolaObj.loc_longitude === null ? "Não" : "Sim",
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

    public treatDataAlunosAtendidos(data: any[]): any[] {
        return data.map((alunoObj) => ({
            nome: alunoObj.nome,
            cpf: alunoObj.cpf || "-",
            turno:
                alunoObj.turno == 1
                    ? "Matutino"
                    : alunoObj.turno == 2
                    ? "Vespertino"
                    : alunoObj.turno == 3
                    ? "Integral"
                    : alunoObj.mec_tp_dependencia == 4
                    ? "Noturno"
                    : "-",
            nivel:
                alunoObj.nivel == 1
                    ? "Infantil"
                    : alunoObj.nivel == 2
                    ? "Fundamental"
                    : alunoObj.nivel == 3
                    ? "Médio"
                    : alunoObj.nivel == 4
                    ? "Superior"
                    : alunoObj.nivel == 5
                    ? "Outro"
                    : "-",
        }));
    }
}

const escolasTableHelper = new EscolasTableHelper();

export { escolasTableHelper, EscolasTableHelper };
