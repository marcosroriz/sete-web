import React from "react";
import ReactPdf, { StyleSheet, Font, Image, View, Document, Page, Text } from "@react-pdf/renderer";

type TableHead = {
    styles?: ReactPdf.Styles;
};

Font.register({
    src: "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap",
    family: "Roboto",
});

const TableHead: React.FC = () => {
    return (
        <View
            style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                flexDirection: "row",
                height: 25,
                paddingTop: 5,
                paddingBottom: 5,
                borderRadius: 1,
                backgroundColor: "#3f4a5c",
                color: "#FFFFFF",
            }}
        >
            <View style={{ width: "25%", fontSize: 12, paddingLeft: 10, paddingRight: 10 }}>
                <Text style={{ color: "#FFFFFF", fontSize: 12, fontWeight: 600 }}>Nome</Text>
            </View>
            <View style={{ width: "12%", fontSize: 12, paddingLeft: 10, paddingRight: 10 }}>
                <Text style={{ color: "#FFFFFF", fontSize: 12, fontWeight: 600 }}>Localização</Text>
            </View>
            <View style={{ width: "8%", fontSize: 12, paddingLeft: 10, paddingRight: 10 }}>
                <Text style={{ color: "#FFFFFF", fontSize: 12, fontWeight: 600 }}>GPS</Text>
            </View>
            <View style={{ width: "20%", fontSize: 12, paddingLeft: 10, paddingRight: 10 }}>
                <Text style={{ color: "#FFFFFF", fontSize: 12, fontWeight: 600 }}>Escola</Text>
            </View>
            <View style={{ width: "20%", fontSize: 12, paddingLeft: 10, paddingRight: 10 }}>
                <Text style={{ color: "#FFFFFF", fontSize: 12, fontWeight: 600 }}>Nível</Text>
            </View>
            <View style={{ width: "10%", fontSize: 12, paddingLeft: 10, paddingRight: 10 }}>
                <Text style={{ color: "#FFFFFF", fontSize: 12, fontWeight: 600 }}>Turno</Text>
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
