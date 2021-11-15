import React from "react";

import { Veiculo } from "entities/Veiculo";

import { useNavCard } from "contexts/NavCard";

import RecordTable from "components/micro/RecordTable";

type VeiculoData = [Veiculo | null, React.Dispatch<React.SetStateAction<Veiculo | null>>];

const FichaVeiculo: React.FC = () => {
    const { aditionalData } = useNavCard();
    const [veiculoData] = aditionalData?.veiculoData as VeiculoData;
    const [tableData, setTableData] = React.useState<any>(null);
    React.useEffect(() => {
        if (veiculoData) {
            const data = {
                Marca: veiculoData.marca,
                Modelo: veiculoData.modelo,
                Origem: veiculoData.origem,
                Placa: veiculoData.placa,
                RENAVAM: veiculoData.renavam,
                "Capacidade máxima": veiculoData.capacidade,
                "Quilometragem inicial": veiculoData.km_inicial,
                "Quilometragem atual": veiculoData.km_atual,
                Manutenção: veiculoData.manutencao ? "Sim" : "Não",
            };
            setTableData(data);
        }
    }, [veiculoData]);
    return <RecordTable title="MOTOCICLETA" data={tableData} />;
};

export default FichaVeiculo;
