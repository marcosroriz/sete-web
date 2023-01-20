import React from "react";
import { Button } from "react-bootstrap";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import { FaDownload } from "react-icons/fa";

import BlockTitle from "components/micro/BlockTitle";
import BlockToastCard from "components/micro/Cards/BlockToastCard";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ReactHookInputFile from "components/micro/Inputs/ReactHookInputFile";

import { Container } from "./styles";

const ArquivoRota: React.FC = () => {
    const { nextStep } = useReactHookNavCard();

    return (
        <Container>
            <BlockTitle message="ESSA FERRAMENTA POSSIBILITA VISUALIZAR E SUBMETER MODIFICAÇÕES DA MALHA VIÁRIA DO MUNICÍPIO. AS ALTERAÇÕES DA MALHA DEVEM SER REALIZADAS ATRAVÉS DO SOFTWARE JOSM." />
            <BlockToastCard
                type="warning"
                text="As alterações da malha devem ser realizadas através do software JOSM. Caso tenha alguma dúvida, clique aqui."
            />
            <ReactHookFormItemCard noLabel>
                <div className="btn-container">
                    <span>MALHA ATUAL:*</span>
                    <Button variant="none" className="btn-fill">
                        <FaDownload className="btn-icon" />
                        Baixar Malha Atual
                    </Button>
                </div>
            </ReactHookFormItemCard>
            <ButtonsContainer position="right">
                <Button variant="info" type="button" className="btn-fill" onClick={nextStep}>
                    Próximo
                </Button>
            </ButtonsContainer>
        </Container>
    );
};

export default ArquivoRota;
