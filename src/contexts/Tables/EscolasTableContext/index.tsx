import React from "react";
import { ColumnWithLooseAccessor } from "react-table";

import { useAlertModal } from "hooks/AlertModal";
import { useError } from "hooks/Errors";
import { useAuth } from "contexts/Auth";
import { EscolasService } from "services/Escolas";
import { EscolaListObj, EscolaTableField } from "entities/Escola";
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
    const { createModalAsync } = useAlertModal();
    const { errorHandler } = useError();
    const { user } = useAuth();

    const [tableData, setTableData] = React.useState<EscolaTableField[]>([]);
    const columns = React.useMemo(() => COLUMNS, []);

    const handleDeleteEscola = async (escola: EscolaListObj) => {
        try {
            const alertResponse = await createModalAsync("warning", {
                title: "Atenção!",
                html: `Deseja remover a Escola:<br /> <b>${escola.nome}</b>?`,
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

            const escolasService = new EscolasService();
            const codigo_cidade = user?.codigo_cidade || 0;

            await escolasService.deleteEscola(escola.id_escola, codigo_cidade);
        } catch (err) {
            errorHandler(err, { title: "Erro ao remover Escola" });
        }
    };

    const fetchData = async () => {
        const escolasService = new EscolasService();
        const codigo_cidade = user?.codigo_cidade || 0;

        const data = await escolasService.listEscolas(codigo_cidade);
        const treatedData = escolasTableHelper.treatData(data.data, { delete: handleDeleteEscola });
        setTableData(treatedData);
    };

    React.useEffect(() => {
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
