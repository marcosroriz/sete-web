import React from "react";
import { Button } from "react-bootstrap";

import { useNormasTable } from "tables/NormasTable/context";
//import { useEscolasTable } from "contexts/Tables/EscolasTableContext";

import SeteTable from "components/micro/SeteTable";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";

import { Container } from "./styles";

const Gerenciar: React.FC = () => {
    const { tableData, columns, handleSelectedData, handleDeleteSelectedNormas, handleExportExcel, handleExportPdf } = useNormasTable();
    return (
        <Container>
            <SeteTable columns={columns} name="Normas" data={tableData} onSelectedDataChange={handleSelectedData} />
            <ButtonsContainer containerClassName="dt-buttons btn-group">
                <Button variant="danger" className="btn-fill" onClick={handleDeleteSelectedNormas}>
                    Remover normas
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
