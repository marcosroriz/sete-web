import React from "react";

import { Monitor } from "entities/Monitor";

import { useNavCard } from "contexts/NavCard";

import RecordTable from "components/micro/RecordTable";

type MonitorData = [Monitor | null, React.Dispatch<React.SetStateAction<Monitor | null>>];

const FichaMonitor: React.FC = () => {
    const { aditionalData } = useNavCard();
    const [monitorData] = aditionalData?.monitorData as MonitorData;
    const [tableData, setTableData] = React.useState<any>(null);
    React.useEffect(() => {
        if (monitorData) {
            const data = {
                Nome: monitorData.nome,
                CPF: monitorData.cpf,
                "Data de nascismento": monitorData.data_nascimento,
                Sexo: monitorData.sexo == 1 ? "Masculino" : monitorData.sexo == 2 ? "Feminino" : "Não informado",
                Vínculo:
                    monitorData.vinculo == 1
                        ? "Servidor efetivo"
                        : monitorData.vinculo == 2
                        ? "Servidor comissionado"
                        : monitorData.vinculo == 3
                        ? "Servidor tercerizado"
                        : "Outro",
                Salário: "R$ " + monitorData.salario,

                Turno: [
                    monitorData.turno_manha === "S" ? "Manhã" : "",
                    monitorData.turno_tarde === "S" ? "Tarde" : "",
                    monitorData.turno_noite === "S" ? "Noite" : "",
                ]
                    .filter((val) => val !== "")
                    .join(", "),
            };
            setTableData(data);
        }
    }, [monitorData]);
    return <RecordTable title="MONITOR" data={tableData} />;
};

export default FichaMonitor;
