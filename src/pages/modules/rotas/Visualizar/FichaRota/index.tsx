import React from "react";

import { Rotas } from "entities/Rotas";

import { useNavCard } from "contexts/NavCard";

import RecordTable from "components/micro/RecordTable";

type RotaData = [Rotas | null, React.Dispatch<React.SetStateAction<Rotas | null>>];

const FichaRota: React.FC = () => {
    const { aditionalData } = useNavCard();
    const [rotaData] = aditionalData?.rotaData as RotaData;
    const [tableData, setTableData] = React.useState<any>(null);

    React.useEffect(() => {
        if (rotaData) {
            const data = {
                "Nome da rota": rotaData.nome,
                // Estado: rotaData.mec_co_uf,
                // Município: rotaData.mec_co_municipio,
                // CEP: rotaData.loc_cep,
                // Endereço: rotaData.loc_endereco,
                // "Tipo de Localização": rotaData.mec_tp_localizacao == 1 ? "Urbana" : rotaData.mec_tp_localizacao == 2 ? "Rural" : null,
                // Dependência:
                //     rotaData.mec_tp_dependencia == 1
                //         ? "Federal"
                //         : rotaData.mec_tp_dependencia == 2
                //         ? "Estadual"
                //         : rotaData.mec_tp_dependencia == 3
                //         ? "Municipal"
                //         : rotaData.mec_tp_dependencia == 4
                //         ? "Privada"
                //         : null,
                // Contato: rotaData.contato_responsavel,
                // "Telefone de contato": rotaData.contato_telefone,
                // "E-mail de contato": rotaData.contato_email,
                // // "Número de alunos atendidos": rotaData.nome,
                // "Tipo de ensino oferecido": [
                //     rotaData.ensino_pre_rota === "S" ? "Infantil" : "",
                //     rotaData.ensino_fundamental === "S" ? "Fundamental" : "",
                //     rotaData.ensino_medio === "S" ? "Médio" : "",
                //     rotaData.ensino_superior === "S" ? "Superior" : "",
                // ]
                //     .filter((val) => val !== "")
                //     .join(", "),
                // "Modo de ensino oferecido": [
                //     rotaData.mec_in_regular === "S" ? "Regular" : "",
                //     rotaData.mec_in_eja === "S" ? "EJA" : "",
                //     rotaData.mec_in_profissionalizante === "S" ? "Profissionalizante" : "",
                //     rotaData.mec_in_especial_exclusiva === "S" ? "Especial/Exclusiva" : "",
                // ]
                //     .filter((val) => val !== "")
                //     .join(", "),
                // "Horário de funcionamento": [
                //     rotaData.horario_matutino === "S" ? "Manhã" : "",
                //     rotaData.horario_vespertino === "S" ? "Tarde" : "",
                //     rotaData.horario_noturno === "S" ? "Noite" : "",
                // ]
                //     .filter((val) => val !== "")
                //     .join(", "),
            };
            setTableData(data);
        }
    }, [rotaData]);
    return <RecordTable title={rotaData?.nome || ""} data={tableData} />;
};

export default FichaRota;
