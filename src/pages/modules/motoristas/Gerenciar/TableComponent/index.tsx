import React, { useMemo } from "react";

import { useMotoristasTable } from "contexts/Tables/MotoristasTableContext";

import SeteTable from "components/micro/SeteTable";

const Gerenciar: React.FC = () => {
    const { tableData, columns } = useMotoristasTable();
    return <SeteTable columns={columns} name={"Motoristas"} data={tableData} />;
};

export default Gerenciar;
