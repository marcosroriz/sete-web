import React from "react";
import { ColumnWithLooseAccessor } from "react-table";

import { useAuth } from "contexts/Auth";
import { EscolasService } from "services/Escolas";
import { EscolaTableField } from "entities/Escola";
import { escolasTableHelper } from "helpers/Tables/EscolasTableHelper";

import { COLUMNS } from "./columns";

type EscolasTableContextProps = {
    tableData: EscolaTableField[];
    columns: ColumnWithLooseAccessor<{}>[];
};

type EscolasTableProviderProps = {
    children: React.ReactNode;
};

const EscolasTableContext = React.createContext({} as EscolasTableContextProps);

const EscolasTableProvider = ({ children }: EscolasTableProviderProps) => {
    const { user } = useAuth();
    const [tableData, setTableData] = React.useState<EscolaTableField[]>([]);
    const columns = React.useMemo(() => COLUMNS, []);
    React.useEffect(() => {
        const fetchData = async () => {
            const escolasService = new EscolasService();
            const codigo_cidade = user?.codigo_cidade || 0;

            const data = await escolasService.listEscolas(codigo_cidade);
            const treatedData = escolasTableHelper.treatData(data.data);
            setTableData(treatedData);
        };
        fetchData();
    }, []);
    return <EscolasTableContext.Provider value={{ tableData, columns }}>{children}</EscolasTableContext.Provider>;
};

const useEscolasTable = () => {
    const context = React.useContext(EscolasTableContext);
    if (!context) {
        throw new Error("useEscolasTable deve ser usado entre um provider");
    }
    return context;
};

export { EscolasTableContext, EscolasTableProvider, useEscolasTable };
