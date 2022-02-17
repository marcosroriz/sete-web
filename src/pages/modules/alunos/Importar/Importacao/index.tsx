import React from "react";
import { Button } from "react-bootstrap";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import BlockTitle from "components/micro/BlockTitle";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";

import { Container } from "./styles";

const Importacao: React.FC = () => {
    const { nextStep, previousStep } = useReactHookNavCard();
    return (
        <Container>
            <BlockTitle message="ESSA FERRAMENTA POSSIBILITA IMPORTAR VÁRIOS ALUNOS PARA O SISTEMA DE UMA VEZ A PARTIR DE DADOS EXISTENTES. PARA TAL, POR FAVOR BAIXE A PLANILHA EXEMPLO QUE DEVERÁ SER PREENCHIDA COM AS SEGUINTES COLUNAS:" />
            <ButtonsContainer position="evenly">
                <Button variant="default" type="button" className="btn-fill" onClick={previousStep}>
                    Voltar
                </Button>
                <Button variant="info" type="button" className="btn-fill" onClick={nextStep}>
                    Próximo
                </Button>
            </ButtonsContainer>
        </Container>
    );
};

export default Importacao;
