import React from "react";

import { useUsuariosTable } from "contexts/Tables/UsuariosTableContext";

import SeteTable from "components/micro/SeteTable";

const Gerenciar: React.FC = () => {
    const { tableData, columns } = useUsuariosTable();

    return <SeteTable columns={columns} name={"Usuários Habilitados"} data={tableData} />;
};

export default Gerenciar;
