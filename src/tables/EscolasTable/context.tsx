import React from "react";
import { pdf } from "@react-pdf/renderer";
import { ColumnWithLooseAccessor } from "react-table";

import { useAlertModal } from "hooks/AlertModal";
import { useError } from "hooks/Errors";
import { useAuth } from "contexts/Auth";
import { EscolasService } from "services/Escolas";
import { EscolaListObj, EscolaTableField } from "entities/Escola";
import { escolasTableHelper } from "./helper";
import { filesHelper } from "helpers/FilesHelper";

import TableDocument from "components/micro/Pdf/TableDocument";
import { Column } from "components/micro/Pdf/Global";

import { COLUMNS } from "./columns";

const pdfColumns = [
    { acessor: "nome", Header: "Nome", width: "25%" },
    { acessor: "localizacao", Header: "Localização", width: "12%" },
    { acessor: "gps", Header: "GPS", width: "8%" },
    { acessor: "nivel", Header: "Nível", width: "20%" },
    { acessor: "horario_funcionamento", Header: "Funcionamento", width: "10%" },
    { acessor: "qtd_alunos", Header: "N° Alunos", width: "10%" },
] as Column[];

type EscolasTableContextProps = {
    tableData: EscolaTableField[];
    selectedData: EscolaTableField[];
    columns: ColumnWithLooseAccessor<{}>[];
    handleSelectedData: (arr: EscolaTableField[]) => void;
    handleDeleteSelectedEscolas: () => void;
    handleExportExcel: () => void;
    handleExportPdf: () => void;
};

type EscolasTableProviderProps = {
    children: React.ReactNode;
};

const EscolasTableContext = React.createContext({} as EscolasTableContextProps);

const EscolasTableProvider = ({ children }: EscolasTableProviderProps) => {
    const { createModalAsync, createModal, incrementProgress, clearModal } = useAlertModal();
    const { errorHandler } = useError();
    const { user } = useAuth();

    const [tableData, setTableData] = React.useState<EscolaTableField[]>([]);
    const [selectedData, setSelectedData] = React.useState<EscolaTableField[]>([]);
    const columns = React.useMemo(() => COLUMNS, []);

    const handleSelectedData = (arr: EscolaTableField[]) => {
        setSelectedData(arr);
    };

    const handleDeleteSelectedEscolas = async () => {
        try {
            const { isConfirmed } = await createModalAsync("confirm_remove", { html: "Deseja remover os escolas selecionados?" });
            if (!isConfirmed) {
                return;
            }
            const codigo_cidade = user?.codigo_cidade || 0;
            const escolasService = new EscolasService();

            const errorStudents = [] as EscolaTableField[];
            const incrementValue = Number(100 / selectedData.length);
            createModal("progress");

            for (let escola of selectedData) {
                try {
                    await escolasService.deleteEscola(escola.id_escola, codigo_cidade);
                } catch (err) {
                    errorStudents.push(escola);
                }
                incrementProgress(incrementValue);
            }
            if (errorStudents.length > 0) {
                throw { message: errorStudents.map((escola) => `Não foi possível remover o(a) escola(a): ${escola.nome}`) };
            }
            await fetchData();
            createModal("success", { title: "Sucesso!", html: "Escolas removicos com sucesso" });
        } catch (err) {
            errorHandler(err, { title: "Falha ao remover Escolas" });
        }
    };

    const handleExportExcel = async () => {
        const xlsxData = [pdfColumns.map((val) => val.Header)].concat(selectedData.map((data) => pdfColumns.map((val) => data[val.acessor])));

        const blob = filesHelper.processXslxFile(xlsxData);

        filesHelper.downloadFile(blob, "Escolas.xlsx");
    };

    const handleExportPdf = async () => {
        try {
            createModal("loading");
            await filesHelper.delay(600);
            const blob = await pdf(
                <TableDocument
                    titleCity="Aparecida de Goiânia (Goiás)"
                    titleRecords={`${selectedData.length}/${tableData.length} Escolas Cadastradas`}
                    data={selectedData}
                    columns={pdfColumns}
                />,
            ).toBlob();
            filesHelper.downloadFile(blob, "Escolas.pdf");
            clearModal();
        } catch (err) {
            errorHandler(err, { title: "Falha ao fazer download do pdf" });
        }
    };

    const handleDeleteEscola = async (escola: EscolaListObj) => {
        try {
            const { isConfirmed } = await createModalAsync("confirm_remove", {
                html: `Deseja remover a Escola:<br /> <b>${escola.nome}</b>?`,
            });
            if (!isConfirmed) {
                return;
            }
            createModal();
            const escolasService = new EscolasService();
            const codigo_cidade = user?.codigo_cidade || 0;
            await escolasService.deleteEscola(escola.id_escola, codigo_cidade);
            clearModal();
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

    return (
        <EscolasTableContext.Provider
            value={{ tableData, columns, selectedData, handleSelectedData, handleDeleteSelectedEscolas, handleExportExcel, handleExportPdf }}
        >
            {children}
        </EscolasTableContext.Provider>
    );
};

const useEscolasTable = () => {
    const context = React.useContext(EscolasTableContext);
    if (!context) {
        throw new Error("useRotasTable deve ser usado entre um provider");
    }
    return context;
};

export { EscolasTableContext, EscolasTableProvider, useEscolasTable };
