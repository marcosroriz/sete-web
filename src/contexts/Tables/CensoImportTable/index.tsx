import React from "react";
import { ColumnWithLooseAccessor } from "react-table";
import { CensoHelper } from "helpers/CensoHelper";
import { COLUMNS } from "./columns";
import { Aluno } from "entities/Aluno";
import { Escola } from "entities/Escola";

function ConverteAlunoParaREST(aluno: any, idEscola: string) {
    let alunoJSON = {
        id_escola: Number(idEscola),

        nome: aluno["NOME"], // string
        data_nascimento: aluno["DATA_NASCIMENTO"], // string
        nome_responsavel: aluno["NOME_RESPONSAVEL"],

        sexo: aluno["SEXO"], // int
        cor: aluno["COR"], // int

        mec_tp_localizacao: aluno["MEC_TP_LOCALIZACAO"],
        turno: aluno["TURNO"], // int
        nivel: aluno["NIVEL"],

        def_caminhar: aluno["DEF_CAMINHAR"] ? "S" : "N", // str
        def_ouvir: aluno["DEF_OUVIR"] ? "S" : "N", // str
        def_enxergar: aluno["DEF_ENXERGAR"] ? "S" : "N", // str
        def_mental: aluno["DEF_MENTAL"] ? "S" : "N", // str
    };

    if (aluno["mec_id_inep"]) alunoJSON["mec_id_inep"] = aluno["mec_id_inep"];
    if (aluno["mec_id_proprio"]) alunoJSON["mec_id_proprio"] = aluno["mec_id_proprio"];

    if (aluno["LOC_CEP"]) alunoJSON["loc_cep"] = aluno["LOC_CEP"];
    if (aluno["CPF"]) alunoJSON["cpf"] = String(aluno["CPF"]).replace(/\D/g, "");

    return alunoJSON;
}

function ConverteEscolaParaREST(escola) {
    let escolaJSON = Object.assign({}, escola);
    // Arrumando campos novos para os que já usamos.
    // Atualmente os campos são em caixa alta (e.g. NOME ao invés de nome)
    // Entretanto, a API está retornando valores em minúsculo
    for (let attr of Object.keys(escolaJSON)) {
        escolaJSON[attr.toLowerCase()] = escolaJSON[attr];
        delete escolaJSON[attr];
    }

    // Transforma de boolean para "S" / "N"
    let propParaTransformar = [
        "MEC_IN_REGULAR",
        "MEC_IN_EJA",
        "MEC_IN_PROFISSIONALIZANTE",
        "MEC_IN_ESPECIAL_EXCLUSIVA",
        "ENSINO_FUNDAMENTAL",
        "ENSINO_PRE_ESCOLA",
        "ENSINO_MEDIO",
        "ENSINO_SUPERIOR",
        "HORARIO_MATUTINO",
        "HORARIO_VESPERTINO",
        "HORARIO_NOTURNO",
    ];

    for (let prop of propParaTransformar) {
        escolaJSON[prop.toLowerCase()] = escolaJSON[prop.toLowerCase()] ? "S" : "N";
    }
    delete escolaJSON["alunos"];
    return escolaJSON;
}

export type TableData = {
    id: string;
    nome: string;
    numero_alunos: number;
    alunos: any;
    escola: any;
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
        const data = [] as TableData[];
        for (let [escolaId, escolaValues] of Object.entries<any>(base)) {
            let escolaData = {
                id: escolaId,
                nome: escolaValues["NOME"] as string,
                numero_alunos: Object.keys(escolaValues["ALUNOS"]).length,
                alunos: Object.values(escolaValues["ALUNOS"])?.map((alunoObj: any) => ConverteAlunoParaREST(alunoObj, escolaId)),
                escola: ConverteEscolaParaREST(escolaValues),
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
