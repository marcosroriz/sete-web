import React from "react";
import { Button } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import ReactHookInputSelect from "components/micro/Inputs/ReactHookInputSelect";
import ReactHookMultiFormList from "components/micro/Inputs/ReactHookMultiFormList";
import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookInputRadio from "components/micro/Inputs/ReactHookInputRadio";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";

import { Container, ButtonsContainer, mediaQuery } from "./styles";

const optionsTipoRod = [
    { label: "Ônibus", value: "1" },
    { label: "Micro-ônibus", value: "2" },
    { label: "Van", value: "3" },
    { label: "Kombi", value: "4" },
    { label: "Caminhão", value: "5" },
    { label: "Caminhonete", value: "6" },
    { label: "Motocicleta", value: "7" },
    { label: "Animal de tração", value: "8" },
];

const optionsTipoAqua = [
    { label: "Lancha/Voadeira", value: "1" },
    { label: "Barco de madeira", value: "2" },
    { label: "Barco de alumínio", value: "3" },
    { label: "Canoa motorizada", value: "4" },
    { label: "Canoa a remo", value: "5" },
];

const optionsMarcaRod = [
    { label: "Iveco", value: "1" },
    { label: "Mercedes-Benz", value: "2" },
    { label: "Renault", value: "3" },
    { label: "Volkswagen", value: "4" },
    { label: "Volare", value: "5" },
];

const optionsMarcaAqua = [
    { label: "EMGEPRON (Empresa Gerencial de Projetos Navais)", value: "1" },
    { label: "ESTALEIRO B3", value: "2" },
    { label: "Yamanha", value: "3" },
];

const optionsTipo = {
    rod: [...optionsTipoRod],
    aqua: [...optionsTipoAqua],
};

const optionsMarca = {
    rod: [...optionsMarcaRod],
    aqua: [...optionsMarcaAqua],
};

const DadosBasicos: React.FC = () => {
    const { nextStep } = useReactHookNavCard();
    const { watch } = useFormContext();

    return (
        <Container>
            <h2>FORNEÇA AS INFORMAÇÕES BÁSICAS A RESPEITO DO VEÍCULO SENDO CADASTRADO.</h2>
            <ReactHookFormItemCard required>
                <ReactHookMultiFormList
                    label="QUAL O MODO DE TRANSPORT EDO VEÍCULO?*"
                    name="modo"
                    isHorizontal={mediaQuery.desktop}
                    fieldsHorizontal={mediaQuery.mobile}
                    formListSpacing="20px"
                >
                    <ReactHookInputRadio label="Rodoviário (Ônibus, Van, etc)" value="rod" name="modo" position="right" />
                    <ReactHookInputRadio label="Aquaviário (Lancha, Barco, etc)" value="aqua" name="modo" position="right" />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>

            <ReactHookFormItemCard required>
                <ReactHookInputSelect
                    label="QUAL O TIPO DE VEÍCULO?*"
                    name="tipo"
                    options={optionsTipo[watch("modo")] || []}
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard required>
                <ReactHookInputSelect
                    label="QUAL A MARCA DO VEÍCULO?*"
                    name="marca"
                    options={optionsMarca[watch("modo")] || []}
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard>
                <ReactHookInputSelect
                    label="CASO TENHA ADQUIRIDO O VEÍCULO PELO PROGRAMA CAMINHO DA ESCOLA, SELECIONE O MODELO DO MESMO*"
                    name="aquisicao_programa"
                    placeholder="Não se aplica"
                    options={[{ label: "Iveco", value: "gg" }]}
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard required>
                <ReactHookInputText label="ANO DE AQUISIÇÃO DO VEÍCULO*" name="aquisicao" type="number" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard required>
                <ReactHookMultiFormList
                    label="ORIGEM DO VEÍCULO?*"
                    name="origem"
                    isHorizontal={mediaQuery.desktop}
                    fieldsHorizontal={mediaQuery.mobile}
                    formListSpacing="20px"
                >
                    <ReactHookInputRadio label="Veículo Próprio" value="prop" name="origem" position="right" />
                    <ReactHookInputRadio label="Veículo Terceirizado" value="terc" name="origem" position="right" />
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
