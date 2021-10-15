import React from "react";

import { useFrotasTable } from "contexts/Tables/FrotasTableContext";

import SeteTable from "components/micro/SeteTable";

const Gerenciar: React.FC = () => {
    const { tableData, columns } = useFrotasTable();
    return <SeteTable columns={columns} name={"table"} data={tableData} />;
};

export default Gerenciar;
