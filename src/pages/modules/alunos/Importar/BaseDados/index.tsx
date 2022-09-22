import React from "react";
import { Button } from "react-bootstrap";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import BlockTitle from "components/micro/BlockTitle";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ReactHookInputFile from "components/micro/Inputs/ReactHookInputFile";

import { Container } from "./styles";

const BaseDados: React.FC = () => {
    const { nextStep, previousStep } = useReactHookNavCard();
    return (
        <Container>
            <BlockTitle message="POR FAVOR ENVIE A PLANILHA XLXS CONTENDO A DESCRIÇÃO DOS ALUNOS QUE SERÃO IMPORTADOS PARA O SISTEMA." />
            <ReactHookFormItemCard required>
                <ReactHookInputFile name="arquivo" label="PLANILHA (XSLX):*" placeholder="Clique aqui para selecionar arquivos ou os arreste para esse campo" />
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
