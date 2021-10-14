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
        Header: "LOCALIZAÇÃO",
        accessor: "horario_matutino",
        Filter: SelectColumnFilter,
        filter: "includes",
    },
    {
        Header: "GPS",
        accessor: "ensino_fundamental",
        Filter: SelectColumnFilter,
        filter: "includes",
    },
    {
        Header: "NÍVEL",
        accessor: "ensino_medio",
        Filter: SelectColumnFilter,
        filter: "includes",
    },
    {
        Header: "HORÁRIO DE FUNCIONAMENTO",
        accessor: "ensino_pre_escola",
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
