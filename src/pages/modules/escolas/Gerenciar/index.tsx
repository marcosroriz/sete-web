import React from "react";

import { EscolasTableProvider } from "tables/EscolasTable/context";

import TableComponent from "./TableComponent";

import PageTitle from "components/micro/PageTitle";
import TableCard from "components/micro/Cards/TableCard";

import EscolasCadastroIcon from "assets/icons/escolas/escolas-cadastro.png";

const Gerenciar: React.FC = () => {
    return (
        <>
            <PageTitle message="Cadastrar Escola" icon={EscolasCadastroIcon} />
            <EscolasTableProvider>
                <TableCard>
                    <TableComponent />
                </TableCard>
            </EscolasTableProvider>
        </>
    );
};

export default Gerenciar;
