import React from "react";
import { Hooks } from "react-table";

export const useSelection = (hooks: Hooks<any>) => {
    hooks.allColumns.push((columns) => [
        {
            id: "_selector",
            width: 45,

            // eslint-disable-next-line react/display-name
            Header: ({ getToggleAllRowsSelectedProps }) => <input type="checkbox" {...getToggleAllRowsSelectedProps()} />,

            // eslint-disable-next-line react/display-name
            Cell: ({ row }) => <input type="checkbox" {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
    ]);
};
