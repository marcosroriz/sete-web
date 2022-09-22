/**
 * Tabelas gerais do SETE.
 * pages/modules/{modulo}/Gerenciar ou /{modulo}/gerenciar
 */

import React from "react";

import { ColumnWithLooseAccessor, useFilters, usePagination, useRowSelect, useSortBy, useTable } from "react-table";

import { useLocalStorage } from "hooks/LocalStorage";

import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

import { TableContainer, Pagination } from "./styles";

import { useSelection } from "hooks/Table";

const hooks = [useFilters, useSortBy, usePagination, useRowSelect, useSelection];

type SeteTableProps = {
    name: string;
    columns: ColumnWithLooseAccessor[];
    data: any[];
    onSelectedDataChange?: (arr: any[]) => void;
};

const SeteTable: React.FC<SeteTableProps> = ({ name, columns, data, onSelectedDataChange, ...props }) => {
    const [initialState, setInitialState] = useLocalStorage(`tableState:${name}`, {});

    const instance = useTable(
        {
            ...props,
            columns: columns as any,
            data: data,
            initialState,
        },
        ...hooks,
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        selectedFlatRows,
        state: { pageIndex, pageSize, sortBy, filters },
    } = instance;

    React.useEffect(() => {
        const val = {
            sortBy,
            filters,
            pageSize,
        };
        setInitialState(val);
    }, [setInitialState]);

    React.useEffect(() => {
        if (onSelectedDataChange) {
            onSelectedDataChange(selectedFlatRows.map((d) => d.original));
        }
    }, [selectedFlatRows]);

    return (
        <TableContainer>
            <div className="componententeTabela">
                <div className="titulo">
                    Total de {name}
                    <span className="totalEscolas ml-4">{data.length}</span>
                </div>
                <div className="table-wrapper">
                    <table {...getTableProps()}>
                        <thead className="thead">
                            {headerGroups.map((headerGroup, i) => (
                                <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                                    {headerGroup.headers.map((column, j) => (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())} key={j}>
                                            {column.render("Header")}
                                            <span className="IconsSorting">
                                                {column.isSorted ? (
                                                    column.isSortedDesc ? (
                                                        <BsFillCaretUpFill size={10} />
                                                    ) : (
                                                        <BsFillCaretDownFill size={10} />
                                                    )
                                                ) : (
                                                    ""
                                                )}
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            ))}

                            {headerGroups.map((headerGroup, i) => (
                                <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                                    {headerGroup.headers.map((column, j) => (
                                        <th {...column.getHeaderProps()} key={j}>
                                            <div className="filter">{column.canFilter ? column.render("Filter") : null}</div>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>

                        <tbody {...getTableBodyProps()}>
                            {page.map((row, i) => {
                                prepareRow(row);
                                return (
                                    <tr
                                        {...row.getRowProps()}
                                        onClick={() => {
                                            row.toggleRowSelected();
                                        }}
                                        className={`${row.isSelected ? "selected" : "notSelected"}`}
                                        key={i}
                                    >
                                        {row.cells.map((cell, j) => {
                                            return (
                                                <td {...cell.getCellProps()} key={j}>
                                                    {cell.render("Cell")}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <Pagination>
                <div>
                    Mostrar
                    <select
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                        }}
                    >
                        {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>
                    por página
                </div>

                <div>
                    <span>
                        Ir para a página:
                        <input
                            type="number"
                            defaultValue={pageIndex + 1}
                            onChange={(e) => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                gotoPage(page);
                            }}
                        />
                    </span>
                    <div>
                        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                            {"Anterior"}
                        </button>
                        <span>
                            <strong>{pageIndex + 1}</strong>
                            de
                            <strong>{pageOptions.length}</strong>
                        </span>
                        <button onClick={() => nextPage()} disabled={!canNextPage}>
                            {"Próxima"}
                        </button>
                    </div>
                </div>
            </Pagination>
        </TableContainer>
    );
};

export default SeteTable;
