/* eslint-disable react/display-name */
import React from "react";
import { ColumnWithLooseAccessor } from "react-table";
import { SelectColumnFilter, NumberRangeColumnFilter, ColumnFilter } from "helpers/Tables/columnFilters";
import { disable } from "ol/rotationconstraint";

export const COLUMNS: ColumnWithLooseAccessor[] = [
    {
        Header: "NOME",
        accessor: "nome",
        disableFilters: true,
    },
    {
        Header: "TELEFONE",
        accessor: "telefone",
        disableFilters: true,
    },
    {
        Header: "TURNO",
        accessor: "turno",
        Filter: SelectColumnFilter,
        filter: "includes",
    },
    {
        Header: "CNH",
        accessor: "cnh",
        disableFilters: true,
    },
    {
        Header: "VALIDADE DA CNH",
        accessor: "data_validade_cnh",
        disableFilters: true,
    },
    {
        Header: "NÚMERO DE ROTAS DIRIGIDAS",
        accessor: "rotas_dirigidas",
        disableFilters: true,
    },
    {
        Header: "AÇÕES",
        accessor: "acoes",
        disableFilters: true,
    },
];
