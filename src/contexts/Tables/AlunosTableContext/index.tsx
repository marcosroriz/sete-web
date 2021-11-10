import React from "react";
import { ColumnWithLooseAccessor } from "react-table";

import { useAuth } from "contexts/Auth";
import { AlunosService } from "services/Alunos";
import { AlunosTableField } from "entities/Aluno";
import { alunosTableHelper } from "helpers/Tables/AlunosTableHelper";

import { COLUMNS } from "./columns";

type AlunosTableContextProps = {
    tableData: AlunosTableField[];
    columns: ColumnWithLooseAccessor<{}>[];
};

type AlunosTableProviderProps = {
    children: React.ReactNode;
};

const AlunosTableContext = React.createContext({} as AlunosTableContextProps);

const AlunosTableProvider = ({ children }: AlunosTableProviderProps) => {
    const { user } = useAuth();
    const [tableData, setTableData] = React.useState<AlunosTableField[]>([]);
    const columns = React.useMemo(() => COLUMNS, []);

    React.useEffect(() => {
        const fetchData = async () => {
            const alunosService = new AlunosService();
            const codigo_cidade = user?.codigo_cidade || 0;
            const response = await alunosService.listAlunos(codigo_cidade);
            const treatedData = alunosTableHelper.treatData(response.data);
            setTableData(treatedData);
        };

        fetchData();
    }, []);

    return <AlunosTableContext.Provider value={{ tableData, columns }}>{children}</AlunosTableContext.Provider>;
};

const useAlunosTable = () => {
    const context = React.useContext(AlunosTableContext);

    if (!context) {
        throw new Error("useAlunosTable deve ser usado entre um provider");
    }
    return context;
};

export { AlunosTableContext, AlunosTableProvider, useAlunosTable };
