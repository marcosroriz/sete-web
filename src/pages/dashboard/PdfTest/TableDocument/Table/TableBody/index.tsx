import React from "react";
import { StyleSheet, Image, View, Document, Page, Text } from "@react-pdf/renderer";

const TableHead: React.FC = () => {
    const getRowColor = (index: number) => {
        if (index % 2 === 0) {
            return styles.odd;
        }
        return styles.even;
    };

    return (
        <>
            {Array.from(Array(60).keys()).map((_, index) => (
                <View style={[styles.tbodyrow, getRowColor(index)]} key={index} wrap={false}>
                    <Text style={[styles.tbodydata, { width: "25%" }]}>
                        <Text>ADRIELLY ALVES DE SOUSA</Text>
                    </Text>
                    <Text style={[styles.tbodydata, { width: "12%" }]}>
                        <Text>Rural</Text>
                    </Text>
                    <Text style={[styles.tbodydata, { width: "8%" }]}>
                        <Text>Não</Text>
                    </Text>
                    <Text style={[styles.tbodydata, { width: "20%" }]}>
                        <Text>UNIDADE ESCOLAR ROBERTO JOSE DE SANTANA</Text>
                    </Text>
                    <Text style={[styles.tbodydata, { width: "20%" }]}>
                        <Text>Fundamental</Text>
                    </Text>
                    <Text style={[styles.tbodydata, { width: "10%" }]}>
                        <Text>Integral</Text>
                    </Text>
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

export default TableHead;
