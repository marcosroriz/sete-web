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
            setValue("mec_in[0]", escolaData?.mec_in_regular === "S" || "");
            setValue("mec_in[1]", escolaData?.mec_in_eja === "S" || "");
            setValue("mec_in[2]", escolaData?.mec_in_profissionalizante === "S" || "");
            setValue("mec_in[3]", escolaData?.mec_in_especial_exclusiva === "S" || "");
            setValue("ensino[0]", escolaData?.ensino_pre_escola === "S" || "");
            setValue("ensino[1]", escolaData?.ensino_fundamental === "S" || "");
            setValue("ensino[2]", escolaData?.ensino_medio === "S" || "");
            setValue("ensino[3]", escolaData?.ensino_superior === "S" || "");
            setValue("horario[0]", escolaData?.horario_matutino === "S" || "");
            setValue("horario[1]", escolaData?.horario_vespertino === "S" || "");
            setValue("horario[2]", escolaData?.horario_noturno === "S" || "");
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
                    name="mec_in"
                >
                    <ReactHookInputCheckbox label="Regular" name="mec_in[0]" /*mec_in_regular*/ />
                    <ReactHookInputCheckbox label="EJA" name="mec_in[1]" /*mec_in_eja*/ />
                    <ReactHookInputCheckbox label="Profissionalizante" name="mec_in[2]" /*mec_in_profissionalizante*/ />
                    <ReactHookInputCheckbox label="Especial e/ou exclusiva" name="mec_in[3]" /*mec_in_especial_exclusiva*/ />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookMultiFormList
                    label="EM RELAÇÃO AO NÍVEL A ESCOLA OFERECE ENSINO:*"
                    isHorizontal={mediaQuery.desktop}
                    fieldsHorizontal={mediaQuery.mobile}
                    formListSpacing="20px"
                    name="ensino"
                >
                    <ReactHookInputCheckbox label="Infantil" name="ensino[0]" /*ensino_pre_escola*/ />
                    <ReactHookInputCheckbox label="Fundamental" name="ensino[1]" /*ensino_fundamental*/ />
                    <ReactHookInputCheckbox label="Médio" name="ensino[2]" /*ensino_medio*/ />
                    <ReactHookInputCheckbox label="Superior" name="ensino[3]" /*ensino_superior*/ />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookMultiFormList
                    label="EM RELAÇÃO AO HORÁRIO DE FUNCIONAMENTO, A ESCOLA FUNCIONA NO PERÍODO DA:*"
                    isHorizontal={mediaQuery.desktop}
                    fieldsHorizontal={mediaQuery.mobile}
                    formListSpacing="20px"
                    name="horario"
                >
                    <ReactHookInputCheckbox label="Manhã" name="horario[0]" /*horario_matutino*/ />
                    <ReactHookInputCheckbox label="Tarde" name="horario[1]" /*horario_vespertino*/ />
                    <ReactHookInputCheckbox label="Noite" name="horario[2]" /*horario_noturno*/ />
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
