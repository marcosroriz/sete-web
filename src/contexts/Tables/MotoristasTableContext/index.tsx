import React from "react";
import { ColumnWithLooseAccessor } from "react-table";

import { useAuth } from "contexts/Auth";
import { MotoristasService } from "services/Motoristas";
import { MotoristaTableField } from "entities/Motorista";
import { motoristasTableHelper } from "helpers/Tables/MotoristasTableHelper";

import { COLUMNS } from "./columns";

type MotoristasTableContextProps = {
    tableData: MotoristaTableField[];
    columns: ColumnWithLooseAccessor<{}>[];
};

type MotoristasTableProviderProps = {
    children: React.ReactNode;
};

const MotoristasTableContext = React.createContext({} as MotoristasTableContextProps);

const MotoristasTableProvider = ({ children }: MotoristasTableProviderProps) => {
    const { user } = useAuth();
    const [tableData, setTableData] = React.useState<MotoristaTableField[]>([]);
    const columns = React.useMemo(() => COLUMNS, []);
    React.useEffect(() => {
        const fetchData = async () => {
            const motoristasService = new MotoristasService();
            const codigo_cidade = user?.codigo_cidade || 0;

            const data = await motoristasService.listMotoristas(codigo_cidade);
            const treatedData = motoristasTableHelper.treatData(data.data);
            setTableData(treatedData);
        };
        fetchData();
    }, []);
    return <MotoristasTableContext.Provider value={{ tableData, columns }}>{children}</MotoristasTableContext.Provider>;
};

const useMotoristasTable = () => {
    const context = React.useContext(MotoristasTableContext);
    if (!context) {
        throw new Error("useEscolasTable deve ser usado entre um provider");
    }
    return context;
};

export { MotoristasTableContext, MotoristasTableProvider, useMotoristasTable };
