import React, { useMemo } from "react";

import { useRotasTable } from "contexts/Tables/RotasTableContext";

import SeteTable from "components/micro/SeteTable";

const Gerenciar: React.FC = () => {
    const { tableData, columns } = useRotasTable();
    return <SeteTable columns={columns} name="Rotas" data={tableData} />;
};

export default Gerenciar;
