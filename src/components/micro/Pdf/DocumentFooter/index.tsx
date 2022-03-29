import React from "react";
import { View, Image } from "@react-pdf/renderer";

import SeteFooter from "assets/images/footer.png";

const DocumentFooter: React.FC = () => {
    return (
        <View style={{ position: "absolute", bottom: 6, left: 40, width: "100%", alignItems: "center", justifyContent: "center" }} fixed>
            <View style={{ width: 400 }}>
                <Image src={SeteFooter} style={{ width: "100%" }} />
            </View>
        </View>
    );
};

export default DocumentFooter;
