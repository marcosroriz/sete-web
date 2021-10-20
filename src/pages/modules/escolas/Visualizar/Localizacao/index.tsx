import React from "react";

import { Escola } from "entities/Escola";

import { useNavCard } from "contexts/NavCard";

import RecordTable from "components/micro/RecordTable";

type EscolaData = [Escola | null, React.Dispatch<React.SetStateAction<Escola | null>>];

const Localizacao: React.FC = () => {
    const { aditionalData } = useNavCard();
    const [escolaData] = aditionalData?.escolaData as EscolaData;
    const [tableData, setTableData] = React.useState<any>(null);
    React.useEffect(() => {
        if (escolaData) {
            const data = {
                "Nome da escola": escolaData.nome,
                Estado: escolaData.nome,
                Município: escolaData.nome,
                CEP: escolaData.nome,
                Endereço: escolaData.nome,
                "Tipo de Localização": escolaData.nome,
                Dependência: escolaData.nome,
                Contato: escolaData.nome,
                "Telefone de contato": escolaData.nome,
                "E-mail de contato": escolaData.nome,
                "Número de alunos atendidos": escolaData.nome,
                "Tipo de ensino oferecido": escolaData.nome,
                "Horário de funcionamento": escolaData.nome,
                "Regime de funcionamento": escolaData.nome,
            };
            setTableData(data);
        }
    }, [escolaData]);
    return <RecordTable title={escolaData?.nome || ""} data={tableData} />;
};

export default Localizacao;
