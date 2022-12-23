import React from "react";
import { ColumnWithLooseAccessor } from "react-table";

import { AdminTableField, AdminListObj } from "entities/Admins";
import { useAlertModal } from "hooks/AlertModal";
import { useAuth } from "contexts/Auth";
import { AdminsService } from "services/Admins";
import { adminsTableHelper } from "./helper";
import { useError } from "hooks/Errors";
import { COLUMNS } from "./columns";

type AdminsTableContextProps = {
    tableData: AdminTableField[];
    selectedData: AdminTableField[];
    columns: ColumnWithLooseAccessor<{}>[];
    handleSelectedData: (arr: AdminTableField[]) => void;
    handleDeleteSelectedAdmins: () => void;
};

type AdminsTableProviderProps = {
    children: React.ReactNode;
};

const AdminsTableContext = React.createContext({} as AdminsTableContextProps);

const AdminsTableProvider = ({ children }: AdminsTableProviderProps) => {
    const { user } = useAuth();
    const { errorHandler } = useError();
    const columns = React.useMemo(() => COLUMNS, []);
    const { createModalAsync, createModal, clearModal, incrementProgress } = useAlertModal();
    const [selectedData, setSelectedData] = React.useState<AdminTableField[]>([]);
    const [tableData, setTableData] = React.useState<AdminTableField[]>([]);

    const handleSelectedData = (arr: AdminTableField[]) => {
        setSelectedData(arr);
    };

    const handleDeleteSelectedAdmins = async () => {
        try {
            const { isConfirmed } = await createModalAsync("confirm_remove", { html: "Deseja remover esse Usuário?" });

            if (!isConfirmed) {
                return;
            }
            const codigo_cidade = user?.codigo_cidade || 0;
            const adminsService = new AdminsService();

            const errorAdmins = [] as AdminTableField[];
            const incrementValue = Number(100 / selectedData.length);
            createModal("progress");
            for (let admin of selectedData) {
                try {
                    await adminsService.deleteAdmin(admin.id_admin, codigo_cidade);
                } catch (err) {
                    errorAdmins.push(admin);
                }
                incrementProgress(incrementValue);
            }

            if (errorAdmins.length > 0) {
                throw { message: errorAdmins.map((admin) => `Não foi possível remover o Usuário: ${admin.nome}`) };
            }
            await fetchData();
            createModal("success", { title: "Sucesso", html: "Usuários removidos com sucesso!" });
        } catch (err) {
            errorHandler(err, { title: "Falha ao deletar Usuários." });
        }
    };
    const fetchData = async () => {
        const adminsService = new AdminsService();
        const codigo_cidade = user?.codigo_cidade || 0;
        const response = await adminsService.listAdmin(codigo_cidade);
        const treatedData = adminsTableHelper.treatData(response.data, { delete: handleDeleteAdmin });
        setTableData(treatedData);
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteAdmin = async (admin: AdminListObj) => {
        try {
            const { isConfirmed } = await createModalAsync("confirm_remove", { html: `Deseja remover o Usuário: <br /> <b> ${admin.nome}<b> ?` });

            if (!isConfirmed) {
                return;
            }
            createModal();

            const adminsService = new AdminsService();
            const codigo_cidade = user?.codigo_cidade || 0;

            await adminsService.deleteAdmin(admin.id_admin, codigo_cidade);
            await fetchData();
            clearModal();
        } catch (err) {
            errorHandler(err, { title: "Falha ao deletar Usuário." });
        }
    };

    return (
        <AdminsTableContext.Provider
            value={{
                tableData,
                selectedData,
                columns,
                handleSelectedData,
                handleDeleteSelectedAdmins,
            }}
        >
            {children}
        </AdminsTableContext.Provider>
    );
};

const useAdminsTable = () => {
    const context = React.useContext(AdminsTableContext);

    if (!context) {
        throw new Error("useAdminsTable deve ser usado entre um provider");
    }
    return context;
};

export { AdminsTableContext, AdminsTableProvider, useAdminsTable };
