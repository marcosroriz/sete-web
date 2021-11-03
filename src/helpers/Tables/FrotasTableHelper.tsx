import React from "react";

import { Link } from "react-router-dom";
import { FaUserAlt, FaSearch, FaEdit, FaRegTimesCircle } from "react-icons/fa";
import { VeiculoListObj, VeiculoTableField } from "entities/Veiculo";

class FrotasTableHelper {
    public treatData(data: VeiculoListObj[]): VeiculoTableField[] {
        return data.map((frotaObj) => ({
            ...frotaObj,
            acoes: this.acoesComponent(frotaObj),
        }));
    }
    public acoesComponent(frotaObj: VeiculoListObj) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Link
                    to={`/alunos/gerenciar/visualizar/${frotaObj.id_veiculo}`}
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
                    to={`/alunos/gerenciar/editar/${frotaObj.id_veiculo}`}
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

const frotasTableHelper = new FrotasTableHelper();

export { frotasTableHelper, FrotasTableHelper };
