/**
 * Hooks customizados do react-table.
 */

import React from "react";
import { Hooks } from "react-table";

export const useSelection = (hooks: Hooks<any>) => {
    hooks.allColumns.push((columns) => [
        {
            id: "_selector",
            width: 45,

            // eslint-disable-next-line react/display-name
            Header: ({ getToggleAllRowsSelectedProps }) => {
                const props = { ...getToggleAllRowsSelectedProps(), indeterminate: getToggleAllRowsSelectedProps()?.indeterminate?.toString() };
                return <input type="checkbox" {...props} />;
            },

            // eslint-disable-next-line react/display-name
            Cell: ({ row }) => {
                const props = { ...row.getToggleRowSelectedProps(), indeterminate: row.getToggleRowSelectedProps()?.indeterminate?.toString() };
                return <input type="checkbox" {...props} />;
            },
        },
        ...columns,
    ]);
};
