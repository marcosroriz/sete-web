import React from "react";
import { useFormContext } from "react-hook-form";

import { Button } from "react-bootstrap";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import { Escola, MecTpDependenciaEnum, MecTpDependenciaLabel } from "entities/Escola";

import ReactHookInputRadio from "components/micro/Inputs/ReactHookInputRadio";
import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookMultiFormList from "components/micro/Inputs/ReactHookMultiFormList";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ReactHookInputNumberFormat from "components/micro/Inputs/ReactHookInputNumberFormat";
import BlockTitle from "components/micro/BlockTitle";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";

import { Container, mediaQuery } from "./styles";

type EscolaData = [Escola | null, React.Dispatch<React.SetStateAction<Escola | null>>];

const mec_tp_dependenciaOptions = Object.values(MecTpDependenciaEnum).map((value) => (
    <ReactHookInputRadio key={value} name="mec_tp_dependencia" label={MecTpDependenciaLabel.get(value) || ""} value={value} position="right" />
));

const DadosBasicos: React.FC = () => {
    const { setValue } = useFormContext();
    const { previousStep, nextStep, aditionalData } = useReactHookNavCard();

    const [escolaData] = aditionalData?.escolaData as EscolaData;

    React.useEffect(() => {
        if (!!escolaData) {
            setValue("nome", escolaData?.nome);
            setValue("contato_responsavel", escolaData?.contato_responsavel);
            setValue("contato_telefone", escolaData?.contato_telefone);
            setValue("contato_email", escolaData?.contato_email);
            setValue("mec_tp_dependencia", escolaData?.mec_tp_dependencia?.toString() || "");
        }
    }, [escolaData]);

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
                    {mec_tp_dependenciaOptions}
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>
            <ButtonsContainer position={!!escolaData ? "evenly" : "right"}>
                {!!escolaData && (
                    <Button variant="default" type="button" className="btn-fill" onClick={previousStep}>
                        Voltar
                    </Button>
                )}
                <Button variant="info" type="button" className="btn-fill" onClick={nextStep}>
                    Próximo
                </Button>
            </ButtonsContainer>
        </Container>
    );
};

export default DadosBasicos;
