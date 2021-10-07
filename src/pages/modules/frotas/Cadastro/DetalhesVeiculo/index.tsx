import React from "react";
import { Button } from "react-bootstrap";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import ReactHookMultiFormList from "components/micro/Inputs/ReactHookMultiFormList";
import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookInputRadio from "components/micro/Inputs/ReactHookInputRadio";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ReactHookInputMask from "components/micro/Inputs/ReactHookInputMask";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";
import BlockTitle from "components/micro/BlockTitle";

import { Container, mediaQuery } from "./styles";

const DetalhesVeiculo: React.FC = () => {
    const { previousStep } = useReactHookNavCard();
    return (
        <Container>
            <BlockTitle message="POR FIM, INFORME OS DADOS CADASTRAIS DO VEÍCULO." />
            <ReactHookFormItemCard required>
                <ReactHookInputMask label="PLACA DO VEÍCULO*" name="placa" format="AAA-1111" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard required>
                <ReactHookInputText label="RENAVAM DO VEÍCULO*" name="renavam" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard>
                <ReactHookInputText
                    label="QUILOMETRAGEM INICIAL DO VEÍCULO*"
                    name="km_inicial"
                    type="number"
                    unitOfMeasure="KM"
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard>
                <ReactHookInputText
                    label="QUILOMETRAGEM ATUAL DO VEÍCULO*"
                    name="km_atual"
                    type="number"
                    unitOfMeasure="KM"
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard required>
                <ReactHookInputText
                    label="CAPACIDADE DO VEÍCULO*"
                    name="capacidade"
                    type="number"
                    unitOfMeasure="PASSAGEIROS"
                    isHorizontal={mediaQuery.desktop}
                />
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

            <ButtonsContainer position="evenly">
                <Button variant="default" type="button" className="btn-fill" onClick={previousStep}>
                    Voltar
                </Button>
                <Button variant="info" type="submit" className="btn-fill">
                    Concluir
                </Button>
            </ButtonsContainer>
        </Container>
    );
};

export default DetalhesVeiculo;
