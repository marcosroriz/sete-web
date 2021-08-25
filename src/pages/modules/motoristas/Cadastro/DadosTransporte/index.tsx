import React from "react";
import { Button } from "react-bootstrap";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import ReactHookMultiFormList from "components/micro/Inputs/ReactHookMultiFormList";
import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookInputNumberFormat from "components/micro/Inputs/ReactHookInputNumberFormat";
import ReactHookInputRadio from "components/micro/Inputs/ReactHookInputRadio";
import ReactHookInputCheckbox from "components/micro/Inputs/ReactHookInputCheckbox";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";

import { Container, ButtonsContainer, mediaQuery } from "./styles";

const DadosTransporte: React.FC = () => {
    const { previousStep } = useReactHookNavCard();
    return (
        <Container>
            <ReactHookFormItemCard name="numero_cnh" required>
                <ReactHookInputNumberFormat
                    label="CARTEIRA NACIONAL DE HABILITAÇÃO (CNH)*"
                    name="numero_cnh"
                    format="#########-##"
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard>
                <ReactHookInputNumberFormat label="DATA DE VENCIMENTO DA CNH*" name="vencimento_cnh" format="##/##/####" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard required>
                <ReactHookMultiFormList
                    label="O MOTORISTA ESTÁ HABILITADO A DIRIGIR QUAIS CATEGORIAS DE VEÍCULOS?*"
                    name="tipo_cnh"
                    formListSpacing="40px"
                    isHorizontal={mediaQuery.desktop}
                    fieldsHorizontal={mediaQuery.mobile}
                >
                    <ReactHookInputCheckbox label="A" name="tipo_cnh.a" />
                    <ReactHookInputCheckbox label="B" name="tipo_cnh.b" />
                    <ReactHookInputCheckbox label="C" name="tipo_cnh.c" />
                    <ReactHookInputCheckbox label="D" name="tipo_cnh.d" />
                    <ReactHookInputCheckbox label="E" name="tipo_cnh.e" />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>

            <ReactHookFormItemCard required>
                <ReactHookMultiFormList
                    label="QUAL O TURNO DE TRABALHO DO MOTORISTA?*"
                    name="turno"
                    formListSpacing="40px"
                    isHorizontal={mediaQuery.desktop}
                    fieldsHorizontal={mediaQuery.mobile}
                >
                    <ReactHookInputCheckbox label="Manhã" name="turno.manha" />
                    <ReactHookInputCheckbox label="Tarde" name="turno.tarde" />
                    <ReactHookInputCheckbox label="Noite" name="turno.noite" />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>

            <ButtonsContainer>
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

export default DadosTransporte;
