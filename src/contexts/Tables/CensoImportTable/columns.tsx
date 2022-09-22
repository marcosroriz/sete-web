/* eslint-disable react/display-name */
import React from "react";
import { ColumnWithLooseAccessor } from "react-table";
import { SelectColumnFilter, NumberRangeColumnFilter, ColumnFilter } from "helpers/Tables/columnFilters";

export const COLUMNS: ColumnWithLooseAccessor[] = [
    {
        Header: "NOME DA ESCOLA",
        accessor: "nome",
    },
    {
        Header: "NUM. DE ALUNOS QUE USAM O TRANSPORTE ESCOLAR",
        accessor: "numero_alunos",
    },
];
