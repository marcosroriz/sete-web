import React from "react";
import { Button } from "react-bootstrap";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import BlockTitle from "components/micro/BlockTitle";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ReactHookInputFile from "components/micro/Inputs/ReactHookInputFile";

import { Container } from "./styles";

const BaseDados: React.FC = () => {
    const { previousStep, nextStep } = useReactHookNavCard();

    return (
        <Container>
            <BlockTitle message="POR FAVOR, ENVIE A BASE DE DADOS EXPORTADA DO SISTEMA EDUCACENSO. VOCÊ DEVE ENCAMINHAR O ARQUIVO DESCOMPACTADO (TXT)." />
            <ReactHookFormItemCard required>
                <ReactHookInputFile
                    name="arquivo"
                    label="ARQUIVO DO CENSO ESCOLAR (TXT):*"
                    placeholder="Clique aqui para selecionar arquivos ou os arreste para esse campo"
                />
            </ReactHookFormItemCard>
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

export default BaseDados;
