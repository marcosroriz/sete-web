import React from "react";
import { Link } from "react-router-dom";

import { FaUserAlt, FaSearch, FaEdit, FaRegTimesCircle } from "react-icons/fa";

import { VeiculoTableField } from "entities/Veiculo";

class FrotasTableHelper {
    public treatData(data: VeiculoTableField[]): any[] {
        return data.map((frota) => {
            return {
                ...frota,
                acoes: (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Link
                            to={`/frotas/gerenciar/visualizar/${frota.id_veiculo}`}
                            style={{
                                display: "block",
                                marginBottom: "-2px",
                                border: "none",
                                backgroundColor: "transparent",
                                cursor: "pointer",
                            }}
                            onClick={() => console.log("Clicou2")}
                        >
                            <FaSearch size={"16px"} color={"gray"} />
                        </Link>
                        <Link
                            to={`/frotas/gerenciar/editar/${frota.id_veiculo}`}
                            style={{
                                display: "block",
                                marginLeft: "6px",
                                border: "none",
                                backgroundColor: "transparent",
                                cursor: "pointer",
                            }}
                            onClick={() => console.log("Clicou3")}
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
                ),
            };
        });
    }
}

const frotasTableHelper = new FrotasTableHelper();

export { frotasTableHelper, FrotasTableHelper };
