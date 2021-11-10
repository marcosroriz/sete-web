import React from "react";
import { Button } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import { Escola } from "entities/Escola";

import ReactHookInputCheckbox from "components/micro/Inputs/ReactHookInputCheckbox";
import ReactHookMultiFormList from "components/micro/Inputs/ReactHookMultiFormList";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import BlockTitle from "components/micro/BlockTitle";

import { ButtonsContainer, Container, mediaQuery } from "./styles";

type EscolaData = [Escola | null, React.Dispatch<React.SetStateAction<Escola | null>>];

const DadosEscolares: React.FC = () => {
    const { setValue } = useFormContext();
    const { previousStep, aditionalData } = useReactHookNavCard();

    const [escolaData] = aditionalData?.escolaData as EscolaData;

    React.useEffect(() => {
        if (escolaData) {
            setValue("mec_in_regular", escolaData?.mec_in_regular === "S" || "");
            setValue("mec_in_eja", escolaData?.mec_in_eja === "S" || "");
            setValue("mec_in_profissionalizante", escolaData?.mec_in_profissionalizante === "S" || "");
            setValue("ensino_pre_escola", escolaData?.ensino_pre_escola === "S" || "");
            setValue("ensino_fundamental", escolaData?.ensino_fundamental === "S" || "");
            setValue("ensino_medio", escolaData?.ensino_medio === "S" || "");
            setValue("ensino_superior", escolaData?.ensino_superior === "S" || "");
            setValue("horario_matutino", escolaData?.horario_matutino === "S" || "");
            setValue("horario_vespertino", escolaData?.horario_vespertino === "S" || "");
            setValue("horario_noturno", escolaData?.horario_noturno === "S" || "");
        }
    }, [escolaData]);

    return (
        <Container>
            <BlockTitle message="POR FIM, FORNEÇA AS INFORMAÇÕES RELACIONADOS AO TIPO DE ENSINO DA ESCOLA:" />
            <ReactHookFormItemCard required>
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
            <ReactHookFormItemCard required>
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
            <ReactHookFormItemCard required>
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
