import React from "react";
import { Button } from "react-bootstrap";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import BlockTitle from "components/micro/BlockTitle";
import ReactHookLatLngMap from "components/micro/Inputs/ReactHookLatLngMap";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ReactHookMultiFormList from "components/micro/Inputs/ReactHookMultiFormList";
import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookInputCheckbox from "components/micro/Inputs/ReactHookInputCheckbox";
import ReactHookInputNumberFormat from "components/micro/Inputs/ReactHookInputNumberFormat";

import { ButtonsContainer, Container, mediaQuery } from "./styles";

const DadosInstitucionais: React.FC = () => {
    const { previousStep, nextStep } = useReactHookNavCard();
    return (
        <Container>
            <BlockTitle message="FORNEÇA AS INFORMAÇÕES EMPRESARIAIS A RESPEITO DO FORNECEDOR SENDO CADASTRADO" />
            <ReactHookFormItemCard required>
                <ReactHookInputText label="NOME DO FORNECEDOR" name="nome" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard>
                <ReactHookInputNumberFormat
                    label="TELEFONE PARA CONTATO*"
                    name="telefone"
                    format={["(##) ####-#####", "(##) #####-####"]}
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookInputText label="CPF OU CNPJ DO FORNECEDOR" name="cnpj" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookMultiFormList
                    label="QUAIS OS TIPO DE SERVIÇOS OFERECIDOS PELO FORNECEDOR?"
                    formListSpacing="30px"
                    fieldsHorizontal={mediaQuery.desktop}
                    name="ramo"
                >
                    <ReactHookInputCheckbox label="Mecânica (reparo e revisão)" name="ramo[0]" />
                    <ReactHookInputCheckbox label="Combustível e óleo" name="ramo[1]" />
                    <ReactHookInputCheckbox label="Seguros" name="ramo[2]" />
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

export default DadosInstitucionais;
