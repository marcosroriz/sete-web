import React from "react";
import { Link } from "react-router-dom";

import { RotaListObj, RotaTableField } from "entities/Rota";
import { RotasService } from "services/Rotas";

import { FaUserAlt, FaSearch, FaEdit, FaRegTimesCircle } from "react-icons/fa";

type AdditionalOptions = {
    delete: (escola: RotaListObj) => Promise<void>;
};

class RotasTableHelper {
    public treatData(data: RotaListObj[], userCodigoCidade: number, addOptions?: AdditionalOptions): RotaTableField[] {
        return data.map((rotaObj) => ({
            nome: rotaObj.nome || "-",
            gps: rotaObj.gps || "-",
            quilometragem: rotaObj.km || 0,
            turno: [rotaObj.turno_matutino ? "Matutino" : "", rotaObj.turno_vespertino ? "Vespertino" : ""].map((item) => item).join(", "),
            alunos_atendidos: 0, //this.NumberAlunosAtendidos(Number(rotaObj.id_rota), userCodigoCidade),
            escolas_atendidas: 0,
            acoes: this.acoesComponent(rotaObj, addOptions),
        }));
    }

    public acoesComponent(rotaObj: RotaListObj, addOptions?: AdditionalOptions) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Link
                    to={`/rotas/gerenciar/visualizar/${rotaObj.id_rota}`}
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
                    to={`/rotas/gerenciar/editar/${rotaObj.id_rota}`}
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
                {/* <button
                    style={{
                        border: "none",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                    }}
                    onClick={() => addOptions?.delete(rotaObj)}
                >
                    <FaRegTimesCircle size={"17px"} color={"red"} />
                </button> */}
            </div>
        );
    }

    public async NumberAlunosAtendidos(rotaId: number, codigoCidade: number) {
        const rotasService = new RotasService();
        const alunosAtendidos = await rotasService.listBindAlunosToRota(rotaId, codigoCidade);
        if (!!alunosAtendidos) return alunosAtendidos.total;
        else return 0;
    }
}

const rotasTableHelper = new RotasTableHelper();

export { rotasTableHelper, RotasTableHelper };
