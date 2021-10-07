/* eslint-disable react/display-name */
import React from "react";
import { ColumnWithLooseAccessor } from "react-table";
import { FaUserAlt, FaSearch, FaEdit, FaRegTimesCircle } from "react-icons/fa";
import { SelectColumnFilter, NumberRangeColumnFilter, ColumnFilter } from "components/micro/Table/columnFilter";

export const COLUMNS: ColumnWithLooseAccessor[] = [
    {
        Header: "NOME",
        accessor: "nome",
        Filter: ColumnFilter,
    },
    {
        Header: "LOCALIZAÇÃO ",
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
        Header: "NÍVEL",
        accessor: "nivel",
        Filter: SelectColumnFilter,
        filter: "includes",
    },
    {
        Header: "HORÁRIO DE FUNCIONAMENTO",
        accessor: "horario",
        Filter: SelectColumnFilter,
    },
    {
        Header: "QUANTIDADE DE ALUNOS",
        accessor: "quantAlunos",
        Filter: NumberRangeColumnFilter,
        filter: "between",
    },
    {
        Header: "AÇÕES",
        accessor: "acoes",
        disableFilters: true,
    },
];
