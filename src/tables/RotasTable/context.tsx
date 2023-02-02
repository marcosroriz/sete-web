import React from "react";
import { ColumnWithLooseAccessor } from "react-table";

import { useAlertModal } from "hooks/AlertModal";
import { useError } from "hooks/Errors";
import { useAuth } from "contexts/Auth";
import { RotasService } from "services/Rotas";
import { RotasTableField, RotasListObj } from "entities/Rotas";

import { rotasTableHelper } from "./helper";
import { COLUMNS } from "./columns";

type RotasTableContextProps = {
    tableData: RotasTableField[];
    selectedData: RotasTableField[];
    columns: ColumnWithLooseAccessor<{}>[];
    handleSelectedData: (arr: RotasTableField[]) => void;
    handleDeleteSelectedRotas: () => void;
};

type RotasTableProviderProps = {
    children: React.ReactNode;
};

const RotasTableContext = React.createContext({} as RotasTableContextProps);

const RotasTableProvider = ({ children }: RotasTableProviderProps) => {
    const { createModalAsync, createModal, incrementProgress, clearModal } = useAlertModal();
    const { errorHandler } = useError();
    const { user } = useAuth();

    const [tableData, setTableData] = React.useState<RotasTableField[]>([]);
    const [selectedData, setSelectedData] = React.useState<RotasTableField[]>([]);
    const columns = React.useMemo(() => COLUMNS, []);

    const handleSelectedData = (arr: RotasTableField[]) => {
        setSelectedData(arr);
    };

    const handleDeleteSelectedRotas = async () => {
        try {
            const { isConfirmed } = await createModalAsync("confirm_remove", { html: "Deseja remover as rotas selecionadas?" });
            if (!isConfirmed) {
                return;
            }
            const codigo_cidade = user?.codigo_cidade || 0;
            const rotasService = new RotasService();

            const errorStudents = [] as RotasTableField[];
            const incrementValue = Number(100 / selectedData.length);
            createModal("progress");

            for (let rota of selectedData) {
                try {
                    await rotasService.deleteRota(rota.id_rota, codigo_cidade);
                } catch (err) {
                    errorStudents.push(rota);
                }
                incrementProgress(incrementValue);
            }
            if (errorStudents.length > 0) {
                throw { message: errorStudents.map((rota) => `Não foi possível remover a rota: ${rota.nome}`) };
            }
            await fetchData();
            createModal("success", { title: "Sucesso!", html: "Rotas removidas com sucesso" });
        } catch (err) {
            errorHandler(err, { title: "Erro ao remover Rotas" });
        }
    };

    const handleDeleteRota = async (rota: RotasListObj) => {
        try {
            const { isConfirmed } = await createModalAsync("confirm_remove", {
                html: `Deseja remover a Rota:<br /> <b>${rota.nome}</b>?`,
            });
            if (!isConfirmed) {
                return;
            }
            createModal();
            const rotasService = new RotasService();
            const codigo_cidade = user?.codigo_cidade || 0;
            await rotasService.deleteRota(rota.id_rota, codigo_cidade);
            clearModal();
        } catch (err) {
            errorHandler(err, { title: "Erro ao remover Rota" });
        }
    };

    const fetchData = async () => {
        const rotasService = new RotasService();
        const codigo_cidade = user?.codigo_cidade || 0;
        const data = await rotasService.listRotas(codigo_cidade);
        const treatedData = rotasTableHelper.treatData(data.data, { delete: handleDeleteRota });
        setTableData(treatedData);
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <RotasTableContext.Provider value={{ tableData, columns, selectedData, handleSelectedData, handleDeleteSelectedRotas }}>
            {children}
        </RotasTableContext.Provider>
    );
};

const useRotasTable = () => {
    const context = React.useContext(RotasTableContext);
    if (!context) {
        throw new Error("useEscolasTable deve ser usado entre um provider");
    }
    return context;
};

export { RotasTableContext, RotasTableProvider, useRotasTable };
