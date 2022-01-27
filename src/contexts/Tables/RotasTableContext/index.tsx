import React from "react";
import { ColumnWithLooseAccessor } from "react-table";

import { useAlertModal } from "hooks/AlertModal";
import { useError } from "hooks/Errors";
import { useAuth } from "contexts/Auth";
import { RotasService } from "services/Rotas";
import { RotaTableField, RotaListObj } from "entities/Rota";
import { rotasTableHelper } from "helpers/Tables/RotasTableHelper";

import { COLUMNS } from "./columns";

type RotasTableContextProps = {
    tableData: RotaTableField[];
    columns: ColumnWithLooseAccessor<{}>[];
};

type RotasTableProviderProps = {
    children: React.ReactNode;
};

const RotasTableContext = React.createContext({} as RotasTableContextProps);

const RotasTableProvider = ({ children }: RotasTableProviderProps) => {
    const { createModalAsync } = useAlertModal();
    const { errorHandler } = useError();

    const { user } = useAuth();
    const [tableData, setTableData] = React.useState<RotaTableField[]>([]);
    const columns = React.useMemo(() => COLUMNS, []);

    // const handleDeleteRotas = async (rota: RotaListObj) => {
    //     try {
    //         const alertResponse = await createModalAsync("warning", {
    //             title: "Atenção!",
    //             html: `Deseja remover o Rotas:<br /> <b>${rota.nome}</b>?`,
    //             confirmButtonText: "Remover",
    //             confirmButtonColor: "var(--color-red-500)",
    //             showCancelButton: true,
    //             cancelButtonText: "Cancelar",
    //             cancelButtonColor: "var(--color-grey-650)",
    //             reverseButtons: true,
    //         });
    //         if (!alertResponse.isConfirmed) {
    //             return;
    //         }

    //         const rotasService = new RotasService();
    //         const codigo_cidade = user?.codigo_cidade || 0;

    //         await rotasService.deleteRota(rota.id_rota, codigo_cidade);
    //     } catch (err) {
    //         errorHandler(err, { title: "Erro ao remover Rotas" });
    //     }
    // };

    React.useEffect(() => {
        const fetchData = async () => {
            const rotasService = new RotasService();
            const codigo_cidade = user?.codigo_cidade || 0;
            const response = await rotasService.listRotas(codigo_cidade);
            const treatedData = rotasTableHelper.treatData(response.data);
            setTableData(treatedData);
        };
        fetchData();
    }, []);
    return <RotasTableContext.Provider value={{ tableData, columns }}>{children}</RotasTableContext.Provider>;
};

const useRotasTable = () => {
    const context = React.useContext(RotasTableContext);
    if (!context) {
        throw new Error("useEscolasTable deve ser usado entre um provider");
    }
    return context;
};

export { RotasTableContext, RotasTableProvider, useRotasTable };
