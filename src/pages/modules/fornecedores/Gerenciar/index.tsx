import React from "react";

import { FornecedoresTableProvider } from "contexts/Tables/FornecedoresTableContext";

import TableComponent from "./TableComponent";

import PageTitle from "components/micro/PageTitle";
import TableCard from "components/micro/Cards/TableCard";

import FornecedorCadastroIcon from "assets/icons/fornecedores/fornecedores-cadastro.png";

const Gerenciar: React.FC = () => {
    return (
        <>
            <PageTitle message="Cadastro de Fornecedor" icon={FornecedorCadastroIcon} />
            <FornecedoresTableProvider>
                <TableCard>
                    <TableComponent />
                </TableCard>
            </FornecedoresTableProvider>
        </>
    );
};

export default Gerenciar;
