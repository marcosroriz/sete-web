import React from "react";

import { FrotasTableProvider } from "contexts/Tables/FrotasTableContext";

import PageTitle from "components/micro/PageTitle";
import TableCard from "components/micro/Cards/TableCard";

import PageIconOnibus from "assets/icons/frotas/frotas-onibus.png";
import PageIconLancha from "assets/icons/frotas/frotas-lancha.png";

import TableComponent from "./TableComponent";

const Gerenciar: React.FC = () => {
    return (
        <>
            <PageTitle message="Veículos Cadastrados" icon={PageIconOnibus} iconRight={PageIconLancha} />
            <FrotasTableProvider>
                <TableCard>
                    <TableComponent />
                </TableCard>
            </FrotasTableProvider>
        </>
    );
};

export default Gerenciar;
