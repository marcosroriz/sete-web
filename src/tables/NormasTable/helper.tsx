import React from "react";
import { NormaTableField, NormaListObj, TiposNormasLabel } from "entities/Norma";
import { FaSearch, FaEdit, FaRegTimesCircle, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

import { formatHelper } from "helpers/FormatHelper";

type AdditionalOptions = {
    delete: (norma: NormaListObj) => Promise<void>;
};

class NormasTableHelper {
    public treatData(data: NormaListObj[], addOptions?: AdditionalOptions): NormaTableField[] {
        return data.map((normaObj) => ({
            id_norma: normaObj.id,
            data: normaObj.data_norma,
            tipo: TiposNormasLabel.get(normaObj.id_tipo) || "-",
            titulo: normaObj.titulo,
            acoes: this.acoesComponent(normaObj, addOptions),
        }));
    }

    public acoesComponent(normaObj: NormaListObj, addOptions?: AdditionalOptions) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Link
                    to={`/normas/gerenciar/visualizar/${normaObj.id}`}
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
                    to={`/normas/gerenciar/editar/${normaObj.id}`}
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
                    onClick={(e) => {
                        e.stopPropagation();
                        addOptions?.delete(normaObj);
                    }}
                >
                    <FaRegTimesCircle size={"17px"} color={"red"} />
                </button>
            </div>
        );
    }
}

const normasTableHelper = new NormasTableHelper();

export { normasTableHelper, NormasTableHelper };
