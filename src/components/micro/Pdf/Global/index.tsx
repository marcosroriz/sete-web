import { Font } from "@react-pdf/renderer";

import RobotoBold from "assets/fonts/Roboto-Bold.ttf";
import RobotoMedium from "assets/fonts/Roboto-Medium.ttf";
import RobotoRegular from "assets/fonts/Roboto-Regular.ttf";

Font.register({
    family: "Roboto",
    fonts: [
        { src: RobotoBold as any, fontWeight: 700 },
        { src: RobotoMedium as any, fontWeight: 600 },
        { src: RobotoRegular as any, fontWeight: 500 },
    ],
});

export type Column = {
    acessor: string;
    Header: React.ReactNode;
    width: string | number;
};

export type Data = any;

export type TableInfoProps = {
    titleCity?: string;
    titleRecords?: string;
    columns?: Column[];
    data?: Data[];
};
