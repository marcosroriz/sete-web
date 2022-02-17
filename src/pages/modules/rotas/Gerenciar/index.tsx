import React from "react";

import { RotasTableProvider } from "contexts/Tables/RotasTableContext";

import TableComponent from "./TableComponent";

import PageTitle from "components/micro/PageTitle";
import TableCard from "components/micro/Cards/TableCard";

import MotoristaCadastroIcon from "assets/icons/motoristas/motorista-cadastro.png";

const Gerenciar: React.FC = () => {
    return (
        <>
            <PageTitle message="Rotas" icon={MotoristaCadastroIcon} />
            <RotasTableProvider>
                <TableCard>
                    <TableComponent />
                </TableCard>
            </RotasTableProvider>
        </>
    );
};

export default Gerenciar;
