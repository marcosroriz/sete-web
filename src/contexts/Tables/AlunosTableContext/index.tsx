import React from "react";
import { pdf } from "@react-pdf/renderer";
import { ColumnWithLooseAccessor } from "react-table";
import { saveAs } from "file-saver";

import { AlunosService } from "services/Alunos";
import { AlunosTableField, AlunoListObj } from "entities/Aluno";

import { alunosTableHelper } from "helpers/Tables/AlunosTableHelper";
import { filesHelper } from "helpers/FilesHelper";

import { useAlertModal } from "hooks/AlertModal";
import { useError } from "hooks/Errors";
import { useAuth } from "contexts/Auth";

import TableDocument from "components/micro/Pdf/TableDocument";
import { Column } from "components/micro/Pdf/Global";

import { COLUMNS } from "./columns";

const pdfColumns = [
    { acessor: "nome", Header: "Nome", width: "25%" },
    { acessor: "localizacao", Header: "Localização", width: "12%" },
    { acessor: "gps", Header: "GPS", width: "8%" },
    { acessor: "escola", Header: "Escola", width: "20%" },
    { acessor: "nivel", Header: "Nível", width: "20%" },
    { acessor: "turno", Header: "Turno", width: "10%" },
] as Column[];

type AlunosTableContextProps = {
    tableData: AlunosTableField[];
    selectedData: AlunosTableField[];
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
    const { createModalAsync, createModal, clearModal, incrementProgress } = useAlertModal();
    const { errorHandler } = useError();
    const { user } = useAuth();
    const [tableData, setTableData] = React.useState<AlunosTableField[]>([]);
    const [selectedData, setSelectedData] = React.useState<AlunosTableField[]>([]);
    const columns = React.useMemo(() => COLUMNS, []);

    const handleSelectedData = (arr: AlunosTableField[]) => {
        setSelectedData(arr);
    };

    const handleDeleteSelectedAlunos = async () => {
        try {
            const { isConfirmed } = await createModalAsync("confirm_remove", { html: "Deseja remover os alunos selecionados?" });
            if (!isConfirmed) {
                return;
            }
            const codigo_cidade = user?.codigo_cidade || 0;
            const alunosService = new AlunosService();

            const errorStudents = [] as AlunosTableField[];
            const incrementValue = Number(100 / selectedData.length);
            createModal("progress");

            for (let aluno of selectedData) {
                try {
                    await alunosService.deleteAluno(aluno.id_aluno, codigo_cidade);
                } catch (err) {
                    errorStudents.push(aluno);
                }
                incrementProgress(incrementValue);
            }
            if (errorStudents.length > 0) {
                throw { message: errorStudents.map((aluno) => `Não foi possível remover o(a) aluno(a): ${aluno.nome}`) };
            }
            await fetchData();
            createModal("success", { title: "Sucesso!", html: "Alunos removicos com sucesso" });
        } catch (err) {
            errorHandler(err, { title: "Falha ao remover Alunos" });
        }
    };

    const handleExportExcel = async () => {
        const xlsxData = [pdfColumns.map((val) => val.Header)].concat(selectedData.map((data) => pdfColumns.map((val) => data[val.acessor])));

        const blob = filesHelper.processXslxFile(xlsxData);

        saveAs(blob, "Alunos.xlsx");
    };

    const handleExportPdf = async () => {
        try {
            createModal("loading");
            await filesHelper.delay(600);
            const blob = await pdf(
                <TableDocument
                    titleCity="Aparecida de Goiânia (Goiás)"
                    titleRecords={`${selectedData.length}/${tableData.length} Alunos Cadastrados`}
                    data={selectedData}
                    columns={pdfColumns}
                />,
            ).toBlob();
            saveAs(blob, "Alunos.pdf");
            clearModal();
        } catch (err) {
            errorHandler(err, { title: "Falha ao fazer download do pdf" });
        }
    };

    const handleDeleteAluno = async (aluno: AlunoListObj) => {
        try {
            const { isConfirmed } = await createModalAsync("confirm_remove", {
                html: `Deseja remover o(a) Aluno:<br /> <b>${aluno.nome}</b>?`,
            });
            if (!isConfirmed) {
                return;
            }
            createModal();

            const alunosService = new AlunosService();
            const codigo_cidade = user?.codigo_cidade || 0;

            await alunosService.deleteAluno(aluno.id_aluno, codigo_cidade);
            await fetchData();
            clearModal();
        } catch (err) {
            errorHandler(err, { title: "Erro ao remover Aluno" });
        }
    };

    const fetchData = async () => {
        const alunosService = new AlunosService();
        const codigo_cidade = user?.codigo_cidade || 0;
        const response = await alunosService.listAlunos(codigo_cidade);
        const treatedData = alunosTableHelper.treatData(response.data, { delete: handleDeleteAluno });
        setTableData(treatedData);
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <AlunosTableContext.Provider
            value={{
                tableData,
                selectedData,
                columns,
                handleSelectedData,
                handleDeleteSelectedAlunos,
                handleExportExcel,
                handleExportPdf,
            }}
        >
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
