import React from "react";

import { AlunoListObj, AlunosTableField } from "entities/Aluno";
import { Link } from "react-router-dom";
import { FaEdit, FaRegTimesCircle, FaSearch, FaUserAlt } from "react-icons/fa";

type AdditionalOptions = {
    delete: (escola: AlunoListObj) => Promise<void>;
};

class AlunosTableHelper {
    public treatData(data: AlunoListObj[], addOptions?: AdditionalOptions): AlunosTableField[] {
        return data.map((alunoObj) => ({
            escola: alunoObj.escola,
            rota: alunoObj.rota,
            nome: alunoObj.nome,
            localizacao: alunoObj.mec_tp_localizacao == 1 ? "Urbana" : alunoObj.mec_tp_localizacao == 2 ? "Rural" : "-",
            gps: alunoObj.loc_latitude === null ? "Não" : alunoObj.log_longitude === null ? "Não" : "Sim",
            nivel:
                alunoObj.nivel === 1
                    ? "Infantil"
                    : alunoObj.nivel === 2
                    ? "Fundamental"
                    : alunoObj.nivel === 3
                    ? "Médio"
                    : alunoObj.nivel === 4
                    ? "Superior"
                    : alunoObj.nivel === 5
                    ? "Outro"
                    : "Não informado",
            turno:
                alunoObj.turno === 1
                    ? "Matutino"
                    : alunoObj.turno === 2
                    ? "Vespertino"
                    : alunoObj.turno === 3
                    ? "Integral"
                    : alunoObj.turno === 4
                    ? "Noturno"
                    : "Não informado",
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
                    onClick={() => addOptions?.delete(alunoObj)}
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

const alunosTableHelper = new AlunosTableHelper();

export { alunosTableHelper, AlunosTableHelper };
