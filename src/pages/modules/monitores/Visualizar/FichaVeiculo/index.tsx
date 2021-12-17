import React from "react";

import { Motorista } from "entities/Motorista";

import { useNavCard } from "contexts/NavCard";

import RecordTable from "components/micro/RecordTable";

type MotoristaData = [Motorista | null, React.Dispatch<React.SetStateAction<Motorista | null>>];

const FichaVeiculo: React.FC = () => {
    const { aditionalData } = useNavCard();
    const [motoristaData] = aditionalData?.motoristaData as MotoristaData;
    const [tableData, setTableData] = React.useState<any>(null);
    React.useEffect(() => {
        if (motoristaData) {
            const data = {
                Nome: motoristaData.nome,
            };
            setTableData(data);
        }
    }, [motoristaData]);
    return <RecordTable title="MOTORISTA" data={tableData} />;
};

export default FichaVeiculo;
