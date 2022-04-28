import React from "react";
import { EscolaTableField, EscolaListObj, MecTpLocalizacaoEnum, MecTpLocalizacaoLabel } from "entities/Escola";
import { FaSearch, FaEdit, FaRegTimesCircle, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

import { formatHelper } from "helpers/FormatHelper";

type AdditionalOptions = {
    delete: (escola: EscolaListObj) => Promise<void>;
};

class EscolasTableHelper {
    public treatData(data: EscolaListObj[], addOptions?: AdditionalOptions): EscolaTableField[] {
        return data.map((escolaObj) => ({
            id_escola: escolaObj.id_escola,
            nome: escolaObj.nome,
            localizacao: MecTpLocalizacaoLabel.get(escolaObj.mec_tp_localizacao) || "-",
            gps: escolaObj.loc_latitude && escolaObj.loc_longitude ? "Sim" : "Não",
            nivel: [
                formatHelper.parseSNToString(escolaObj.ensino_pre_escola, "Infantil"),
                formatHelper.parseSNToString(escolaObj.ensino_fundamental, "Fundamental"),
                formatHelper.parseSNToString(escolaObj.ensino_medio, "Médio"),
                formatHelper.parseSNToString(escolaObj.ensino_superior, "Superior"),
            ].joinValid(", "),
            horario_funcionamento: [
                formatHelper.parseSNToString(escolaObj.horario_matutino, "Manhã"),
                formatHelper.parseSNToString(escolaObj.horario_vespertino, "Tarde"),
                formatHelper.parseSNToString(escolaObj.horario_noturno, "Noite"),
            ].joinValid(", "),
            qtd_alunos: escolaObj.qtd_alunos,
            acoes: this.acoesComponent(escolaObj, addOptions),
        }));
    }

    public acoesComponent(escolaObj: EscolaListObj, addOptions?: AdditionalOptions) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Link
                    to={`/escolas/gerenciar/alunos/${escolaObj.id_escola}`}
                    style={{
                        display: "block",
                        marginBottom: "-2px",
                        marginRight: "4px",
                        border: "none",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                    }}
                >
                    <FaUser size={"16px"} color={"#23CCEF"} />
                </Link>
                <Link
                    to={`/escolas/gerenciar/visualizar/${escolaObj.id_escola}`}
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
                    to={`/escolas/gerenciar/editar/${escolaObj.id_escola}`}
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
                        addOptions?.delete(escolaObj);
                    }}
                >
                    <FaRegTimesCircle size={"17px"} color={"red"} />
                </button>
            </div>
        );
    }

    public treatDataEscolasAtendidas(data: any[]): any[] {
        return data.map((escolaObj) => ({
            nome: escolaObj.nome,
            // cpf: escolaObj.cpf || "-",
            // turno:
            //     escolaObj.turno == 1
            //         ? "Matutino"
            //         : escolaObj.turno == 2
            //         ? "Vespertino"
            //         : escolaObj.turno == 3
            //         ? "Integral"
            //         : escolaObj.mec_tp_dependencia == 4
            //         ? "Noturno"
            //         : "-",
            // nivel:
            //     escolaObj.nivel == 1
            //         ? "Infantil"
            //         : escolaObj.nivel == 2
            //         ? "Fundamental"
            //         : escolaObj.nivel == 3
            //         ? "Médio"
            //         : escolaObj.nivel == 4
            //         ? "Superior"
            //         : escolaObj.nivel == 5
            //         ? "Outro"
            //         : "-",
        }));
    }
}

const escolasTableHelper = new EscolasTableHelper();

export { escolasTableHelper, EscolasTableHelper };
