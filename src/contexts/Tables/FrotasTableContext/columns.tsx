/* eslint-disable react/display-name */
import React from "react";
import { ColumnWithLooseAccessor } from "react-table";
import { FaSearch, FaEdit, FaRegTimesCircle } from "react-icons/fa";
import { SelectColumnFilter, NumberRangeColumnFilter, ColumnFilter } from "components/micro/Table/columnFilter";

export const COLUMNS: ColumnWithLooseAccessor[] = [
    {
        Header: "PLACA",
        accessor: "placa",
        Filter: ColumnFilter,
    },
    {
        Header: "TIPO",
        accessor: "tipo",
        Filter: SelectColumnFilter,
        filter: "includes",
    },
    {
        Header: "MARCA",
        accessor: "marca",
        Filter: SelectColumnFilter,
        filter: "includes",
    },
    {
        Header: "MODELO",
        accessor: "modelo",
        Filter: SelectColumnFilter,
        filter: "includes",
    },
    {
        Header: "CAPACIDADE MÁXIMA",
        accessor: "capacidade",
        Filter: NumberRangeColumnFilter,
        filter: "between",
    },
    {
        Header: "EM MANUTENÇÃO",
        accessor: "manutencao",
        Filter: SelectColumnFilter,
        filter: "includes",
    },
    {
        Header: "ORIGEM",
        accessor: "origem",
        Filter: SelectColumnFilter,
        filter: "includes",
    },
    {
        Header: "AÇÕES",
        accessor: "acoes",
        disableFilters: true,
    },
];
