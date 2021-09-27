/* eslint-disable react/display-name */
/* eslint-disable react/jsx-key */
import React, { PropsWithChildren, ReactElement, useEffect } from "react";

import { CellProps, HeaderProps, Hooks, TableOptions, useFilters, useFlexLayout, usePagination, useRowSelect, useSortBy, useTable } from "react-table";

import { useLocalStorage } from "./useLocalStorage";

import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

import { Styles, Pagination } from "./styles";

export interface TableProperties<T extends Record<string, unknown>> extends TableOptions<T> {
    name: string;
}

const selectionHook = (hooks: Hooks<any>) => {
    hooks.allColumns.push((columns) => [
        {
            id: "_selector",
            width: 45,
            Header: ({ getToggleAllRowsSelectedProps }: HeaderProps<any>) => <input type="checkbox" {...getToggleAllRowsSelectedProps()} />,
            Cell: ({ row }: CellProps<any>) => <input type="checkbox" {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
    ]);
};

const hooks = [useFilters, useSortBy, useFlexLayout, usePagination, useRowSelect, selectionHook];

function TableComponent<T extends Record<string, unknown>>(props: PropsWithChildren<TableProperties<T>>): ReactElement {
    const { columns, data } = props;

    const [initialState, setInitialState] = useLocalStorage(`tableState:${name}`, {});

    const instance = useTable<T>(
        {
            ...props,
            columns: columns,
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
        state: { pageIndex, pageSize, sortBy, filters },
    } = instance;

    useEffect(() => {
        const val = {
            sortBy,
            filters,
            pageSize,
        };
        setInitialState(val);
    }, [setInitialState]);

    return (
        <>
            <Styles>
                <div className="componententeTabela">
                    <div className="titulo">
                        Total de escolas
                        <span className="totalEscolas ml-4">{data.length}</span>
                    </div>
                    <div className="table-wrapper">
                        <table {...getTableProps()}>
                            <thead className="thead">
                                {headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => (
                                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
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

                                {headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => (
                                            <th {...column.getHeaderProps()}>
                                                <div className="filter">{column.canFilter ? column.render("Filter") : null}</div>
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>

                            <tbody {...getTableBodyProps()}>
                                {page.map((row) => {
                                    prepareRow(row);
                                    return (
                                        <tr
                                            {...row.getRowProps()}
                                            onClick={() => {
                                                row.toggleRowSelected();
                                            }}
                                            className={`${row.isSelected ? "selected" : "notSelected"}`}
                                        >
                                            {row.cells.map((cell) => {
                                                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
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
                            Ir para a página:{" "}
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
            </Styles>
        </>
    );
}

export default TableComponent;
