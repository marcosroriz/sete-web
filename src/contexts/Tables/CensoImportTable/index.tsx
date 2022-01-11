import React from "react";
import { ColumnWithLooseAccessor } from "react-table";
import { CensoHelper } from "helpers/CensoHelper";
import { Aluno } from "entities/Aluno";
import { Escola } from "entities/Escola";
import { COLUMNS } from "./columns";

export type TableData = {
    id: string;
    nome: string;
    numero_alunos: number;
    alunos: Aluno[];
    escola: Escola;
};

export type CensoImportTableContextProps = {
    tableData: TableData[];
    columns: ColumnWithLooseAccessor<{}>[];
    parseCensoFile: (file: File) => void;
};
export type CensoImportTableProviderProps = {
    children: React.ReactNode;
};

export const CensoImportTableContext = React.createContext({} as CensoImportTableContextProps);

export const CensoImportTableProvider = ({ children }: CensoImportTableProviderProps) => {
    const [tableData, setTableData] = React.useState<TableData[]>([]);
    const columns = React.useMemo(() => COLUMNS, []);

    const createTable = (base: any) => {
        const censoHelper = new CensoHelper();
        const data = [] as TableData[];
        for (let [escolaId, escolaValues] of Object.entries<any>(base)) {
            let escolaData = {
                id: escolaId,
                nome: escolaValues["NOME"] as string,
                numero_alunos: Object.keys(escolaValues["ALUNOS"]).length,
                alunos: Object.values(escolaValues["ALUNOS"])?.map((alunoObj: any) => censoHelper.convertBaseToAluno(alunoObj, escolaId)),
                escola: censoHelper.convertBaseToEscola(escolaValues),
            };
            data.push(escolaData);
        }
        setTableData(data);
    };

    const parseCensoFile = (file: File) => {
        const censoHelper = new CensoHelper();
        censoHelper.parseBaseCenso(file, createTable, (err) => console.log(err));
    };

    return <CensoImportTableContext.Provider value={{ tableData, columns, parseCensoFile }}>{children}</CensoImportTableContext.Provider>;
};

export const useCensoImportTable = () => {
    const context = React.useContext(CensoImportTableContext);
    if (!context) {
        throw new Error("useCensoImportTable deve ser usado entre um provider");
    }
    return context;
};
