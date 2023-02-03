import React from "react";
import { MotoristaListObj, MotoristaTableField } from "entities/Motorista";
import { Link } from "react-router-dom";
import { FaUserAlt, FaSearch, FaEdit, FaRegTimesCircle } from "react-icons/fa";

type AdditionalOptions = {
    delete: (escola: MotoristaListObj) => Promise<void>;
};

class MotoristasTableHelper {
    public treatData(data: MotoristaListObj[], addOptions?: AdditionalOptions): MotoristaTableField[] {
        return data.map((motoristaObj) => ({
            nome: motoristaObj.nome || "-",
            telefone: motoristaObj.telefone || "-",
            turno: [motoristaObj.turno_manha ? "Manhã" : "", motoristaObj.turno_tarde ? "Tarde" : "", motoristaObj.turno_noite ? "Noite" : ""]
                .map((item) => item)
                .join(", "),
            cnh: motoristaObj.cnh || "-",
            rotas_dirigidas: "-",
            acoes: this.acoesComponent(motoristaObj, addOptions),
        }));
    }

    public acoesComponent(motoristaObj: MotoristaListObj, addOptions?: AdditionalOptions) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Link
                    to={`/motoristas/gerenciar/visualizar/${motoristaObj.cpf}`}
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
                    to={`/motoristas/gerenciar/editar/${motoristaObj.cpf}`}
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
                    onClick={() => addOptions?.delete(motoristaObj)}
                >
                    <FaRegTimesCircle size={"17px"} color={"red"} />
                </button>
            </div>
        );
    }
}

const motoristasTableHelper = new MotoristasTableHelper();

export { motoristasTableHelper, MotoristasTableHelper };
