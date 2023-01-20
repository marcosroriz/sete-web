import React from "react";
import { Button } from "react-bootstrap";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import BlockTitle from "components/micro/BlockTitle";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ReactHookInputFile from "components/micro/Inputs/ReactHookInputFile";

import { Container } from "./styles";

const ArquivoRota: React.FC = () => {
    const { previousStep, nextStep } = useReactHookNavCard();

    return (
        <Container>
            <BlockTitle message="POR FAVOR ENVIE O ARQUIVO OSM CONTENDO A MALHA ATUALIZADA." />
            <ReactHookFormItemCard required>
                <ReactHookInputFile
                    name="arquivo"
                    label="MALHA ATUALIZADA:*"
                    placeholder="Clique aqui para selecionar arquivos ou os arreste para esse campo"
                />
            </ReactHookFormItemCard>
            <ButtonsContainer position="evenly">
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

export default ArquivoRota;
