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
                Placa: veiculoData.placa,
                Modo: veiculoData.modo == "0" ? "Rodoviário" : veiculoData.modo == "1" ? "Aquaviário" : "-",
                Tipo:
                    veiculoData.origem == 1
                        ? "Ônibus"
                        : veiculoData.origem == 2
                        ? "Micro-ônibus"
                        : veiculoData.origem == 3
                        ? "Van"
                        : veiculoData.origem == 4
                        ? "Kombi"
                        : veiculoData.origem == 5
                        ? "Caminhão"
                        : veiculoData.origem == 6
                        ? "Caminhonete"
                        : veiculoData.origem == 7
                        ? "Motocicleta"
                        : veiculoData.origem == 8
                        ? "Animal de tração"
                        : veiculoData.origem == 9
                        ? "Lanhca/Voadeira"
                        : veiculoData.origem == 10
                        ? "Barco de madeira"
                        : "-",
                Ano: veiculoData.ano,
                Marca: veiculoData.marca_str,
                Modelo: veiculoData.modelo,
                "Capacidade máxima": veiculoData.capacidade,
                "Quilometragem inicial": veiculoData.km_inicial,
                "Quilometragem atual": veiculoData.km_atual,
                Origem: veiculoData.origem == 1 ? "Próprio" : veiculoData.origem == 2 ? "Terceirizado" : "-",
            };
            setTableData(data);
        }
    }, [veiculoData]);
    return <RecordTable title="MOTOCICLETA" data={tableData} />;
};

export default FichaVeiculo;
