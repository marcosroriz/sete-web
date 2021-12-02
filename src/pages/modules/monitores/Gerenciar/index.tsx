import React from "react";

import { MotoristasTableProvider } from "contexts/Tables/MotoristasTableContext";

import TableComponent from "./TableComponent";

import PageTitle from "components/micro/PageTitle";
import TableCard from "components/micro/Cards/TableCard";

import MotoristaCadastroIcon from "assets/icons/motoristas/motorista-cadastro.png";

const Gerenciar: React.FC = () => {
    return (
        <>
            <PageTitle message="Cadastro de Motorista" icon={MotoristaCadastroIcon} />
            <MotoristasTableProvider>
                <TableCard>
                    <TableComponent />
                </TableCard>
            </MotoristasTableProvider>
        </>
    );
};

export default Gerenciar;
