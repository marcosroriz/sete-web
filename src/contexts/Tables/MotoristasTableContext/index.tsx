import React from "react";
import { ColumnWithLooseAccessor } from "react-table";

import { useAlertModal } from "hooks/AlertModal";
import { useError } from "hooks/Errors";
import { useAuth } from "contexts/Auth";
import { MotoristasService } from "services/Motoristas";
import { MotoristaTableField, MotoristaListObj } from "entities/Motorista";
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
    const { createModalAsync } = useAlertModal();
    const { errorHandler } = useError();

    const { user } = useAuth();
    const [tableData, setTableData] = React.useState<MotoristaTableField[]>([]);
    const columns = React.useMemo(() => COLUMNS, []);

    const handleDeleteMotorista = async (motorista: MotoristaListObj) => {
        try {
            const alertResponse = await createModalAsync("warning", {
                title: "Atenção!",
                html: `Deseja remover o Motorista:<br /> <b>${motorista.nome}</b>?`,
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

            const motoristasService = new MotoristasService();
            const codigo_cidade = user?.codigo_cidade || 0;

            await motoristasService.deleteMotorista(motorista.cpf, codigo_cidade);
        } catch (err) {
            errorHandler(err, { title: "Erro ao remover Motorista" });
        }
    };

    React.useEffect(() => {
        const fetchData = async () => {
            const motoristasService = new MotoristasService();
            const codigo_cidade = user?.codigo_cidade || 0;
            const response = await motoristasService.listMotoristas(codigo_cidade);
            const treatedData = motoristasTableHelper.treatData(response.data, { delete: handleDeleteMotorista });
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
