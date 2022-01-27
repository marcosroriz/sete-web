import React from "react";

import { COLUMNS } from "./columns";

import { useNavCard } from "contexts/NavCard";

import TableCard from "components/micro/Cards/TableCard";
import SeteTable from "components/micro/SeteTable";
import { escolasTableHelper } from "helpers/Tables/EscolasTableHelper";

const AlunosAtendidos: React.FC = () => {
    const { aditionalData } = useNavCard();

    const columns = React.useMemo(() => COLUMNS, []);

    const [alunosData] = aditionalData?.alunosData as any;
    const [tableData, setTableData] = React.useState<any[]>([]);

    React.useEffect(() => {
        if (alunosData) {
            const treatedData = escolasTableHelper.treatDataAlunosAtendidos(alunosData.data);

            setTableData(treatedData);
        }
    }, [alunosData]);

    return <SeteTable columns={columns} name={"Alunos Atendidos"} data={tableData} />;
};

export default AlunosAtendidos;
