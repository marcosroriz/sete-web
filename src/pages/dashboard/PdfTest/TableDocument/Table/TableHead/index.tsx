import React from "react";
import ReactPdf, { StyleSheet, Image, View, Document, Page, Text } from "@react-pdf/renderer";

type TableHead = {
    styles?: ReactPdf.Styles;
};

const TableHead: React.FC = () => {
    return (
        <View
            style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                flexDirection: "row",
                paddingTop: 5,
                paddingBottom: 5,
                backgroundColor: "#576071",
                color: "#FFFFFF",
            }}
        >
            <View style={{ width: "25%", fontSize: 12, paddingLeft: 10, paddingRight: 10 }}>
                <Text style={{ color: "#FFFFFF", fontSize: 12 }}>Nome</Text>
            </View>
            <View style={{ width: "12%", fontSize: 12, paddingLeft: 10, paddingRight: 10 }}>
                <Text style={{ color: "#FFFFFF", fontSize: 12 }}>Localização</Text>
            </View>
            <View style={{ width: "8%", fontSize: 12, paddingLeft: 10, paddingRight: 10 }}>
                <Text style={{ color: "#FFFFFF", fontSize: 12 }}>GPS</Text>
            </View>
            <View style={{ width: "20%", fontSize: 12, paddingLeft: 10, paddingRight: 10 }}>
                <Text style={{ color: "#FFFFFF", fontSize: 12 }}>Escola</Text>
            </View>
            <View style={{ width: "20%", fontSize: 12, paddingLeft: 10, paddingRight: 10 }}>
                <Text style={{ color: "#FFFFFF", fontSize: 12 }}>Nível</Text>
            </View>
            <View style={{ width: "10%", fontSize: 12, paddingLeft: 10, paddingRight: 10 }}>
                <Text style={{ color: "#FFFFFF", fontSize: 12 }}>Turno</Text>
            </View>
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
