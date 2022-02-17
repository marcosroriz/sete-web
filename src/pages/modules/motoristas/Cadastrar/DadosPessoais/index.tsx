import React from "react";
import { Button } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";
import { Motorista } from "entities/Motorista";

import ReactHookMultiFormList from "components/micro/Inputs/ReactHookMultiFormList";
import ReactHookInputMultiFiles from "components/micro/Inputs/ReactHookInputMultiFiles";
import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookInputNumberFormat from "components/micro/Inputs/ReactHookInputNumberFormat";
import ReactHookInputRadio from "components/micro/Inputs/ReactHookInputRadio";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";
import BlockTitle from "components/micro/BlockTitle";

import { Container, mediaQuery } from "./styles";

type MotoristaData = [Motorista | null, React.Dispatch<React.SetStateAction<Motorista | null>>];

const DadosPessoais: React.FC = () => {
    const { setValue } = useFormContext();
    const { nextStep, aditionalData } = useReactHookNavCard();

    const [motoristaData] = aditionalData?.motoristaData as MotoristaData;

    React.useEffect(() => {
        if (!!motoristaData) {
            setValue("nome", motoristaData?.nome || "");
            setValue("cpf", motoristaData?.cpf || "");
            setValue("data_nascimento", motoristaData?.data_nascimento.toString() || "");
            setValue("telefone", motoristaData?.telefone || "");
            setValue("vinculo", motoristaData?.vinculo?.toString() || "");
            setValue("sexo", motoristaData?.sexo?.toString() || "");
            setValue("ant_criminais", motoristaData?.ant_criminais || "");
            //setValue("arquivos", motoristaData?.arquivos || "");
        }
    }, [motoristaData]);

    return (
        <Container>
            <BlockTitle message="Forneça as informações básicas a respeito do aluno sendo cadastrado." />
            <ReactHookFormItemCard required>
                <ReactHookInputText label="NOME DO MOTORISTA*" name="nome" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard required>
                <ReactHookInputNumberFormat label="CPF DO MOTORISTA*" name="cpf" format="###.###.###-##" isHorizontal={mediaQuery.desktop} />
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
                    <ReactHookInputRadio label="Servidor terceirizado" value="3" name="vinculo" position="right" />
                    <ReactHookInputRadio label="Outro" value="4" name="vinculo" position="right" />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>

            <ReactHookFormItemCard required>
                <ReactHookMultiFormList label="SEXO DO MOTORISTA*" name="sexo" isHorizontal={mediaQuery.desktop} fieldsHorizontal={mediaQuery.mobile}>
                    <ReactHookInputRadio label="Masculino" value="1" name="sexo" position="right" />
                    <ReactHookInputRadio label="Feminino" value="2" name="sexo" position="right" />
                    <ReactHookInputRadio label="Não Informado" value="3" name="sexo" position="right" />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>

            <ReactHookFormItemCard>
                <ReactHookInputText label="NÚMERO DO DOCUMENTO DE ANTECENDENTES CRIMINAIS*" name="ant_criminais" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard>
                <ReactHookInputMultiFiles
                    label="ANEXAR PDF COM DOCUMENTOS PESSOAIS*"
                    name="arquivos"
                    accept="image/*, application/pdf"
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
