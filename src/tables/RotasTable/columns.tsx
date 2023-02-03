import React from "react";
import { ColumnWithLooseAccessor } from "react-table";
import { SelectColumnFilter, NumberRangeColumnFilter, ColumnFilter } from "helpers/Tables/columnFilters";

export const COLUMNS: ColumnWithLooseAccessor[] = [
    {
        Header: "NOME",
        accessor: "nome",
        disableFilters: true,
    },
    {
        Header: "GPS",
        accessor: "gps",
        disableFilters: true,
    },
    {
        Header: "QUILOMETRAGEM",
        accessor: "km",
        disableFilters: true,
    },
    {
        Header: "TURNO",
        accessor: "turno",
        disableFilters: true,
    },
    {
        Header: "ESCOLAS ATENDITAS",
        accessor: "escolas_atendidas",
        disableFilters: true,
    },
    {
        Header: "ALUNOS ATENDIDOS",
        accessor: "alunos_atendidos",
        disableFilters: true,
    },
    {
        Header: "AÇÕES",
        accessor: "acoes",
        disableFilters: true,
    },
];
