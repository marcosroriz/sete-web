import React from "react";
import { Button } from "react-bootstrap";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import BlockTitle from "components/micro/BlockTitle";
import ReactHookLatLngMap from "components/micro/Inputs/ReactHookLatLngMap";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ReactHookMultiFormList from "components/micro/Inputs/ReactHookMultiFormList";
import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookInputCheckbox from "components/micro/Inputs/ReactHookInputCheckbox";
import ReactHookInputRadio from "components/micro/Inputs/ReactHookInputRadio";
import ReactHookInputSelect from "components/micro/Inputs/ReactHookInputSelect";

import { ButtonsContainer, Container, mediaQuery } from "./styles";

type SelectOptionsObj = {
    1: { label: string; value: string }[];
    2: { label: string; value: string }[];
};

const DadosBasicos: React.FC = () => {
    const { nextStep } = useReactHookNavCard();
    return (
        <Container>
            <BlockTitle message="FORNEÇA AS INFORMAÇÕES BÁSICAS A RESPEITO DA ROTA SENDO CADASTRADA" />
            <ReactHookFormItemCard required>
                <ReactHookMultiFormList
                    label="TIPO DE ROTA*"
                    name="tipo_rota"
                    isHorizontal={mediaQuery.desktop}
                    fieldsHorizontal={mediaQuery.mobile}
                    formListSpacing="20px"
                >
                    <ReactHookInputRadio label="Rodoviária" value="1" name="rodoviaria" position="right" />
                    <ReactHookInputRadio label="Aquaviária" value="2" name="aquaviaria" position="right" />
                    <ReactHookInputRadio label="Mista" value="3" name="mista" position="right" />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookInputText label="NOME DA ROTA*" name="nome_rota" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>
        </Container>
    );
};

export default DadosBasicos;
