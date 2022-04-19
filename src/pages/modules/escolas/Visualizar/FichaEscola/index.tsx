import React from "react";

import { Escola, MecTpLocalizacaoLabel, MecTpDependenciaLabel } from "entities/Escola";

import { useNavCard } from "contexts/NavCard";

import { formatHelper } from "helpers/FormatHelper";

import RecordTable from "components/micro/RecordTable";

type EscolaData = [Escola | null, React.Dispatch<React.SetStateAction<Escola | null>>];

const FichaEscola: React.FC = () => {
    const { aditionalData } = useNavCard();
    const [escolaData] = aditionalData?.escolaData as EscolaData;
    const [tableData, setTableData] = React.useState<any>(null);

    React.useEffect(() => {
        if (!!escolaData) {
            const data = {
                ["Nome da escola"]: escolaData.nome,
                ["Estado"]: escolaData.mec_co_uf,
                ["Município"]: escolaData.mec_co_municipio,
                ["CEP"]: escolaData.loc_cep,
                ["Endereço"]: escolaData.loc_endereco,
                ["Tipo de Localização"]: MecTpLocalizacaoLabel.get(escolaData.mec_tp_localizacao!) || "-",
                ["Dependência"]: MecTpDependenciaLabel.get(escolaData.mec_tp_dependencia!) || "-",
                ["Contato"]: escolaData.contato_responsavel,
                ["Telefone de contato"]: escolaData.contato_telefone,
                ["E-mail de contato"]: escolaData.contato_email,
                ["Tipo de ensino oferecido"]: [
                    formatHelper.parseSNToString(escolaData.ensino_pre_escola, "Infantil"),
                    formatHelper.parseSNToString(escolaData.ensino_fundamental, "Fundamental"),
                    formatHelper.parseSNToString(escolaData.ensino_medio, "Médio"),
                    formatHelper.parseSNToString(escolaData.ensino_superior, "Superior"),
                ].joinValid(", "),
                ["Modo de ensino oferecido"]: [
                    formatHelper.parseSNToString(escolaData.mec_in_regular, "Regular"),
                    formatHelper.parseSNToString(escolaData.mec_in_eja, "EJA"),
                    formatHelper.parseSNToString(escolaData.mec_in_profissionalizante, "Profissionalizante"),
                    formatHelper.parseSNToString(escolaData.mec_in_especial_exclusiva, "Exclusiva"),
                ].joinValid(", "),
                ["Horário de funcionamento"]: [
                    formatHelper.parseSNToString(escolaData.horario_matutino, "Manhã"),
                    formatHelper.parseSNToString(escolaData.horario_vespertino, "Tarde"),
                    formatHelper.parseSNToString(escolaData.horario_noturno, "Noite"),
                ].joinValid(", "),
            };
            setTableData(data);
        }
    }, [escolaData]);
    return <RecordTable title={escolaData?.nome || ""} data={tableData} />;
};

export default FichaEscola;
