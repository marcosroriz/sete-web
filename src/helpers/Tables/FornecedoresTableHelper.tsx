import React from "react";

import { FornecedorListObj, FornecedorTableField } from "entities/Fornecedor";
import { Link } from "react-router-dom";
import { FaEdit, FaRegTimesCircle, FaSearch, FaUserAlt } from "react-icons/fa";

type AdditionalOptions = {
    delete: (escola: FornecedorListObj) => Promise<void>;
};

class FornecedoresTableHelper {
    public treatData(data: FornecedorListObj[], addOptions?: AdditionalOptions): FornecedorTableField[] {
        return data.map((fornecedorObj) => ({
            nome: fornecedorObj.nome,
            telefone: fornecedorObj.telefone,
            servicos_oferecidos: [
                fornecedorObj.ramo_mecanica === "S" ? "Mecânica" : "",
                fornecedorObj.ramo_combustivel === "S" ? "Combustível" : "",
                fornecedorObj.ramo_seguro === "S" ? "Seguro" : "",
            ]
                .filter((val) => val !== "")
                .join(", "),
            numero_servicos: 1,
            acoes: this.acoesComponent(fornecedorObj, addOptions),
        }));
    }

    public acoesComponent(fornecedorObj: FornecedorListObj, addOptions?: AdditionalOptions) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Link
                    to={`/alunos/gerenciar/visualizar/${fornecedorObj.nome}`}
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
                    to={`/alunos/gerenciar/editar/${fornecedorObj.nome}`}
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
                    onClick={() => addOptions?.delete(fornecedorObj)}
                >
                    <FaRegTimesCircle size={"17px"} color={"red"} />
                </button>
            </div>
        );
    }
}

const fornecedoresTableHelper = new FornecedoresTableHelper();

export { fornecedoresTableHelper, FornecedoresTableHelper };
