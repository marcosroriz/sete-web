import React from "react";
import { Button } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";
import { Monitor } from "entities/Monitor";
import { useAuth } from "contexts/Auth";

import ReactHookMultiFormList from "components/micro/Inputs/ReactHookMultiFormList";
import ReactHookInputMultiFiles from "components/micro/Inputs/ReactHookInputMultiFiles";
import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookInputNumberFormat from "components/micro/Inputs/ReactHookInputNumberFormat";
import ReactHookInputRadio from "components/micro/Inputs/ReactHookInputRadio";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";
import BlockTitle from "components/micro/BlockTitle";

import { Container, mediaQuery } from "./styles";

type MonitorData = [Monitor | null, React.Dispatch<React.SetStateAction<Monitor | null>>];

const DadosPessoais: React.FC = () => {
    const { user } = useAuth();
    const { setValue } = useFormContext();
    const { previousStep, nextStep, aditionalData } = useReactHookNavCard();

    const [monitorData] = aditionalData?.monitorData as MonitorData;

    React.useEffect(() => {
        if (!!monitorData) {
            setValue("nome", monitorData?.nome || "");
            setValue("cpf", monitorData?.cpf || "");
            setValue("data_nascimento", monitorData?.data_nascimento || "");
            setValue("telefone", monitorData?.telefone || "");
            setValue("vinculo", monitorData?.vinculo?.toString() || "");
            setValue("sexo", monitorData?.sexo?.toString() || "");
        }
    }, []);

    return (
        <Container>
            <BlockTitle message="Forneça as informações básicas a respeito do monitor sendo cadastrado." />
            <ReactHookFormItemCard required>
                <ReactHookInputText label="NOME DO MONITOR*" name="nome" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard required>
                <ReactHookInputNumberFormat label="CPF DO MONITOR*" name="cpf" format="###.###.###-##" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard required>
                <ReactHookInputNumberFormat label="DATA DE NASCIMENTO*" name="data_nascimento" format="##/##/####" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard>
                <ReactHookInputNumberFormat
                    label="TELEFONE*"
                    name="telefone"
                    format={["(##) ####-#####", "(##) #####-####"]}
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard required>
                <ReactHookMultiFormList label="VÍNCULO TRABALHISTA*" name="vinculo" isHorizontal={mediaQuery.desktop} fieldsHorizontal={mediaQuery.mobile}>
                    <ReactHookInputRadio label="Servidor efetivo" value="1" name="vinculo" position="right" />
                    <ReactHookInputRadio label="Servidor comissionado" value="2" name="vinculo" position="right" />
                    <ReactHookInputRadio label="Terceirizado" value="3" name="vinculo" position="right" />
                    <ReactHookInputRadio label="Outro" value="4" name="vinculo" position="right" />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>

            <ReactHookFormItemCard required>
                <ReactHookMultiFormList label="SEXO DO MONITOR*" name="sexo" isHorizontal={mediaQuery.desktop} fieldsHorizontal={mediaQuery.mobile}>
                    <ReactHookInputRadio label="Masculino" value="1" name="sexo" position="right" />
                    <ReactHookInputRadio label="Feminino" value="2" name="sexo" position="right" />
                    <ReactHookInputRadio label="Não Informado" value="3" name="sexo" position="right" />
                </ReactHookMultiFormList>
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
