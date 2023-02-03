import React from "react";

import { NormasTableProvider } from "tables/NormasTable/context";

import TableComponent from "./TableComponent";

import PageTitle from "components/micro/PageTitle";
import TableCard from "components/micro/Cards/TableCard";

import NormaListarIcon from "assets/icons/normas/normas-listar.png";

const Gerenciar: React.FC = () => {
    return (
        <>
            <PageTitle message="Normas Cadastradas" icon={NormaListarIcon} />
            <NormasTableProvider>
                <TableCard>
                    <TableComponent />
                </TableCard>
            </NormasTableProvider>
        </>
    );
};

export default Gerenciar;
