import React, { useMemo } from "react";

import { useEscolasTable } from "contexts/Tables/EscolasTableContext";

import TableComponent from "components/micro/Table/TableComponent";

const Gerenciar: React.FC = () => {
    const { tableData, columns } = useEscolasTable();
    return <TableComponent columns={columns} name={"table"} data={tableData} />;
};

export default Gerenciar;
