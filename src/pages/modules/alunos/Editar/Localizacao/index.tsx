import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import BlockTitle from "components/micro/BlockTitle";
import ReactHookLatLngMap from "components/micro/Inputs/ReactHookLatLngMap";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ReactHookMultiFormList from "components/micro/Inputs/ReactHookMultiFormList";
import ReactHookInputRadio from "components/micro/Inputs/ReactHookInputRadio";
import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookInputCheckbox from "components/micro/Inputs/ReactHookInputCheckbox";

import { ButtonsContainer, Container, mediaQuery } from "./styles";

const Localizacao: React.FC = () => {
    const { nextStep } = useReactHookNavCard();
    const history = useHistory();
    const handleCancelEditClick = () => {
        history.goBack();
    };
    return (
        <Container>
            <BlockTitle message="PREENCHA OS DADOS REFERENTES A LOCALIZAÇÃO DO ALUNO." />
            <ReactHookLatLngMap title="LOCALIZAÇÃO DA RESIDÊNCIA DO ALUNO (CLIQUE NO MAPA)" name="latlng" />
            <ReactHookFormItemCard placeItems="center" required>
                <ReactHookMultiFormList name="modo" isHorizontal={mediaQuery.desktop} fieldsHorizontal={mediaQuery.mobile} formListSpacing="20px">
                    <ReactHookInputText label="LATITUDE:" name="latlng[0]" isHorizontal={mediaQuery.desktop} dontShowError />
                    <ReactHookInputText label="LONGITUDE:" name="latlng[1]" isHorizontal={mediaQuery.desktop} dontShowError />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookMultiFormList
                    label="O ALUNO ESTÁ LOCALIZADO EM:*"
                    name="modo"
                    isHorizontal={mediaQuery.desktop}
                    fieldsHorizontal={mediaQuery.mobile}
                    formListSpacing="20px"
                >
                    <ReactHookInputRadio label="Área urbana" value="1" name="area" position="right" />
                    <ReactHookInputRadio label="Área rural" value="2" name="area" position="right" />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>
            <ReactHookFormItemCard>
                <ReactHookInputText label="ENDEREÇO" name="endereco" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard>
                <ReactHookMultiFormList
                    label="O LOCAL POSSUI ALGUMA DIFICULDADE DE ACESSO? SE SIM, MARQUE AS DIFICULDADES:"
                    name="dificuldade"
                    formListSpacing="30px"
                    fieldsHorizontal={mediaQuery.mobile}
                >
                    <ReactHookInputCheckbox label="Porteira" name="dificuldade[0]" />
                    <ReactHookInputCheckbox label="Mata-Burro" name="dificuldade[1]" />
                    <ReactHookInputCheckbox label="Colchete" name="dificuldade[2]" />
                    <ReactHookInputCheckbox label="Atoleiro" name="dificuldade[3]" />
                    <ReactHookInputCheckbox label="Ponte Rústica" name="dificuldade[4]" />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>
            <ButtonsContainer>
                <Button variant="danger" type="button" className="btn-fill" onClick={handleCancelEditClick}>
                    Cancelar Edição
                </Button>
                <Button variant="info" type="button" className="btn-fill" onClick={nextStep}>
                    Próximo
                </Button>
            </ButtonsContainer>
        </Container>
    );
};

export default Localizacao;
