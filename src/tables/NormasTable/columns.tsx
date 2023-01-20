/* eslint-disable react/display-name */
import React from "react";
import { ColumnWithLooseAccessor } from "react-table";
import { SelectColumnFilter, ColumnFilter } from "helpers/Tables/columnFilters";

export const COLUMNS: ColumnWithLooseAccessor[] = [
    {
        Header: "DATA",
        accessor: "data",
        disableFilters: true,
    },
    {
        Header: "TIPO",
        accessor: "tipo",
        Filter: SelectColumnFilter,
        filter: "includes",
    },
    {
        Header: "TÍTULO",
        accessor: "titulo",
        Filter: ColumnFilter,
        filter: "includes",
    },
    {
        Header: "AÇÕES",
        accessor: "acoes",
        disableFilters: true,
    },
];
