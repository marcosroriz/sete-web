import React from "react";
import { StyleSheet, View, Document, Page } from "@react-pdf/renderer";

import Table from "./Table";
import DocumentHeader from "../DocumentHeader";
import DocumentFooter from "../DocumentFooter";
import PageIndex from "../PageIndex";

import { TableInfoProps } from "components/micro/Pdf/Global";

type TableDocumentProps = TableInfoProps;

const TableDocument: React.FC<TableDocumentProps> = (props) => {
    return (
        <Document>
            <Page size="A4" orientation="landscape" style={styles.page} wrap>
                <View style={styles.document} wrap>
                    <DocumentHeader />
                    <Table {...props} />
                </View>
                <DocumentFooter />
                <PageIndex />
            </Page>
        </Document>
    );
};

const styles = StyleSheet.create({
    page: {
        position: "relative",
        fontSize: "Roboto",
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        fontFamily: "Roboto",
        fontWeight: 500,
        height: "100%",
        paddingBottom: 40,
        paddingTop: 65,
        paddingHorizontal: 40,
    },
    document: {
        marginTop: -26,
    },
});

export default TableDocument;
