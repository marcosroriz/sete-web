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
        Header: "TELEFONE",
        accessor: "telefone",
        disableFilters: true,
    },
    {
        Header: "SERVIÇOS OFERECIDOS",
        accessor: "servicos_oferecidos",
        disableFilters: true,
    },
    {
        Header: "TOTAL DE SERVIÇOS REALIZADOS",
        accessor: "numero_servicos",
        disableFilters: true,
    },
    {
        Header: "AÇÕES",
        accessor: "acoes",
        disableFilters: true,
    },
];
