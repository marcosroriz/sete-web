import React from "react";
import { PDFViewer } from "@react-pdf/renderer";

import TableDocument from "components/micro/Pdf/TableDocument";

import { Container } from "./styles";

const PdfTest: React.FC = () => {
    return (
        <Container>
            <h2>Component</h2>
            <PDFViewer width="100%" height="750px">
                <TableDocument titleCity="Hello" titleRecords="adasd" />
            </PDFViewer>
        </Container>
    );
};

export default PdfTest;
