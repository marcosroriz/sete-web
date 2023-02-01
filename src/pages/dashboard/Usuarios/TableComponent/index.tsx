import React from "react";

import { useUsuariosTable } from "contexts/Tables/UsuariosTableContext";

import SeteTableUsers from "components/micro/SeteTableUsers";

const Gerenciar: React.FC = () => {
    const { tableData, columns } = useUsuariosTable();

    return <SeteTableUsers columns={columns} name={"Usuários Habilitados"} data={tableData} />;
};

export default Gerenciar;
