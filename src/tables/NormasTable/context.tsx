import React from "react";
import { pdf } from "@react-pdf/renderer";
import { ColumnWithLooseAccessor } from "react-table";

import { useAlertModal } from "hooks/AlertModal";
import { useError } from "hooks/Errors";
import { useAuth } from "contexts/Auth";
import { NormasService } from "services/Norma";
import { NormaListObj, NormaTableField } from "entities/Norma";
import { normasTableHelper } from "./helper";
import { filesHelper } from "helpers/FilesHelper";

import TableDocument from "components/micro/Pdf/TableDocument";
import { Column } from "components/micro/Pdf/Global";

import { COLUMNS } from "./columns";

const pdfColumns = [
    { acessor: "data", Header: "Data", width: "25%" },
    { acessor: "tipo", Header: "Tipo", width: "25%" },
    { acessor: "titulo", Header: "Titulo", width: "50%" },
] as Column[];

type NormasTableContextProps = {
    tableData: NormaTableField[];
    selectedData: NormaTableField[];
    columns: ColumnWithLooseAccessor<{}>[];
    handleSelectedData: (arr: NormaTableField[]) => void;
    handleDeleteSelectedNormas: () => void;
    handleExportExcel: () => void;
    handleExportPdf: () => void;
};

type NormasTableProviderProps = {
    children: React.ReactNode;
};

const NormasTableContext = React.createContext({} as NormasTableContextProps);

const NormasTableProvider = ({ children }: NormasTableProviderProps) => {
    const { createModalAsync, createModal, incrementProgress, clearModal } = useAlertModal();
    const { errorHandler } = useError();
    const { user } = useAuth();

    const [tableData, setTableData] = React.useState<NormaTableField[]>([]);
    const [selectedData, setSelectedData] = React.useState<NormaTableField[]>([]);
    const columns = React.useMemo(() => COLUMNS, []);

    const handleSelectedData = (arr: NormaTableField[]) => {
        setSelectedData(arr);
    };

    const handleDeleteSelectedNormas = async () => {
        try {
            const { isConfirmed } = await createModalAsync("confirm_remove", { html: "Deseja remover os escolas selecionados?" });
            if (!isConfirmed) {
                return;
            }
            const codigo_cidade = user?.codigo_cidade || 0;
            const normasService = new NormasService();

            const errorStudents = [] as NormaTableField[];
            const incrementValue = Number(100 / selectedData.length);
            createModal("progress");

            for (let norma of selectedData) {
                try {
                    await normasService.deleteNorma(norma.id_norma, codigo_cidade);
                } catch (err) {
                    errorStudents.push(norma);
                }
                incrementProgress(incrementValue);
            }
            if (errorStudents.length > 0) {
                throw { message: errorStudents.map((norma) => `Não foi possível remover a norma: ${norma.titulo}`) };
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

    const handleDeleteNorma = async (norma: NormaListObj) => {
        try {
            const { isConfirmed } = await createModalAsync("confirm_remove", {
                html: `Deseja remover a Normas:<br /> <b>${norma.titulo}</b>?`,
            });
            if (!isConfirmed) {
                return;
            }
            createModal();
            const normasService = new NormasService();
            const codigo_cidade = user?.codigo_cidade || 0;
            await normasService.deleteNorma(norma.id, codigo_cidade);
            clearModal();
        } catch (err) {
            errorHandler(err, { title: "Erro ao remover Escola" });
        }
    };

    const fetchData = async () => {
        const normasService = new NormasService();
        const codigo_cidade = user?.codigo_cidade || 0;
        const data = await normasService.listNormas(codigo_cidade);
        const treatedData = normasTableHelper.treatData(data.data, { delete: handleDeleteNorma });
        console.log("listNormas", treatedData);
        setTableData(treatedData);
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <NormasTableContext.Provider
            value={{ tableData, columns, selectedData, handleSelectedData, handleDeleteSelectedNormas, handleExportExcel, handleExportPdf }}
        >
            {children}
        </NormasTableContext.Provider>
    );
};

const useNormasTable = () => {
    const context = React.useContext(NormasTableContext);
    if (!context) {
        throw new Error("useNormasTable deve ser usado entre um provider");
    }
    return context;
};

export { NormasTableContext, NormasTableProvider, useNormasTable };
