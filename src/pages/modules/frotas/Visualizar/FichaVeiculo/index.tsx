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
                Modo: veiculoData.modo == 0 ? "Rodoviário" : veiculoData.modo == 1 ? "Aquaviário" : "-",
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
                Marca: veiculoData.marca,
                Modelo: veiculoData.modelo,
                "Capacidade máxima": veiculoData.capacidade,
                "Quilometragem inicial": veiculoData.km_inicial,
                "Quilometragem atual": veiculoData.km_atual,
                Origem: veiculoData.origem == 1 ? "Próprio" : veiculoData.origem == 2 ? "Terceirizado" : "-",
                IPVA: veiculoData.ipva,
                DPVAT: veiculoData.dpvat,
                "Seguro anual": veiculoData.seguro_anual,
                Consumo: veiculoData.consumo,
                "Tipo de Combustível":
                    veiculoData.tipo_combustivel === "G"
                        ? "Gasolina"
                        : veiculoData.tipo_combustivel === "D"
                        ? "Diesel"
                        : veiculoData.tipo_combustivel === "E"
                        ? "Etanol"
                        : veiculoData.tipo_combustivel === "N"
                        ? "Gás Natural"
                        : veiculoData.tipo_combustivel === "O"
                        ? "Outro"
                        : "Não informado",
            };
            setTableData(data);
        }
    }, [veiculoData]);
    return <RecordTable title="MOTOCICLETA" data={tableData} />;
};

export default FichaVeiculo;
