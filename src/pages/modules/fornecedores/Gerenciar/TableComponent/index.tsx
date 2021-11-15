import React, { useMemo } from "react";

import { useFornecedoresTable } from "contexts/Tables/FornecedoresTableContext";

import SeteTable from "components/micro/SeteTable";

const Gerenciar: React.FC = () => {
    const { tableData, columns } = useFornecedoresTable();
    return <SeteTable columns={columns} name={"Fornecedores"} data={tableData} />;
};

export default Gerenciar;
