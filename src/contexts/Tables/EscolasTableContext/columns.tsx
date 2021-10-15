/* eslint-disable react/display-name */
import React from "react";
import { ColumnWithLooseAccessor } from "react-table";
import { SelectColumnFilter, NumberRangeColumnFilter, ColumnFilter } from "helpers/Tables/columnFilters";

export const COLUMNS: ColumnWithLooseAccessor[] = [
    {
        Header: "NOME",
        accessor: "nome",
        Filter: ColumnFilter,
    },
    {
        Header: "LOCALIZAÇÃO",
        accessor: "localizacao",
        Filter: SelectColumnFilter,
        filter: "includes",
    },
    {
        Header: "GPS",
        accessor: "gps",
        Filter: SelectColumnFilter,
        filter: "includes",
    },
    {
        Header: "NÍVEL",
        accessor: "horario_matutino",
        Filter: SelectColumnFilter,
        filter: "includes",
    },
    {
        Header: "HORÁRIO DE FUNCIONAMENTO",
        accessor: "horario_funcionamento",
        Filter: SelectColumnFilter,
        filter: "between",
    },
    {
        Header: "QUANTIDADE DE ALUNOS",
        accessor: "qtd_alunos",
        Filter: NumberRangeColumnFilter,
        filter: "between",
    },
    {
        Header: "AÇÕES",
        accessor: "acoes",
        disableFilters: true,
    },
];
