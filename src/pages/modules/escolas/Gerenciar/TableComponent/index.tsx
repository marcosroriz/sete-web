import React, { useMemo } from "react";

import { useEscolasTable } from "contexts/Tables/EscolasTableContext";

import SeteTable from "components/micro/SeteTable";

const Gerenciar: React.FC = () => {
    const { tableData, columns } = useEscolasTable();
    return <SeteTable columns={columns} name={"tableEscolas"} data={tableData} />;
};

export default Gerenciar;
