import React from "react";
import { ColumnWithLooseAccessor } from "react-table";

import { useAuth } from "contexts/Auth";
import { FornecedoresService } from "services/Fornecedores";
import { FornecedorTableField } from "entities/Fornecedor";
import { fornecedoresTableHelper } from "helpers/Tables/FornecedoresTableHelper";

import { COLUMNS } from "./columns";

type FornecedoresTableContextProps = {
    tableData: FornecedorTableField[];
    columns: ColumnWithLooseAccessor<{}>[];
};

type FornecedoresTableProviderProps = {
    children: React.ReactNode;
};

const FornecedoresTableContext = React.createContext({} as FornecedoresTableContextProps);

const FornecedoresTableProvider = ({ children }: FornecedoresTableProviderProps) => {
    const { user } = useAuth();
    const [tableData, setTableData] = React.useState<FornecedorTableField[]>([]);
    const columns = React.useMemo(() => COLUMNS, []);
    React.useEffect(() => {
        const fetchData = async () => {
            const fornecedoresService = new FornecedoresService();
            const codigo_cidade = user?.codigo_cidade || 0;

            const data = await fornecedoresService.listFornecedores(codigo_cidade);
            const treatedData = fornecedoresTableHelper.treatData(data.data);
            setTableData(treatedData);
        };
        fetchData();
    }, []);
    return <FornecedoresTableContext.Provider value={{ tableData, columns }}>{children}</FornecedoresTableContext.Provider>;
};

const useFornecedoresTable = () => {
    const context = React.useContext(FornecedoresTableContext);
    if (!context) {
        throw new Error("useFornecedoresTable deve ser usado entre um provider");
    }
    return context;
};

export { FornecedoresTableContext, FornecedoresTableProvider, useFornecedoresTable };
