import React from "react";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { useTable, useGlobalFilter, usePagination, useRowSelect, useSortBy, ColumnWithLooseAccessor } from "react-table";

import { useSelection } from "hooks/Table";

import InputText from "../Inputs/InputText";

import { Container } from "./styles";

type ImportTableProps = {
    columns: ColumnWithLooseAccessor[];
    data: any[];
};

const ImportTable: React.FC<ImportTableProps> = ({ columns, data }) => {
    const instance = useTable(
        {
            columns,
            data,
        },
        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect,
        useSelection,
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
        state: { pageIndex, pageSize, globalFilter },
        setGlobalFilter,
    } = instance;

    return (
        <Container>
            <div className="import-table__top-filters">
                <div className="import-table__ipp">
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
                    <InputText value={globalFilter} onChange={(event) => setGlobalFilter(event.target.value)} placeholder="Procurar escolas" dontShowError />
                </div>
            </div>
            <table {...getTableProps()}>
                <thead className="thead">
                    {headerGroups.map((headerGroup, i) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                            {headerGroup.headers.map((column, j) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())} key={j}>
                                    {column.render("Header")}
                                    <span className="IconsSorting">
                                        {column.isSorted ? column.isSortedDesc ? <BsFillCaretUpFill size={10} /> : <BsFillCaretDownFill size={10} /> : ""}
                                    </span>
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
            <div className="import-table__pagination">
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
        </Container>
    );
};

export default ImportTable;
