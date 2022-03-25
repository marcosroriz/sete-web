import React, { useMemo } from "react";

import { useMonitoresTable } from "contexts/Tables/MonitoresTableContext";

import SeteTable from "components/micro/SeteTable";

const Gerenciar: React.FC = () => {
    const { tableData, columns } = useMonitoresTable();
    return <SeteTable columns={columns} name="Monitores" data={tableData} />;
};

export default Gerenciar;
