import React from "react";
import { Button } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";
import { useWatch } from "react-hook-form";

import ReactHookMultiFormList from "components/micro/Inputs/ReactHookMultiFormList";
import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookInputRadio from "components/micro/Inputs/ReactHookInputRadio";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ReactHookInputMask from "components/micro/Inputs/ReactHookInputMask";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";
import BlockTitle from "components/micro/BlockTitle";

import { Container, mediaQuery } from "./styles";
import { Veiculo } from "entities/Veiculo";
import ReactHookInputNumberFormat from "components/micro/Inputs/ReactHookInputNumberFormat";

type VeiculoData = [Veiculo | null, React.Dispatch<React.SetStateAction<Veiculo | null>>];

const DetalhesVeiculo: React.FC = () => {
    const { setValue } = useFormContext();
    const { step, previousStep, aditionalData } = useReactHookNavCard();
    const [veiculoData] = aditionalData?.veiculoData as VeiculoData;

    React.useEffect(() => {
        if (veiculoData) {
            setValue("placa", veiculoData?.placa || "");
            setValue("renavam", veiculoData?.renavam || "");
            setValue("km_inicial", Number(veiculoData?.km_inicial) || 0);
            setValue("km_atual", Number(veiculoData?.km_atual) || 0);
            setValue("capacidade", veiculoData?.capacidade?.toString() || "");
            setValue("manutencao", veiculoData?.manutencao === "1" ? "true" : "false");
            setValue("ipva", veiculoData?.ipva || "");
            setValue("dpvat", veiculoData?.dpvat || "");
            setValue("ipva", veiculoData?.ipva || "");
            setValue("consumo", veiculoData?.consumo || "");
            setValue("tipo_combustivel", veiculoData?.tipo_combustivel || "");
        }
    }, [veiculoData]);

    React.useEffect(() => {
        if (step === 1) {
            (document.getElementById("placa") as any).focus();
            (document.getElementById("placa") as any).blur();
        }
    }, [step]);
    const check = useWatch({
        name: "modo",
    });
    return (
        <Container>
            <BlockTitle message="POR FIM, INFORME OS DADOS CADASTRAIS DO VEÍCULO." />
            <ReactHookFormItemCard required>
                <ReactHookInputMask
                    label="PLACA DO VEÍCULO: *"
                    name="placa"
                    format="aaa-9999"
                    placeholder="FORMATO AAA-0000"
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard required>
                <ReactHookInputNumberFormat
                    label="RENAVAM DO VEÍCULO: *"
                    name="renavam"
                    format="##########-#"
                    placeholder="Informe o RENAVAM do veículo:"
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard>
                <ReactHookInputText
                    label="QUILOMETRAGEM ATUAL DO VEÍCULO:"
                    name="km_atual"
                    type="number"
                    suffix="KM"
                    placeholder="Informe a quilometragem do veículo:"
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard required>
                <ReactHookInputText
                    label="CAPACIDADE DO VEÍCULO: *"
                    name="capacidade"
                    type="number"
                    suffix="PASSAGEIROS"
                    placeholder="Informe a capacidade do veículo:"
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard required>
                <ReactHookMultiFormList
                    label="O VEÍCULO ESTÁ ATUALMENTE EM MANUTENÇÃO?*"
                    name="manutencao"
                    isHorizontal={mediaQuery.desktop}
                    fieldsHorizontal={mediaQuery.mobile}
                    formListSpacing="20px"
                >
                    <ReactHookInputRadio label="Sim" value="true" name="manutencao" position="right" />
                    <ReactHookInputRadio label="Não" value="false" name="manutencao" position="right" />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>

            <ReactHookFormItemCard>
                <ReactHookInputText
                    label="VALOR DO IPVA DO VEÍCULO (ANUAL E COM LICENCIAMENTO)"
                    name="ipva"
                    type="number"
                    prefix={"R$"}
                    placeholder="Valor em Reais"
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard>
                <ReactHookInputText
                    label="VALOR ANUAL DO DPVAT DO VEÍCULO"
                    name="dpvat"
                    type="number"
                    prefix="R$"
                    placeholder="Valor em Reais"
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard>
                <ReactHookInputText
                    label="SEGURO ANUAL DO VEÍCULO"
                    name="seguro_anual"
                    type="number"
                    prefix="R$"
                    placeholder="Valor em Reais"
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard>
                <ReactHookInputText
                    label="CONSUMO DO VEÍCULO (KM/L)"
                    name="consumo"
                    type="number"
                    suffix="KM/L"
                    placeholder="Informe o consumo do veículo:"
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard>
                <ReactHookMultiFormList
                    label="TIPO DE COMBUSTÍVEL PREFERENCIAL"
                    isHorizontal={mediaQuery.desktop}
                    fieldsHorizontal={mediaQuery.mobile}
                    formListSpacing="20px"
                >
                    <ReactHookInputRadio label="Gasolina" value="G" name="tipo_combustivel" position="right" />
                    <ReactHookInputRadio label="Diesel" value="D" name="tipo_combustivel" position="right" />
                    <ReactHookInputRadio label="Etanol" value="E" name="tipo_combustivel" position="right" />
                    <ReactHookInputRadio label="Gás Natural" value="N" name="tipo_combustivel" position="right" />
                    <ReactHookInputRadio label="Outro" value="O" name="tipo_combustivel" position="right" />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>

            <ButtonsContainer position="evenly">
                <Button variant="default" type="button" className="btn-fill" onClick={previousStep}>
                    Voltar
                </Button>
                <Button variant="info" type="submit" className="btn-fill">
                    Concluir
                </Button>
            </ButtonsContainer>
        </Container>
    );
};

export default DetalhesVeiculo;
