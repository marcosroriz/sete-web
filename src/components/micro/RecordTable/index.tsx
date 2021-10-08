import React from "react";

import { Container } from "./styles";

type RecordTableProps = {
    title: string;
    data: { [key: string]: string };
};

const RecordTable: React.FC<RecordTableProps> = ({ title, data }) => {
    const tableData = Object.entries(data || {});
    return (
        <Container>
            <h2>{title}</h2>
            <table style={{ width: "100%" }}>
                <tbody>
                    {tableData &&
                        tableData.map(([key, value]) => (
                            <tr key={key}>
                                <td>{key}</td>
                                <td>{value}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </Container>
    );
};

export default RecordTable;
