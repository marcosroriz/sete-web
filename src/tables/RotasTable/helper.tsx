import React from "react";
import { Link } from "react-router-dom";

import { RotasListObj, RotasTableField } from "entities/Rotas";
import { RotasService } from "services/Rotas";

import { formatHelper } from "helpers/FormatHelper";

import { FaUserAlt, FaSearch, FaEdit, FaRegTimesCircle } from "react-icons/fa";

type AdditionalOptions = {
    delete: (rota: RotasListObj) => Promise<void>;
};

class RotasTableHelper {
    public treatData(data: RotasListObj[], addOptions?: AdditionalOptions): RotasTableField[] {
        return data.map((rotaObj) => ({
            id_rota: rotaObj.id_rota,
            nome: rotaObj.nome,
            quilometragem: rotaObj.quilometragem,
            turno: [
                formatHelper.parseSNToString(rotaObj.turno_matutino, "Matutino"),
                formatHelper.parseSNToString(rotaObj.turno_vespertino, "Vespertino"),
                formatHelper.parseSNToString(rotaObj.turno_noturno, "Noturno"),
            ].joinValid(", "),
            alunos_atendidos: rotaObj.alunos_atendidos, //this.NumberAlunosAtendidos(Number(rotaObj.id_rota), userCodigoCidade),
            escolas_atendidas: rotaObj.escolas_atendidas,
            acoes: this.acoesComponent(rotaObj, addOptions),
        }));
    }

    public acoesComponent(rotaObj: RotasListObj, addOptions?: AdditionalOptions) {
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
                <button
                    style={{
                        border: "none",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        addOptions?.delete(rotaObj);
                    }}
                >
                    <FaRegTimesCircle size={"17px"} color={"red"} />
                </button>
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
