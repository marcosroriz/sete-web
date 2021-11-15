/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";

export const ColumnFilter = ({ column: { filterValue, setFilter } }) => {
    return (
        <input
            value={filterValue || ""}
            onChange={(e) => {
                setFilter(e.target.value || undefined);
            }}
            placeholder={"Procurar por nome*"}
            style={{
                width: "81%",
                padding: "5% 0",
                paddingLeft: "5%",
                backgroundColor: "white",
                border: "2px solid #C8C8C8",
                borderRadius: "6px",
                color: "gray",
            }}
        />
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
        <select
            value={filterValue}
            onChange={(e) => {
                setFilter(e.target.value || undefined);
            }}
            style={{
                width: "70%",
                padding: "5% 0",
                paddingLeft: "5%",
                backgroundColor: "white",
                border: "2px solid #C8C8C8",
                borderRadius: "6px",
                color: "gray",
            }}
        >
            <option value="">Sem filtro</option>
            {options.map((option, i) => (
                <option key={i} value={option}>
                    {option}
                </option>
            ))}
        </select>
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
        <div
            style={{
                display: "flex",
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
                style={{
                    width: "30%",
                    padding: "5% 0",
                    paddingLeft: "5%",
                    backgroundColor: "white",
                    border: "2px solid #C8C8C8",
                    borderRadius: "6px",
                    color: "gray",
                    marginRight: "1.5%",
                }}
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
                style={{
                    width: "30%",
                    padding: "5% 0",
                    paddingLeft: "5%",
                    backgroundColor: "white",
                    border: "2px solid #C8C8C8",
                    borderRadius: "6px",
                    color: "gray",
                    marginLeft: "2%",
                }}
            />
        </div>
    );
};
