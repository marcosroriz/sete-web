import React from "react";
import { StyleSheet, Image, View, Font, Document, Page, Text } from "@react-pdf/renderer";

import Table from "./Table";

import TableBody from "./Table/TableBody";
import TableHead from "./Table/TableHead";
import RobotoBold from "assets/fonts/Roboto-Bold.ttf";
import RobotoMedium from "assets/fonts/Roboto-Medium.ttf";
import RobotoRegular from "assets/fonts/Roboto-Regular.ttf";

import Footer from "../footer.png";
import SeteLogo from "../sete-logo.png";

Font.register({
    family: "Roboto",
    fonts: [
        { src: RobotoBold as any, fontWeight: 700 },
        { src: RobotoMedium as any, fontWeight: 600 },
        { src: RobotoRegular as any, fontWeight: 500 },
    ],
});

const TableDocument: React.FC = () => {
    return (
        <Document>
            <Page size="A4" orientation="landscape" style={styles.page} wrap>
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
                    <View
                        style={{ position: "absolute", top: -25, left: 0, width: "100%", height: "100%" }}
                        render={({ pageNumber }) => (pageNumber > 1 ? <TableHead /> : "")}
                        fixed
                    />

                    <View style={{ position: "absolute", top: 0, left: 0, width: "100%" }} />
                </View>
            </Page>
        </Document>
    );
};

const styles = StyleSheet.create({
    page: {
        fontSize: "Roboto",
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        fontFamily: "Roboto",
        fontWeight: 500,
        paddingBottom: 40,
        paddingTop: 65,
        paddingHorizontal: 40,
    },
    document: {},
    documentTitleContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: -25,
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
        marginBottom: 20,
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

export default TableDocument;
