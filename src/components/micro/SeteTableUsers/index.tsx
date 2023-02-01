/**
 * Tabela Usuarios do SETE.
 * pages/dashboard/Usuarios
 */

import React, { useEffect } from "react";

import {
    CellProps,
    HeaderProps,
    Hooks,
    ColumnWithLooseAccessor,
    TableOptions,
    useFilters,
    usePagination,
    useRowSelect,
    useSortBy,
    useTable,
} from "react-table";

import { useLocalStorage } from "hooks/LocalStorage";

import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

import { TableContainer, Pagination } from "./styles";

import { useSelection } from "hooks/Table";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";
import { Button } from "react-bootstrap";
import { useAlertModal } from "hooks/AlertModal";
import { useError } from "hooks/Errors";
import { Link, useHistory } from "react-router-dom";
import Cadastrar from "pages/dashboard/Usuarios/Cadastrar";

const hooks = [useFilters, useSortBy, usePagination, useRowSelect, useSelection];

type SeteTableProps = {
    name: string;
    columns: ColumnWithLooseAccessor[];
    data: any[];
};

const SeteTableUsers: React.FC<SeteTableProps> = ({ name, columns, data, ...props }) => {
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

    const history = useHistory();
    const { errorHandler } = useError();
    const { createModalAsync } = useAlertModal();

    const handleFormAddUser = async () => {
        try {
            //const alertResponse = await createModalAsync("warning", {
            //  title: "Gostaria de cadastrar um novo usuário?",
            //   icon: "warning",
            //  showCancelButton: true,
            //  confirmButtonColor: "var(--color-red-500",
            //  confirmButtonText: "Sim, cadastrar",
            //  cancelButtonColor: "var(--color-grey-650)",
            //   cancelButtonText: "Não",
            //   reverseButtons: true,
            //});
            //  if (alertResponse.isConfirmed) {
        } catch (err) {
            errorHandler(err, { title: "Erro ao Cadastrar" });
        }
    };

    const handleCadastrarUsuarios = () => {
        history.push("/usuarios/cadastrar");
    };

    return (
        <TableContainer>
            <div className="componenteTabela">
                <div className="titulo">
                    Total de {name}
                    <span className="totalUsuarios ml-4">{data.length}</span>
                </div>
                <div className="btn-adicionar-usuario">
                    <ButtonsContainer position="center">
                        <Button variant="success" type="button" className="btn-fill" onClick={handleCadastrarUsuarios}>
                            Adicionar um novo usuário
                        </Button>
                    </ButtonsContainer>
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
export default SeteTableUsers;
