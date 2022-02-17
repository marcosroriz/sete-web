import React from "react";

import { COLUMNS } from "./columns";

import { useNavCard } from "contexts/NavCard";

import TableCard from "components/micro/Cards/TableCard";
import SeteTable from "components/micro/SeteTable";
import { escolasTableHelper } from "helpers/Tables/EscolasTableHelper";

const EscolasAtendidas: React.FC = () => {
    const { aditionalData } = useNavCard();

    const columns = React.useMemo(() => COLUMNS, []);

    const [escolasData] = aditionalData?.escolasData as any;
    const [tableData, setTableData] = React.useState<any[]>([]);

    React.useEffect(() => {
        if (escolasData) {
            const treatedData = escolasTableHelper.treatDataEscolasAtendidas(escolasData.data);

            setTableData(treatedData);
        }
    }, [escolasData]);

    return <SeteTable columns={columns} name={"escolas Atendidos"} data={tableData} />;
};

export default EscolasAtendidas;
