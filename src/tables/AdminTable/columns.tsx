import { ColumnWithLooseAccessor } from "react-table";
import { SelectColumnFilter, ColumnFilter } from "helpers/Tables/columnFilters";

export const COLUMNS: ColumnWithLooseAccessor[] = [
    {
        Header: "NOME",
        accessor: "nome",
        Filter: ColumnFilter,
        filter: "between",
    },
    {
        Header: "CPF",
        accessor: "cpf",
        disableFilters: true,
    },
    {
        Header: "EMAIL",
        accessor: "email",
        disableFilters: true,
    },
    {
        Header: "PAPEL",
        accessor: "papel",
        Filter: SelectColumnFilter,
        filter: "includes",
    },
    {
        Header: "AÇÕES",
        accessor: "acoes",
        disableFilters: true,
    },
];
