import React from "react";

import { EscolasTableProvider } from "contexts/Tables/EscolasTableContext";

import TableComponent from "./TableComponent";

import PageTitle from "components/micro/PageTitle";
import TableCard from "components/micro/Cards/TableCard";

import PageIconOnibus from "assets/icons/frotas/frota-onibus.png";
import PageIconLancha from "assets/icons/frotas/frota-lancha.png";

const Gerenciar: React.FC = () => {
    return (
        <>
            <PageTitle message="Escolas Cadastradas" icon={PageIconOnibus} iconRight={PageIconLancha} />
            <EscolasTableProvider>
                <TableCard>
                    <TableComponent />
                </TableCard>
            </EscolasTableProvider>
        </>
    );
};

export default Gerenciar;
