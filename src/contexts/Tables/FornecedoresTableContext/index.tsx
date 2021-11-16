import React from "react";
import { ColumnWithLooseAccessor } from "react-table";

import { useAlertModal } from "hooks/AlertModal";
import { useError } from "hooks/Errors";
import { useAuth } from "contexts/Auth";
import { FornecedoresService } from "services/Fornecedores";
import { FornecedorTableField, FornecedorListObj } from "entities/Fornecedor";
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
    const { createModalAsync } = useAlertModal();
    const { errorHandler } = useError();

    const { user } = useAuth();
    const [tableData, setTableData] = React.useState<FornecedorTableField[]>([]);
    const columns = React.useMemo(() => COLUMNS, []);

    const handleDeleteFornecedor = async (fornecedor: FornecedorListObj) => {
        try {
            const alertResponse = await createModalAsync("warning", {
                title: "Atenção!",
                html: `Deseja remover a Escola:<br /> <b>${fornecedor.nome}</b>?`,
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

            const fornecedoresService = new FornecedoresService();
            const codigo_cidade = user?.codigo_cidade || 0;

            await fornecedoresService.deleteFornecedor(fornecedor.id_fornecedor, codigo_cidade);
        } catch (err) {
            errorHandler(err, { title: "Erro ao remover Escola" });
        }
    };

    React.useEffect(() => {
        const fetchData = async () => {
            const fornecedoresService = new FornecedoresService();
            const codigo_cidade = user?.codigo_cidade || 0;

            const data = await fornecedoresService.listFornecedores(codigo_cidade);
            const treatedData = fornecedoresTableHelper.treatData(data.data, { delete: handleDeleteFornecedor });
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
