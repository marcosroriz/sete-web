import React from "react";
import { ColumnWithLooseAccessor } from "react-table";

import { AlunosService } from "services/Alunos";
import { EscolasService } from "services/Escolas";
import { AlunosTableField, AlunoListObj } from "entities/Aluno";

import { useAlertModal } from "hooks/AlertModal";
import { useError } from "hooks/Errors";
import { useAuth } from "contexts/Auth";
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
    const { createModalAsync } = useAlertModal();
    const { errorHandler } = useError();
    const { user } = useAuth();
    const [tableData, setTableData] = React.useState<AlunosTableField[]>([]);
    const columns = React.useMemo(() => COLUMNS, []);

    const handleDeleteAluno = async (escola: AlunoListObj) => {
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

            const alunosService = new AlunosService();
            const codigo_cidade = user?.codigo_cidade || 0;

            await alunosService.deleteAluno(escola.id_aluno, codigo_cidade);
        } catch (err) {
            errorHandler(err, { title: "Erro ao remover Aluno" });
        }
    };

    React.useEffect(() => {
        const fetchData = async () => {
            const alunosService = new AlunosService();
            const codigo_cidade = user?.codigo_cidade || 0;
            const response = await alunosService.listAlunos(codigo_cidade);
            const treatedData = alunosTableHelper.treatData(response.data, { delete: handleDeleteAluno });
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
