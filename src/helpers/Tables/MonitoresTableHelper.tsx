import React from "react";
import { MonitorListObj, MonitorTableField } from "entities/Monitor";
import { Link } from "react-router-dom";
import { FaUserAlt, FaSearch, FaEdit, FaRegTimesCircle } from "react-icons/fa";

type AdditionalOptions = {
    delete: (escola: MonitorListObj) => Promise<void>;
};

class MonitoresTableHelper {
    public treatData(data: MonitorListObj[], addOptions?: AdditionalOptions): MonitorTableField[] {
        return data.map((monitorObj) => ({
            nome: monitorObj.nome || "-",
            telefone: monitorObj.telefone || "-",
            turno: [monitorObj.turno_manha ? "Manhã" : "", monitorObj.turno_tarde ? "Tarde" : "", monitorObj.turno_noite ? "Noite" : ""]
                .map((item) => item)
                .join(", "),
            acoes: this.acoesComponent(monitorObj, addOptions),
        }));
    }

    public acoesComponent(monitorObj: MonitorListObj, addOptions?: AdditionalOptions) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Link
                    to={`/monitores/gerenciar/visualizar/${monitorObj.cpf}`}
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
                    to={`/Monitores/gerenciar/editar/${monitorObj.cpf}`}
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
                    onClick={() => addOptions?.delete(monitorObj)}
                >
                    <FaRegTimesCircle size={"17px"} color={"red"} />
                </button>
            </div>
        );
    }
}

const monitoresTableHelper = new MonitoresTableHelper();

export { monitoresTableHelper, MonitoresTableHelper };
