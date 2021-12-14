import React from "react";
import { StyleSheet, Image, View, Document, Page, Text } from "@react-pdf/renderer";

const TableHead: React.FC = () => {
    return (
        <>
            <View style={styles.theadrow}>
                <View style={[styles.theaddata, { width: "25%" }]}>
                    <Text>Nome</Text>
                </View>
                <View style={[styles.theaddata, { width: "12%" }]}>
                    <Text>Localização</Text>
                </View>
                <View style={[styles.theaddata, { width: "8%" }]}>
                    <Text>GPS</Text>
                </View>
                <View style={[styles.theaddata, { width: "20%" }]}>
                    <Text>Escola</Text>
                </View>
                <View style={[styles.theaddata, { width: "20%" }]}>
                    <Text>Nível</Text>
                </View>
                <View style={[styles.theaddata, { width: "10%" }]}>
                    <Text>Turno</Text>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
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
});

export default TableHead;
