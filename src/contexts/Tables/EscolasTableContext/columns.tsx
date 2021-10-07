/* eslint-disable react/display-name */
import React from "react";
import { ColumnWithLooseAccessor } from "react-table";
import { SelectColumnFilter, NumberRangeColumnFilter, ColumnFilter } from "components/micro/Table/columnFilter";

export const COLUMNS: ColumnWithLooseAccessor[] = [
    {
        Header: "NOME",
        accessor: "nome",
        Filter: ColumnFilter,
    },
    {
        Header: "HORÁRIO MATUTINO - TESTE",
        accessor: "horario_matutino",
        Filter: SelectColumnFilter,
        filter: "includes",
    },
    {
        Header: "FUNDAMENTAL - TESTE",
        accessor: "ensino_fundamental",
        Filter: SelectColumnFilter,
        filter: "includes",
    },
    {
        Header: "MÉDIO - TESTE",
        accessor: "ensino_medio",
        Filter: SelectColumnFilter,
        filter: "includes",
    },
    {
        Header: "ALUNOS",
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
