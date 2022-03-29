import React from "react";
import { StyleSheet, Image, View, Text } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";

import SeteLogo from "assets/images/sete-logo-black.png";

import "components/micro/Pdf/Global";

type DocumentHeaderProps = Style;

const DocumentHeader: React.FC<DocumentHeaderProps> = (props) => {
    return (
        <View style={[{ ...props }, styles.documentTitleContainer]}>
            <View style={styles.logoContainer}>
                <Image src={SeteLogo} style={styles.logo} />
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>SISTEMA ELETRÔNICO DE GESTÃO DO TRANSPORTE ESCOLAR</Text>
                <Text style={styles.titleVersion}>Versão do SETE: 1.7.1</Text>
                <Text style={styles.titleDate}>Data do Relatório {new Date().toLocaleDateString()}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    documentTitleContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    logoContainer: {
        width: 140,
    },
    logo: {
        width: "100%",
    },
    titleContainer: {
        marginLeft: 15,
        marginTop: 8,
    },
    title: {
        fontFamily: "Roboto",
        fontWeight: 600,
        fontSize: 16,
    },
    titleVersion: {
        marginTop: 6,
        fontSize: 10,
    },
    titleDate: {
        marginTop: 4,
        fontSize: 10,
    },
});

export default DocumentHeader;
