/* eslint-disable react/display-name */
import React from "react";
import { ColumnWithLooseAccessor } from "react-table";
import { FaUserAlt, FaSearch, FaEdit, FaRegTimesCircle } from "react-icons/fa";
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
        accessor: "capacidadeMaxima",
        Filter: NumberRangeColumnFilter,
        filter: "between",
    },
    {
        Header: "CAPACIDADE ATUAL",
        accessor: "capacidadeAtual",
        Filter: NumberRangeColumnFilter,
        filter: "between",
    },
    {
        Header: "ESTADO",
        accessor: "estado",
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
        Cell: () => (
            <span>
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
