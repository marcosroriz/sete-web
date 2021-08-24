import React from "react";
import { Button } from "react-bootstrap";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import ReactHookMultiFormList from "components/micro/Inputs/ReactHookMultiFormList";
import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookInputNumberFormat from "components/micro/Inputs/ReactHookInputNumberFormat";
import ReactHookInputRadio from "components/micro/Inputs/ReactHookInputRadio";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";

import { Container, ButtonsContainer, mediaQuery } from "./styles";

const DadosPessoais: React.FC = () => {
    const { nextStep } = useReactHookNavCard();
    return (
        <Container>
            <h2>Forneça as informações básicas a respeito do aluno sendo cadastrado.</h2>
            <ReactHookFormItemCard required>
                <ReactHookInputText label="NOME DO MOTORISTA*" name="nome" containerClassName="form-item-card-center" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard required>
                <ReactHookInputNumberFormat
                    label="CPF DO MOTORISTA*"
                    name="cpf"
                    format="###.###.###-##"
                    containerClassName="form-item-card-center"
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard required>
                <ReactHookInputNumberFormat
                    label="DATA DE NASCIMENTO*"
                    name="nascimento"
                    format="##/##/####"
                    containerClassName="form-item-card-center"
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard>
                <ReactHookInputNumberFormat
                    label="TELEFONE*"
                    name="telefone"
                    format={["(##) ####-#####", "(##) #####-####"]}
                    containerClassName="form-item-card-center"
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard required>
                <ReactHookMultiFormList
                    label="SEXO DO MOTORISTA*"
                    name="sexo"
                    containerClassName="form-item-card-center"
                    isHorizontal={mediaQuery.desktop}
                    fieldsHorizontal={mediaQuery.mobile}
                >
                    <ReactHookInputRadio label="Masculino" value="masc" name="sexo" position="right" />
                    <ReactHookInputRadio label="Feminino" value="fem" name="sexo" position="right" />
                    <ReactHookInputRadio label="Não Informado" value="none" name="sexo" position="right" />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>

            <ReactHookFormItemCard>
                <ReactHookInputText
                    label="NÚMERO DO DOCUMENTO DE ANTECENDENTES CRIMINAIS*"
                    name="criminais"
                    containerClassName="form-item-card-center"
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>
            <ButtonsContainer>
                <Button variant="info" type="button" className="btn-fill" onClick={nextStep}>
                    Próximo
                </Button>
            </ButtonsContainer>
        </Container>
    );
};

export default DadosPessoais;
