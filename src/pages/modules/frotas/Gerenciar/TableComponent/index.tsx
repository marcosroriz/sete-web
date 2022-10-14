import React from "react";
import { Button } from "react-bootstrap";

import { useFrotasTable } from "contexts/Tables/FrotasTableContext";

import SeteTable from "components/micro/SeteTable";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";

import { Container } from "./styles";

const Gerenciar: React.FC = () => {
    const { tableData, columns } = useFrotasTable();
    return (
        <Container>
            <SeteTable columns={columns} name={"Frotas"} data={tableData} />

            {/* FALTA ADICIONAR AS FUNÇÕES AOS BOTÕES, CRIEI APENAS A PARTE VISUAL DELES
            PARA ISSO, DEVEMOS ADICIONAR UM DIRETORIO frotas NA PASTA tables E CRIAR AS SUAS CONFIGURACOES*/}
            <ButtonsContainer containerClassName="dt-buttons btn-group">
                <Button variant="danger" className="btn-fill">
                    Remover veículos
                </Button>
                <Button variant="" className="btn-fill btn-excel">
                    Exportar para Planilha
                </Button>
                <Button variant="secondary" className="btn-fill">
                    Exportar para PDF
                </Button>
            </ButtonsContainer>
        </Container>
    );
};

export default Gerenciar;
