/* eslint-disable react/display-name */
import React from "react";
import { ColumnWithLooseAccessor } from "react-table";
import { SelectColumnFilter, NumberRangeColumnFilter, ColumnFilter } from "helpers/Tables/columnFilters";

export const COLUMNS: ColumnWithLooseAccessor[] = [
    {
        Header: "NOME",
        accessor: "nome",
        Filter: ColumnFilter,
        width: "100px",
    },
    {
        Header: "CPF",
        accessor: "cpf",
        disableFilters: true,
    },
    {
        Header: "EMAIL",
        accessor: "email",
        disableFilters: true,
    },
    {
        Header: "PAPEL",
        accessor: "papel",
        disableFilters: true,
    },
    {
        Header: "AÇÕES",
        accessor: "acoes",
        disableFilters: true,
    },
];
