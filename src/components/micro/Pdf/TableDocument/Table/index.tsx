import React from "react";
import { View } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";

import TableTitle from "./TableTitle";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

import { TableInfoProps } from "components/micro/Pdf/Global";

type TableProps = Style & TableInfoProps;

const Table: React.FC<TableProps> = ({ titleCity, titleRecords, hasNoHeader, columns, data, ...props }) => {
    return (
        <View style={props}>
            <TableTitle titleCity={titleCity} titleRecords={titleRecords} />
            <TableHead columns={columns} hasNoHeader={hasNoHeader} />
            <TableBody data={data} columns={columns} />
            <View
                style={{ position: "absolute", top: -25, left: 0, width: "100%", height: "100%" }}
                render={({ pageNumber }) => (pageNumber > 1 ? <TableHead columns={columns} /> : "")}
                fixed
            />
        </View>
    );
};

export default Table;
