import React from "react";
import { Button } from "react-bootstrap";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import ReactHookInputCheckbox from "components/micro/Inputs/ReactHookInputCheckbox";
import ReactHookMultiFormList from "components/micro/Inputs/ReactHookMultiFormList";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import BlockTitle from "components/micro/BlockTitle";

import { ButtonsContainer, Container, mediaQuery } from "./styles";

const DadosEscolares: React.FC = () => {
    const { previousStep } = useReactHookNavCard();
    return (
        <Container>
            <BlockTitle message="POR FIM, FORNEÇA AS INFORMAÇÕES RELACIONADOS AO TIPO DE ENSINO DA ESCOLA:" />
            <ReactHookFormItemCard>
                <ReactHookMultiFormList
                    label="EM RELAÇÃO AO REGIME, A ESCOLA OFERECE ENSINO:*"
                    isHorizontal={mediaQuery.desktop}
                    fieldsHorizontal={mediaQuery.mobile}
                    formListSpacing="20px"
                >
                    <ReactHookInputCheckbox label="Regular" name="mec_in_regular" />
                    <ReactHookInputCheckbox label="EJA" name="mec_in_eja" />
                    <ReactHookInputCheckbox label="Profissionalizante" name="mec_in_profissionalizante" />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>
            <ReactHookFormItemCard>
                <ReactHookMultiFormList
                    label="EM RELAÇÃO AO NÍVEL A ESCOLA OFERECE ENSINO:*"
                    isHorizontal={mediaQuery.desktop}
                    fieldsHorizontal={mediaQuery.mobile}
                    formListSpacing="20px"
                >
                    <ReactHookInputCheckbox label="Infantil" name="ensino_pre_escola" />
                    <ReactHookInputCheckbox label="Fundamental" name="ensino_fundamental" />
                    <ReactHookInputCheckbox label="Médio" name="ensino_medio" />
                    <ReactHookInputCheckbox label="Superior" name="ensino_superior" />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>
            <ReactHookFormItemCard>
                <ReactHookMultiFormList
                    label="EM RELAÇÃO AO HORÁRIO DE FUNCIONAMENTO, A ESCOLA FUNCIONA NO PERÍODO DA:*"
                    isHorizontal={mediaQuery.desktop}
                    fieldsHorizontal={mediaQuery.mobile}
                    formListSpacing="20px"
                >
                    <ReactHookInputCheckbox label="Manhã" name="horario_matutino" />
                    <ReactHookInputCheckbox label="Tarde" name="horario_vespertino" />
                    <ReactHookInputCheckbox label="Noite" name="horario_noturno" />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>
            <ButtonsContainer>
                <Button variant="default" type="button" className="btn-fill" onClick={previousStep}>
                    Voltar
                </Button>
                <Button variant="info" type="submit" className="btn-fill">
                    Concluír
                </Button>
            </ButtonsContainer>
        </Container>
    );
};

export default DadosEscolares;
