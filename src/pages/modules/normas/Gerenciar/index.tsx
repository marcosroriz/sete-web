import React from "react";

import { NormasTableProvider } from "tables/NormasTable/context";

import TableComponent from "./TableComponent";

import PageTitle from "components/micro/PageTitle";
import TableCard from "components/micro/Cards/TableCard";

import MotoristaCadastroIcon from "assets/icons/motoristas/motorista-cadastro.png";

const Gerenciar: React.FC = () => {
    return (
        <>
            <PageTitle message="Normas Cadastradas" icon={MotoristaCadastroIcon} />
            <NormasTableProvider>
                <TableCard>
                    <TableComponent />
                </TableCard>
            </NormasTableProvider>
        </>
    );
};

export default Gerenciar;
