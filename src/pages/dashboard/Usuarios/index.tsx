import React from "react";

import { UsuariosTableProvider } from "contexts/Tables/UsuariosTableContext";
import PageTitle from "components/micro/PageTitle";
import TableCard from "components/micro/Cards/TableCard";
import TableComponent from "./TableComponent";

import UsuariosCadastroIcon from "assets/icons/usuarios/usuario-listar.png";

const Usuarios: React.FC = () => {
    return (
        <>
            <PageTitle message="Usuários" icon={UsuariosCadastroIcon} />
            <UsuariosTableProvider>
                <TableCard>
                    <TableComponent />
                </TableCard>
            </UsuariosTableProvider>
        </>
    );
};

export default Usuarios;
