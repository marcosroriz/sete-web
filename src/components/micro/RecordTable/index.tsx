import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

import { Container } from "./styles";

type RecordTableProps = {
    title: string;
    data: { [key: string]: string };
};

const RecordTable: React.FC<RecordTableProps> = ({ title, data }) => {
    const history = useHistory();
    const tableData = Object.entries(data || {});

    const handleVoltarClick = () => {
        history.goBack();
    };

    return (
        <Container>
            <h2 className="record-table-title">{title}</h2>
            <table className="record-table">
                <tbody>
                    {tableData &&
                        tableData.map(([key, value]) => (
                            <tr key={key}>
                                <td>{key}</td>
                                <td>{value || "-"}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <div className="record-table-action-buttons">
                <Button variant="info" type="button" className="btn-fill" onClick={handleVoltarClick}>
                    Voltar
                </Button>
            </div>
        </Container>
    );
};

export default RecordTable;
