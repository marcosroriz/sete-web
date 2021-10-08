import React from "react";

import { useFrotasTable } from "contexts/Tables/FrotasTableContext";

import TableComponent from "components/micro/Table/TableComponent";

const Gerenciar: React.FC = () => {
    const { tableData, columns } = useFrotasTable();
    return <TableComponent columns={columns} name={"table"} data={tableData} />;
};

export default Gerenciar;
