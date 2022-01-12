import React from "react";
import { Button } from "react-bootstrap";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import BlockTitle from "components/micro/BlockTitle";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ReactHookInputFile from "components/micro/Inputs/ReactHookInputFile";

import { Container } from "./styles";

const ArquivoRota: React.FC = () => {
    const { nextStep } = useReactHookNavCard();

    return (
        <Container>
            <BlockTitle message="ESSA FERRAMENTA POSSIBILITA IMPORTAR O TRAÇADO DE UMA ROTA ATRAVÉS DE UM ARQUIVO DO TIPO (GPS EXCHANGE FORMAT). PARA UTILIZAR A FERRAMENTA, PRIMEIRAMENTE ESCOLHA O ARQUIVO GPX DA ROTA A SER IMPORTADA." />
            <ReactHookFormItemCard required>
                <ReactHookInputFile
                    name="arquivo"
                    label="ARQUIVO DE ROTAS (GPX):*"
                    placeholder="Clique aqui para selecionar arquivos ou os arreste para esse campo"
                />
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
