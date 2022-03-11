import React from "react";
import { StyleSheet, View, Text } from "@react-pdf/renderer";

import { Data, Column } from "components/micro/Pdf/Global";

type TableBodyProps = {
    data?: Data[];
    columns?: Column[];
};

const TableBody: React.FC<TableBodyProps> = ({ columns, data }) => {
    const getRowColor = (index: number) => {
        if (index % 2 === 0) {
            return styles.odd;
        }
        return styles.even;
    };

    return (
        <>
            {data &&
                data.map((data, index) => (
                    <View style={[styles.tbodyrow, getRowColor(index)]} key={index} wrap={false}>
                        {columns &&
                            columns.map((column) => (
                                <Text style={[styles.tbodydata, { width: column.width }]} key={column.acessor}>
                                    <Text>{data[column.acessor] as any}</Text>
                                </Text>
                            ))}
                    </View>
                ))}
        </>
    );
};

const styles = StyleSheet.create({
    tbody: {},
    tbodyrow: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingVertical: 5,
        backgroundColor: "#FFFFFF",
        color: "black",
    },
    tbodydata: {
        fontSize: 10,
        paddingHorizontal: 10,
    },
    odd: {
        backgroundColor: "rgba(0,0,0,.05)",
    },
    even: {},
});

export default TableBody;
