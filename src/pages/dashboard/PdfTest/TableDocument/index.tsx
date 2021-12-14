import React from "react";
import { StyleSheet, Image, View, Document, Page, Text } from "@react-pdf/renderer";

import Table from "./Table";

import Footer from "../footer.png";
import SeteLogo from "../sete-logo.png";
import TableBody from "./Table/TableBody";
import TableHead from "./Table/TableHead";

const TableDocument: React.FC = () => {
    return (
        <Document>
            <Page size="A4" orientation="landscape" style={styles.page}>
                <View style={styles.document} wrap>
                    <View style={styles.documentTitleContainer}>
                        <View style={styles.logoContainer}>
                            <Image src={SeteLogo} style={styles.logo} />
                        </View>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>SISTEMA ELETRÔNICO DE GESTÃO DO TRANSPORTE ESCOLAR</Text>
                            <Text style={styles.titleVersion}>Versão do SETE: 1.7.1</Text>
                            <Text style={styles.titleDate}>Data do Relatório {new Date().toLocaleDateString()}</Text>
                        </View>
                    </View>
                    <View style={styles.tableTitleContainer}>
                        <Text style={styles.tableTitle}>Aparecida de Goiânia (Goiás)</Text>
                        <Text style={styles.tableRecords}>684 Alunos cadastrados</Text>
                    </View>
                    <TableHead />
                    <TableBody />
                </View>
            </Page>
        </Document>
    );
};

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
    },
    document: {
        flexDirection: "column",
        width: "100%",
        height: "100%",
        paddingVertical: 40,
        paddingHorizontal: 40,
    },
    documentTitleContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    // DocTitleContainer
    logoContainer: {
        width: 140,
    },
    logo: {
        width: "100%",
    },
    titleContainer: {
        marginLeft: 15,
    },
    title: {
        fontSize: 16,
        fontWeight: 600,
    },
    titleVersion: {
        marginTop: 10,
        fontSize: 10,
    },
    titleDate: {
        marginTop: 10,
        fontSize: 10,
    },
    // DocTitleContainer

    tableTitleContainer: {
        width: "100%",
        marginTop: 15,
    },
    // TableTitleContainer
    tableTitle: {
        textAlign: "center",
        fontSize: 17,
    },
    tableRecords: {
        marginTop: 5,
        textAlign: "center",
        fontSize: 17,
    },
    // TableTitleContainer
});

export default TableDocument;
