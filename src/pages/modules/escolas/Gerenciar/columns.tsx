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
        Cell: () => (
            <span>
                <button
                    style={{
                        border: "none",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                    }}
                    onClick={() => console.log("Clicou1")}
                >
                    <FaUserAlt size={"18px"} color={"#1dc7ea"} />
                </button>
                <button
                    style={{
                        border: "none",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                    }}
                    onClick={() => console.log("Clicou2")}
                >
                    <FaSearch size={"18px"} color={"gray"} />
                </button>
                <button
                    style={{
                        border: "none",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                    }}
                    onClick={() => console.log("Clicou3")}
                >
                    <FaEdit size={"18px"} color={"orange"} />
                </button>
                <button
                    style={{
                        border: "none",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                    }}
                    onClick={() => console.log("Clicou4")}
                >
                    <FaRegTimesCircle size={"17px"} color={"red"} />
                </button>
            </span>
        ),
    },
];
