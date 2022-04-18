import React from "react";
import { ColumnWithLooseAccessor } from "react-table";

import { UsuariosService } from "services/Usuarios";
import { UsersTableField, UserListObj } from "entities/User";

import { useAlertModal } from "hooks/AlertModal";
import { useError } from "hooks/Errors";
import { useAuth } from "contexts/Auth";

import { COLUMNS } from "./columns";
import { usuariosTableHelper } from "helpers/Tables/UsuariosTableHelper";

type UsuariosTableContextProps = {
    tableData: UsersTableField[];
    columns: ColumnWithLooseAccessor<{}>[];
};

type UsuariosTableProviderProps = {
    children: React.ReactNode;
};

const UsuariosTableContext = React.createContext({} as UsuariosTableContextProps);

const UsuariosTableProvider = ({ children }: UsuariosTableProviderProps) => {
    const { createModalAsync } = useAlertModal();
    const { errorHandler } = useError();
    const { user } = useAuth();
    const [tableData, setTableData] = React.useState<UsersTableField[]>([]);
    const columns = React.useMemo(() => COLUMNS, []);

    const handleDeleteUser = async (usuario: UserListObj) => {
        try {
            const alertResponse = await createModalAsync("warning", {
                title: "Atenção!",
                html: `Deseja remover o Usuário:<br /> <b>${usuario.nome}</b>?`,
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

            const usuariosService = new UsuariosService();
            const codigo_cidade = user?.codigo_cidade || 0;

            await usuariosService.deleteUser(usuario.id_usuario, codigo_cidade);
        } catch (err) {
            errorHandler(err, { title: "Erro ao remover Usuário" });
        }
    };

    React.useEffect(() => {
        const fetchData = async () => {
            const usuariosService = new UsuariosService();
            const codigo_cidade = user?.codigo_cidade || 0;
            const response = await usuariosService.listUsers(codigo_cidade);
            const treatedData = usuariosTableHelper.treatData(response.data, { delete: handleDeleteUser });
            setTableData(treatedData);
        };

        fetchData();
    }, []);

    return <UsuariosTableContext.Provider value={{ tableData, columns }}>{children}</UsuariosTableContext.Provider>;
};

const useUsuariosTable = () => {
    const context = React.useContext(UsuariosTableContext);

    if (!context) {
        throw new Error("useUsuariosTable deve ser usado entre um provider");
    }
    return context;
};

export { UsuariosTableContext, UsuariosTableProvider, useUsuariosTable };
