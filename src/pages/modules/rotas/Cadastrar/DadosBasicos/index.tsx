import React from "react";
import { Button } from "react-bootstrap";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import BlockTitle from "components/micro/BlockTitle";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ReactHookMultiFormList from "components/micro/Inputs/ReactHookMultiFormList";
import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookInputCheckbox from "components/micro/Inputs/ReactHookInputCheckbox";
import ReactHookInputRadio from "components/micro/Inputs/ReactHookInputRadio";
import ReactHookInputSelect from "components/micro/Inputs/ReactHookInputSelect";

import { Container, mediaQuery } from "./styles";

const veiculoOptions = [
    { label: "Escolher veículo depois", value: "0" },
    { label: "Caminhão (NLA-6006)", value: "1" },
    { label: "Motocicleta (NLA-6606)", value: "2" },
    { label: "Ônibus (ADS-FASA)", value: "3" },
    { label: "Van (NLA-6616)", value: "4" },
];

const motoristasOptions = [
    { label: "Escolher motorista depois", value: "0" },
    { label: "Exemplo", value: "1" },
    { label: "Fulano", value: "2" },
];

const DadosBasicos: React.FC = () => {
    const { nextStep } = useReactHookNavCard();
    return (
        <Container>
            <BlockTitle message="FORNEÇA AS INFORMAÇÕES BÁSICAS A RESPEITO DA ROTA SENDO CADASTRADA" />
            <ReactHookFormItemCard required>
                <ReactHookMultiFormList label="TIPO DE ROTA*" isHorizontal={mediaQuery.desktop} fieldsHorizontal={mediaQuery.mobile} formListSpacing="20px">
                    <ReactHookInputRadio label="Rodoviária" value="1" name="tipo" position="right" />
                    <ReactHookInputRadio label="Aquaviária" value="2" name="tipo" position="right" />
                    <ReactHookInputRadio label="Mista" value="3" name="tipo" position="right" />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookInputText label="NOME DA ROTA*" name="nome" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard>
                <ReactHookInputSelect
                    label="INFORME O VEÍCULO (E PLACA) UTILIZADO PARA REALIZAR ESSA ROTA:"
                    name="veiculo_utilizado"
                    options={veiculoOptions}
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard>
                <ReactHookInputSelect
                    label="INFORME OS MOTORISTAS RESPONSÁVEIS POR ESSA ROTA:"
                    name="motoristas_responsaveis"
                    options={motoristasOptions}
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookMultiFormList
                    label="EM RELAÇÃO AO HORÁRIO DE FUNCIONAMENTO, A ROTA FUNCIONA NO PERÍODO DA:*"
                    formListSpacing="30px"
                    isHorizontal={mediaQuery.desktop}
                    fieldsHorizontal={mediaQuery.mobile}
                    name="turno"
                >
                    <ReactHookInputCheckbox label="Manhã" name="turno[0]" />
                    <ReactHookInputCheckbox label="Tarde" name="turno[1]" />
                    <ReactHookInputCheckbox label="Noite" name="turno[2]" />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>
            <ReactHookFormItemCard>
                <ReactHookMultiFormList
                    label="A ROTA PASSA POR ALGUM LOCAL DE DIFÍCIL ACESSO? SE SIM, MARQUE AS DIFICULDADES"
                    formListSpacing="30px"
                    fieldsHorizontal={mediaQuery.mobile}
                >
                    <ReactHookInputCheckbox label="Porteira" name="da_porteira" />
                    <ReactHookInputCheckbox label="Mata-Burro" name="da_mataburro" />
                    <ReactHookInputCheckbox label="Colchete" name="da_colchete" />
                    <ReactHookInputCheckbox label="Atoleiro" name="da_atoleiro" />
                    <ReactHookInputCheckbox label="Ponte Rústica" name="da_ponterustica" />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookInputText label="INFORME A QUILOMETRAGEM ESTIMADA PARA ESTA ROTA:" type="number" name="km" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookInputText label="INFORME O TEMPO ESTIMADO PARA ESTA ROTA:" type="number" name="tempo" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>
            <ButtonsContainer>
                <Button variant="info" type="button" className="btn-fill" onClick={nextStep}>
                    Próximo
                </Button>
            </ButtonsContainer>
        </Container>
    );
};

export default DadosBasicos;
