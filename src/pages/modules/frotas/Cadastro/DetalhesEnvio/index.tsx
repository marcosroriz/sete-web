import React from "react";
import { Button } from "react-bootstrap";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import ReactHookInputSelect from "components/micro/Inputs/ReactHookInputSelect";
import ReactHookMultiFormList from "components/micro/Inputs/ReactHookMultiFormList";
import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookInputRadio from "components/micro/Inputs/ReactHookInputRadio";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";

import { Container, ButtonsContainer, mediaQuery } from "./styles";

const DetalhesEnvio: React.FC = () => {
    const { nextStep } = useReactHookNavCard();
    return (
        <Container>
            <h2>POR FIM, INFORME OS DADOS CADASTRAIS DO VEÍCULO.</h2>
            <ReactHookFormItemCard required>
                <ReactHookInputText label="PLACA DO VEÍCULO*" name="placa" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard required>
                <ReactHookInputText label="RENAVEM DO VEÍCULO*" name="renavam" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard>
                <ReactHookInputText label="QUILOMETRAGEM ATUAL DO VEÍCULO*" name="quilometragem" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard required>
                <ReactHookInputText label="CAPACIDADE DO VEÍCULO*" name="capacidade" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard required>
                <ReactHookMultiFormList
                    label="O VEÍCULO ESTÁ ATUALMENTE EM MANUTANÇÃO?*"
                    name="manutencao"
                    isHorizontal={mediaQuery.desktop}
                    fieldsHorizontal={mediaQuery.mobile}
                    formListSpacing="20px"
                >
                    <ReactHookInputRadio label="Sim" value="true" name="manutencao" position="right" />
                    <ReactHookInputRadio label="Não" value="false" name="manutencao" position="right" />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>

            <ButtonsContainer>
                <Button variant="info" type="button" className="btn-fill" onClick={nextStep}>
                    Próximo
                </Button>
            </ButtonsContainer>
        </Container>
    );
};

export default DetalhesEnvio;
