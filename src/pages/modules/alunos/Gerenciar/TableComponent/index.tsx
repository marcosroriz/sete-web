import React from "react";

import { useAlunosTable } from "contexts/Tables/AlunosTableContext";

import SeteTable from "components/micro/SeteTable";

const Gerenciar: React.FC = () => {
    const { tableData, columns } = useAlunosTable();

    return <SeteTable columns={columns} name={"tableFrotas"} data={tableData} />;
};

export default Gerenciar;
