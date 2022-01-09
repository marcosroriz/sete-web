import React from "react";

import { MonitoresTableProvider } from "contexts/Tables/MonitoresTableContext";

import TableComponent from "./TableComponent";

import PageTitle from "components/micro/PageTitle";
import TableCard from "components/micro/Cards/TableCard";

import MotoristaCadastroIcon from "assets/icons/motoristas/motorista-cadastro.png";

const Gerenciar: React.FC = () => {
    return (
        <>
            <PageTitle message="Cadastro de Motorista" icon={MotoristaCadastroIcon} />
            <MonitoresTableProvider>
                <TableCard>
                    <TableComponent />
                </TableCard>
            </MonitoresTableProvider>
        </>
    );
};

export default Gerenciar;
