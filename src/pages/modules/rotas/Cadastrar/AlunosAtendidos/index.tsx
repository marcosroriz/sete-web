import React from "react";
import { Button } from "react-bootstrap";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import BlockTitle from "components/micro/BlockTitle";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";

import { Container } from "./styles";

const AlunosAtendidos: React.FC = () => {
    const { previousStep } = useReactHookNavCard();
    return (
        <Container>
            <BlockTitle message="ESCOLAS ATENDIDAS" />
            <ButtonsContainer>
                <Button variant="default" type="button" className="btn-fill" onClick={previousStep}>
                    Voltar
                </Button>
                <Button variant="info" type="submit" className="btn-fill">
                    Próximo
                </Button>
            </ButtonsContainer>
        </Container>
    );
};

export default AlunosAtendidos;
