import React from "react";
import { Button } from "react-bootstrap";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import ReactHookInputRadio from "components/micro/Inputs/ReactHookInputRadio";
import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookMultiFormList from "components/micro/Inputs/ReactHookMultiFormList";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ReactHookInputNumberFormat from "components/micro/Inputs/ReactHookInputNumberFormat";
import BlockTitle from "components/micro/BlockTitle";

import { ButtonsContainer, Container, mediaQuery } from "./styles";

const DadosBasicos: React.FC = () => {
    const { nextStep, previousStep } = useReactHookNavCard();
    return (
        <Container>
            <BlockTitle message="FORNEÇA AS INFORMAÇÕES BÁSICAS A RESPEITO DA ESCOLA" />
            <ReactHookFormItemCard required>
                <ReactHookInputText label="NOME DA ESCOLA*" name="nome" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard>
                <ReactHookInputText label="NOME PARA CONTATO*" name="contato_responsavel" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard>
                <ReactHookInputNumberFormat
                    label="TELEFONE PARA CONTATO*"
                    name="contato_telefone"
                    format={["(##) ####-#####", "(##) #####-####"]}
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard>
                <ReactHookInputText label="EMAIL PARA CONTATO*" name="contato_email" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookMultiFormList label="A ESCOLA É:*" name="mec_tp_dependencia" isHorizontal={mediaQuery.desktop} fieldsHorizontal>
                    <ReactHookInputRadio label="Federal" value="1" name="mec_tp_dependencia" position="right" />
                    <ReactHookInputRadio label="Estadual" value="2" name="mec_tp_dependencia" position="right" />
                    <ReactHookInputRadio label="Municipal" value="3" name="mec_tp_dependencia" position="right" />
                    <ReactHookInputRadio label="Privatizada" value="4" name="mec_tp_dependencia" position="right" />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>
            <ButtonsContainer>
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

export default DadosBasicos;
