import React from "react";
import { Button } from "react-bootstrap";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";
import { formatHelper } from "helpers/FormatHelper";
import BlockTitle from "components/micro/BlockTitle";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ReactHookMultiFormList from "components/micro/Inputs/ReactHookMultiFormList";
import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookInputCheckbox from "components/micro/Inputs/ReactHookInputCheckbox";
import ReactHookInputRadio from "components/micro/Inputs/ReactHookInputRadio";
import ReactHookInputSelect from "components/micro/Inputs/ReactHookInputSelect";

import { Container, mediaQuery } from "./styles";
import { TiposVeiculosEnum, TiposVeiculosLabel } from "entities/Rota";

const veiculosOptions = formatHelper.getNumbersEnumValues(TiposVeiculosEnum).map((value) => ({
    label: TiposVeiculosLabel.get(value as TiposVeiculosEnum) || "",
    value: value.toString(),
}));

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
                <ReactHookInputText label="NOME DA ROTA*" name="nome" isHorizontal={mediaQuery.desktop} placeholder="Exemplo: Rota Gávea Tijuca" />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard>
                <ReactHookInputSelect
                    label="INFORME O VEÍCULO (E PLACA) UTILIZADO PARA REALIZAR ESSA ROTA:"
                    name="veiculo_utilizado"
                    options={veiculosOptions}
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
                    label="A ROTA PASSA POR ALGUM LOCAL DE DIFÍCIL ACESSO? SE SIM, MARQUE AS DIFICULDADES:"
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
                <ReactHookInputText
                    label="INFORME A QUILOMETRAGEM ESTIMADA PARA ESSA ROTA (IDA + VOLTA)"
                    type="number"
                    suffix="KM"
                    name="km"
                    placeholder="Kilometragem estimada"
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookInputText
                    label="INFORME O TEMPO ESTIMADO PARA ESSA ROTA (IDA + VOLTA):"
                    type="number"
                    suffix="MIN"
                    name="tempo"
                    placeholder="Tempo estimado"
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard placeItems="center">
                <ReactHookMultiFormList
                    label="INFORME O HORÁRIO DE INÍCIO E TÉRMINO DA VIAGEM DE IDA"
                    name="horariosIda"
                    fieldsHorizontal={mediaQuery.mobile}
                    formListSpacing="40px"
                >
                    <ReactHookInputText label="HORÁRIO DE INÍCIO*" name="inicioIda" placeholder="09:00" isHorizontal={mediaQuery.desktop} dontShowError />
                    <ReactHookInputText label="HORÁRIO DE TÉRMINO*" name="terminoIda" placeholder="12:15" isHorizontal={mediaQuery.desktop} dontShowError />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>
            <ReactHookFormItemCard placeItems="center">
                <ReactHookMultiFormList
                    label="INFORME O HORÁRIO DE INÍCIO E TÉRMINO DA VIAGEM DE VOLTA"
                    name="horariosVolta"
                    fieldsHorizontal={mediaQuery.mobile}
                    formListSpacing="40px"
                >
                    <ReactHookInputText label="HORÁRIO DE INÍCIO*" name="inicioVolta" placeholder="09:00" isHorizontal={mediaQuery.desktop} dontShowError />
                    <ReactHookInputText label="HORÁRIO DE TÉRMINO*" name="terminoVolta" placeholder="12:15" isHorizontal={mediaQuery.desktop} dontShowError />
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

export default DadosBasicos;
