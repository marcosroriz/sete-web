/* eslint-disable react/display-name */
import React from "react";
import { ColumnWithLooseAccessor } from "react-table";
import { SelectColumnFilter, NumberRangeColumnFilter, ColumnFilter } from "helpers/Tables/columnFilters";

export const COLUMNS: ColumnWithLooseAccessor[] = [
    {
        Header: "NOME",
        accessor: "nome",
        disableFilters: true,
    },
    // {
    //     Header: "CPF",
    //     accessor: "cpf",
    //     disableFilters: true,
    // },
    // {
    //     Header: "TURNO",
    //     accessor: "turno",
    //     disableFilters: true,
    // },
    // {
    //     Header: "NIVEL",
    //     accessor: "nivel",
    //     disableFilters: true,
    // },
];
