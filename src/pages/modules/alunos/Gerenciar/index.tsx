import React from "react";

import { AlunosTableProvider } from "contexts/Tables/AlunosTableContext";

import TableCard from "components/micro/Cards/TableCard";

import TableComponent from "./TableComponent";

const Gerenciar: React.FC = () => {
    return (
        <AlunosTableProvider>
            <TableCard>
                <TableComponent />
            </TableCard>
        </AlunosTableProvider>
    );
};

export default Gerenciar;
