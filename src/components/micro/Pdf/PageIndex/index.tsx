import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";

import "components/micro/Pdf/Global";

type PageIndexProps = Style;

const PageIndex: React.FC<PageIndexProps> = (props) => {
    return (
        <View
            style={{
                position: "absolute",
                bottom: 10,
                right: 10,
                alignItems: "center",
                justifyContent: "center",
                width: "auto",
                height: 16,
                paddingHorizontal: 5,
                backgroundColor: "#576071",
                borderRadius: 1,
                ...props,
            }}
            render={({ pageNumber }) => <Text style={{ fontFamily: "Roboto", fontSize: 12, color: "#ffffff" }}>{pageNumber}</Text>}
            fixed
        />
    );
};

export default PageIndex;
