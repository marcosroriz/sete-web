import React from "react";
import { StyleSheet, View, Text } from "@react-pdf/renderer";

import "components/micro/Pdf/Global";

type TableTitleProps = {
    titleCity?: string;
    titleRecords?: string;
};

const TableTitle: React.FC<TableTitleProps> = ({ titleCity, titleRecords }) => {
    return (
        <View style={styles.tableTitleContainer}>
            <Text style={styles.tableTitle}>{titleCity}</Text>
            <Text style={styles.tableRecords}>{titleRecords}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    tableTitleContainer: {
        width: "100%",
        marginTop: 12,
        marginBottom: 20,
    },
    tableTitle: {
        textAlign: "center",
        fontFamily: "Roboto",
        fontWeight: 600,
        fontSize: 18,
    },
    tableRecords: {
        marginTop: 5,
        textAlign: "center",
        fontFamily: "Roboto",
        fontWeight: 600,
        fontSize: 18,
    },
});

export default TableTitle;
