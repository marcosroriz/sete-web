import React from "react";

import { FrotasTableProvider } from "contexts/Tables/FrotasTableContext";

import TableCard from "components/micro/Cards/TableCard";

import TableComponent from "./TableComponent";

const Gerenciar: React.FC = () => {
    return (
        <FrotasTableProvider>
            <TableCard>
                <TableComponent />
            </TableCard>
        </FrotasTableProvider>
    );
};

export default Gerenciar;
