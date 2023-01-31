import React, { useMemo } from "react";

import { useRotasTable } from "tables/RotasTable/context";

import SeteTable from "components/micro/SeteTable";

const Gerenciar: React.FC = () => {
    const { tableData, columns } = useRotasTable();
    return <SeteTable columns={columns} name="Rotas" data={tableData} />;
};

export default Gerenciar;
