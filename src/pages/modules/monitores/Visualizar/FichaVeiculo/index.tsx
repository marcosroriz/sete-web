import React from "react";

import { Monitor } from "entities/Monitor";

import { useNavCard } from "contexts/NavCard";

import RecordTable from "components/micro/RecordTable";

type MonitorData = [Monitor | null, React.Dispatch<React.SetStateAction<Monitor | null>>];

const FichaMonitor: React.FC = () => {
    const { aditionalData } = useNavCard();
    const [monitorData] = aditionalData?.motoristaData as MonitorData;
    const [tableData, setTableData] = React.useState<any>(null);
    React.useEffect(() => {
        if (monitorData) {
            const data = {
                Nome: monitorData.nome,
            };
            setTableData(data);
        }
    }, [monitorData]);
    return <RecordTable title="MONITOR" data={tableData} />;
};

export default FichaMonitor;
