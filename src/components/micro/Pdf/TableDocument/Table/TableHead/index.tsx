import React from "react";
import { StyleSheet, View, Text } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";

import { Column } from "components/micro/Pdf/Global";

type TableHeadProps = Style & {
    columns?: Column[];
    hasNoHeader?: boolean;
};

const TableHead: React.FC<TableHeadProps> = ({ columns, hasNoHeader, ...props }) => {
    return (
        <View
            style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                flexDirection: "row",
                height: !hasNoHeader ? 25 : 6,
                paddingTop: 5,
                paddingBottom: 5,
                borderRadius: 1,
                backgroundColor: "#2b3341",
                color: "#FFFFFF",
                ...props,
            }}
        >
            {!hasNoHeader &&
                columns &&
                columns.map((column) => (
                    <View style={{ width: column.width, fontSize: 12, paddingLeft: 10, paddingRight: 10 }} key={column.acessor}>
                        <Text style={{ color: "#FFFFFF", fontFamily: "Roboto", fontSize: 12, fontWeight: 600 }}>{column.Header}</Text>
                    </View>
                ))}
        </View>
    );
};

const componentStyles = StyleSheet.create({
    thead: {},
    theadrow: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingVertical: 5,
        backgroundColor: "#576071",
        color: "#FFFFFF",
    },
    theaddata: {
        fontSize: 12,
        paddingHorizontal: 10,
    },
    theaddatatext: {
        color: "#FFFFFF",
        fontSize: 12,
    },
});

export default TableHead;
