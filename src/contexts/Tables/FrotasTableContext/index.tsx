import React from "react";
import { ColumnWithLooseAccessor } from "react-table";

import { useAuth } from "contexts/Auth";
import { VeiculosService } from "services/Veiculos";
import { VeiculoTableField } from "entities/Veiculo";
import { frotasTableHelper } from "helpers/Tables/FrotasTableHelper";

import { COLUMNS } from "./columns";

type FrotasTableContextProps = {
    tableData: VeiculoTableField[];
    columns: ColumnWithLooseAccessor<{}>[];
};

type FrotasTableProviderProps = {
    children: React.ReactNode;
};

const FrotasTableContext = React.createContext({} as FrotasTableContextProps);

const FrotasTableProvider = ({ children }: FrotasTableProviderProps) => {
    const { user } = useAuth();
    const [tableData, setTableData] = React.useState<VeiculoTableField[]>([]);
    const columns = React.useMemo(() => COLUMNS, []);
    React.useEffect(() => {
        const fetchData = async () => {
            const veiculoService = new VeiculosService();
            const codigo_cidade = user?.codigo_cidade || 0;

            const data = await veiculoService.listVeiculos(codigo_cidade);
            const treatedData = frotasTableHelper.treatData(data.data);
            setTableData(treatedData);
        };
        fetchData();
    }, []);
    return <FrotasTableContext.Provider value={{ tableData, columns }}>{children}</FrotasTableContext.Provider>;
};

const useFrotasTable = () => {
    const context = React.useContext(FrotasTableContext);
    if (!context) {
        throw new Error("useFrotasTable deve ser usado entre um provider");
    }
    return context;
};

export { FrotasTableContext, FrotasTableProvider, useFrotasTable };
