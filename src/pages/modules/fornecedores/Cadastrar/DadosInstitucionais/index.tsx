import React from "react";
import { Button } from "react-bootstrap";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import BlockTitle from "components/micro/BlockTitle";
import ReactHookLatLngMap from "components/micro/Inputs/ReactHookLatLngMap";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ReactHookMultiFormList from "components/micro/Inputs/ReactHookMultiFormList";
import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookInputCheckbox from "components/micro/Inputs/ReactHookInputCheckbox";

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
                <ReactHookInputText label="TELEFONE" name="telefone" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookInputText label="CPF OU CNPJ DO FORNECEDOR" name="cpf_cnpj" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookMultiFormList
                    label="QUAIS OS TIPO DE SERVIÇOS OFERECIDOS PELO FORNECEDOR?"
                    formListSpacing="30px"
                    fieldsHorizontal={mediaQuery.desktop}
                >
                    <ReactHookInputCheckbox label="Mecânica (reparo e revisão)" name="so_mecanica" />
                    <ReactHookInputCheckbox label="Combustível e óleo" name="so_combustivel_oleo" />
                    <ReactHookInputCheckbox label="Seguros" name="so_seguros" />
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
