/**
 * Filtros das tabelas com react-table.
 */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";

export const ColumnFilter = ({ column: { filterValue, setFilter } }) => {
    return (
        <div className="table-header__container">
            <input
                value={filterValue || ""}
                onChange={(e) => {
                    setFilter(e.target.value || undefined);
                }}
                placeholder={"Procurar por nome*"}
                className="table-header__input form-control"
            />
        </div>
    );
};

export const SelectColumnFilter = ({ column: { filterValue, setFilter, preFilteredRows, id } }) => {
    const options = React.useMemo(() => {
        const options = new Set<any>();
        preFilteredRows.forEach((row: any[]) => {
            options.add(row.values[id]);
        });
        return [...Array.from(options.values())];
    }, [id, preFilteredRows]);

    // Render a multi-select box
    return (
        <div className="table-header__container">
            <select
                value={filterValue}
                onChange={(e) => {
                    setFilter(e.target.value || undefined);
                }}
                className="table-header__select"
            >
                <option value="">Sem filtro</option>
                {options.map((option, i) => (
                    <option key={i} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export const NumberRangeColumnFilter = ({ column: { filterValue = [], preFilteredRows, setFilter, id } }) => {
    const [min, max] = React.useMemo(() => {
        let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
        let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
        preFilteredRows.forEach((row: { values: { [x: string]: number } }) => {
            min = Math.min(row.values[id], min);
            max = Math.max(row.values[id], max);
        });
        return [min, max];
    }, [id, preFilteredRows]);

    return (
        <div className="table-header__container">
            <div
                style={{
                    display: "flex",
                    width: "80%",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <input
                    value={filterValue[0] || ""}
                    type="number"
                    onChange={(e) => {
                        const val = e.target.value;
                        setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]]);
                    }}
                    placeholder={"Min"}
                    className="table-header__input min form-control"
                    style={{ marginRight: "2px" }}
                />
                até
                <input
                    value={filterValue[1] || ""}
                    type="number"
                    onChange={(e) => {
                        const val = e.target.value;
                        setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined]);
                    }}
                    placeholder={"Max"}
                    className="table-header__input min form-control"
                    style={{ marginLeft: "2px" }}
                />
            </div>
        </div>
    );
};
