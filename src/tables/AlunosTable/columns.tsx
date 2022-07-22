import React from "react";
import { ColumnWithLooseAccessor } from "react-table";
import { SelectColumnFilter, ColumnFilter } from "helpers/Tables/columnFilters";

export const COLUMNS: ColumnWithLooseAccessor[] = [
    {
        Header: "NOME",
        accessor: "nome",
        Filter: ColumnFilter,
        width: "100px",
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
        Header: "ESCOLA",
        accessor: "escola",
        Filter: SelectColumnFilter,
        filter: "includes",
    },
    {
        Header: "NÍVEL",
        accessor: "nivel",
        Filter: SelectColumnFilter,
        filter: "between",
    },
    {
        Header: "TURNO",
        accessor: "turno",
        Filter: SelectColumnFilter,
        filter: "between",
    },
    {
        Header: "Rota",
        accessor: "rota",
        Filter: SelectColumnFilter,
        filter: "between",
    },
    {
        Header: "AÇÕES",
        accessor: "acoes",
        disableFilters: true,
    },
];
