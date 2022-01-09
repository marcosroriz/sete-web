import React from "react";
import { ColumnWithLooseAccessor } from "react-table";

import { useAlertModal } from "hooks/AlertModal";
import { useError } from "hooks/Errors";
import { useAuth } from "contexts/Auth";
import { MonitoresService } from "services/Monitores";
import { MonitorTableField, MonitorListObj } from "entities/Monitor";
import { monitoresTableHelper } from "helpers/Tables/MonitoresTableHelper";

import { COLUMNS } from "./columns";

type MonitoresTableContextProps = {
    tableData: MonitorTableField[];
    columns: ColumnWithLooseAccessor<{}>[];
};

type MonitoresTableProviderProps = {
    children: React.ReactNode;
};

const MonitoresTableContext = React.createContext({} as MonitoresTableContextProps);

const MonitoresTableProvider = ({ children }: MonitoresTableProviderProps) => {
    const { createModalAsync } = useAlertModal();
    const { errorHandler } = useError();

    const { user } = useAuth();
    const [tableData, setTableData] = React.useState<MonitorTableField[]>([]);
    const columns = React.useMemo(() => COLUMNS, []);

    const handleDeleteMonitor = async (monitor: MonitorListObj) => {
        try {
            const alertResponse = await createModalAsync("warning", {
                title: "Atenção!",
                html: `Deseja remover o Monitor:<br /> <b>${monitor.nome}</b>?`,
                confirmButtonText: "Remover",
                confirmButtonColor: "var(--color-red-500)",
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                cancelButtonColor: "var(--color-grey-650)",
                reverseButtons: true,
            });
            if (!alertResponse.isConfirmed) {
                return;
            }

            const monitoresService = new MonitoresService();
            const codigo_cidade = user?.codigo_cidade || 0;

            await monitoresService.deleteMonitor(monitor.cpf, codigo_cidade);
        } catch (err) {
            errorHandler(err, { title: "Erro ao remover Monitor" });
        }
    };

    React.useEffect(() => {
        const fetchData = async () => {
            const monitoresService = new MonitoresService();
            const codigo_cidade = user?.codigo_cidade || 0;
            const response = await monitoresService.listMonitores(codigo_cidade);
            const treatedData = monitoresTableHelper.treatData(response.data, { delete: handleDeleteMonitor });
            setTableData(treatedData);
        };
        fetchData();
    }, []);
    return <MonitoresTableContext.Provider value={{ tableData, columns }}>{children}</MonitoresTableContext.Provider>;
};

const useMonitoresTable = () => {
    const context = React.useContext(MonitoresTableContext);
    if (!context) {
        throw new Error("useEscolasTable deve ser usado entre um provider");
    }
    return context;
};

export { MonitoresTableContext, MonitoresTableProvider, useMonitoresTable };
