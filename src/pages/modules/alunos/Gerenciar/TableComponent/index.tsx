import React from "react";
import { Button } from "react-bootstrap";

import { useAlunosTable } from "tables/AlunosTable/context";

import SeteTable from "components/micro/SeteTable";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";

import { Container } from "./styles";

const Gerenciar: React.FC = () => {
    const { tableData, columns, handleSelectedData, handleDeleteSelectedAlunos, handleExportExcel, handleExportPdf } = useAlunosTable();

    return (
        <Container>
            <SeteTable columns={columns} name="Alunos" data={tableData} onSelectedDataChange={handleSelectedData} />
            <ButtonsContainer containerClassName="dt-buttons btn-group">
                <Button variant="danger" className="btn-fill" onClick={handleDeleteSelectedAlunos}>
                    Remover alunos
                </Button>
                <Button variant="" className="btn-fill btn-excel" onClick={handleExportExcel}>
                    Exportar para Planilha
                </Button>
                <Button variant="secondary" className="btn-fill" onClick={handleExportPdf}>
                    Exportar para PDF
                </Button>
            </ButtonsContainer>
        </Container>
    );
};

export default Gerenciar;
