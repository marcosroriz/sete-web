import React from "react";

import { AdminsTableProvider } from "tables/AdminTable/context";

import IconUsuarios from "assets/icons/perfil/usuario-listar.png";

import PageTitle from "components/micro/PageTitle";
import TableCard from "components/micro/Cards/TableCard";
import Tabela from "./Tabela";

const Usuarios: React.FC = () => {
    return (
        <>
            <PageTitle message="Usuários Cadastrados" icon={IconUsuarios} />
            <AdminsTableProvider>
                <TableCard>
                    <Tabela />
                </TableCard>
            </AdminsTableProvider>
        </>
    );
};

export default Usuarios;
