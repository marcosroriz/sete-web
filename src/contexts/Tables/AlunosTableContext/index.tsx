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
    handleSelectedData: (arr: AlunosTableField[]) => void;
    handleDeleteSelectedAlunos: () => void;
    handleExportExcel: () => void;
    handleExportPdf: () => void;
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
    const [selectedData, setSelectedData] = React.useState<AlunosTableField[]>([]);
    const columns = React.useMemo(() => COLUMNS, []);

    const handleSelectedData = (arr: AlunosTableField[]) => {
        setSelectedData(arr);
    };

    const handleDeleteSelectedAlunos = async () => {
        // Confirmação para deletar usuário.
        // Delete selectedData.
    };

    const handleExportExcel = async () => {
        // Abrir local para salvar.
    };

    const handleExportPdf = async () => {
        // Abrir local para salvar pdf.
    };

    const handleDeleteAluno = async (escola: AlunoListObj) => {
        try {
            const alertResponse = await createModalAsync("confirm_remove", {
                html: `Deseja remover a Escola:<br /> <b>${escola.nome}</b>?`,
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

    return (
        <AlunosTableContext.Provider value={{ tableData, columns, handleSelectedData, handleDeleteSelectedAlunos, handleExportExcel, handleExportPdf }}>
            {children}
        </AlunosTableContext.Provider>
    );
};

const useAlunosTable = () => {
    const context = React.useContext(AlunosTableContext);

    if (!context) {
        throw new Error("useAlunosTable deve ser usado entre um provider");
    }
    return context;
};

export { AlunosTableContext, AlunosTableProvider, useAlunosTable };
