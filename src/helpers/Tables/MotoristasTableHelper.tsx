import React from "react";
import { MotoristaListObj, MotoristaTableField } from "entities/Motorista";
import { Link } from "react-router-dom";
import { FaUserAlt, FaSearch, FaEdit, FaRegTimesCircle } from "react-icons/fa";

class MotoristasTableHelper {
    public treatData(data: MotoristaListObj[]): MotoristaTableField[] {
        return data.map((motoristaObj) => ({
            nome: motoristaObj.nome,
            telefone: motoristaObj.telefone,
            turno: motoristaObj.turno_manha === "S" ? "Manhã" : "",
            cnh: motoristaObj.cnh,
            data_validade_cnh: motoristaObj.data_validade_cnh,
            rotas_dirigidas: ":/",
            acoes: this.acoesComponent(motoristaObj),
        }));
    }

    public acoesComponent(motoristaObj: MotoristaListObj) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Link
                    to={`/motoristas/gerenciar/visualizar/${motoristaObj.id_motorista}`}
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
                    to={`/alunos/gerenciar/editar/${motoristaObj.id_motorista}`}
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

const motoristasTableHelper = new MotoristasTableHelper();

export { motoristasTableHelper, MotoristasTableHelper };
