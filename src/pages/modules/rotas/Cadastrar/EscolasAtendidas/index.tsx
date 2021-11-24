import React from "react";
import { Button } from "react-bootstrap";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import BlockTitle from "components/micro/BlockTitle";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";
import ReactHookDualMultiSelect from "components/micro/Inputs/ReactHookDualMultiSelect";

import { Container } from "./styles";

const EscolasAtendidas: React.FC = () => {
    const { previousStep, nextStep } = useReactHookNavCard();
    return (
        <Container>
            <BlockTitle message="ESCOLAS ATENDIDAS" />
            {/* Falta as options aqui. Pegar do backend */}
            <ReactHookDualMultiSelect name="escolas" />
            <ButtonsContainer>
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

export default EscolasAtendidas;
