import React from "react";
import { StyleSheet, Image, View, Document, Page, Text } from "@react-pdf/renderer";

import TableHead from "./TableHead";
import TableBody from "./TableBody";

const Table: React.FC = () => {
    return <View style={styles.table}></View>;
};

const styles = StyleSheet.create({
    table: {
        marginTop: 20,
    },
});

export default Table;
