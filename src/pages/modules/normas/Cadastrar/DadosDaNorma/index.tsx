import React from "react";
import { Button } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

import { formatHelper } from "helpers/FormatHelper";
import { AssuntosEnum, AssuntosLabel, TiposNormasEnum, TiposNormasLabel, TransportesEnum, TransportesLabel } from "entities/Norma";

import ReactHookInputMultiSelect from "components/micro/Inputs/ReactHookInputMultiSelect";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ReactHookInputSelect from "components/micro/Inputs/ReactHookInputSelect";
import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookInputFile from "components/micro/Inputs/ReactHookInputFile";
import ReactHookInputNumberFormat from "components/micro/Inputs/ReactHookInputNumberFormat";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";
import BlockTitle from "components/micro/BlockTitle";

import { Container, mediaQuery } from "./styles";
import { useReactHookNavCard } from "contexts/ReactHookNavCard";

type NormaData = any;

const assuntosOptions = formatHelper.getNumbersEnumValues(AssuntosEnum).map((value) => ({
    label: AssuntosLabel.get(value as AssuntosEnum) || "",
    value: value.toString(),
}));

const normasOptions = formatHelper.getNumbersEnumValues(TiposNormasEnum).map((value) => ({
    label: TiposNormasLabel.get(value as TiposNormasEnum) || "",
    value: value.toString(),
}));

const transportesOptions = formatHelper.getNumbersEnumValues(TransportesEnum).map((value) => ({
    label: TransportesLabel.get(value as TransportesEnum) || "",
    value: value.toString(),
}));

const DadosDaNorma: React.FC = () => {
    const { setValue } = useFormContext();
    const { aditionalData } = useReactHookNavCard();

    const [normaData] = aditionalData?.normaData as NormaData;

    React.useEffect(() => {
        if (!!normaData) {
            setValue("titulo", normaData?.titulo.toString() || "");
            setValue("data_norma", normaData?.data_norma.toString() || "");
            setValue("id_tipo", normaData?.id_tipo.toString() || "");
            setValue("id_assunto", normaData?.id_assunto.toString() || "");
            setValue("tipo_veiculo", normaData?.tipo_veiculo.toString() || "");
        }
    }, [normaData]);

    return (
        <Container>
            <BlockTitle message="FORNEÇA AS INFORMAÇÕES A RESPEITO DA NORMA SENDO CADASTRADA." />
            <ReactHookFormItemCard required>
                <ReactHookInputText label="TÍTULO DA NORMA: *" name="titulo" placeholder="Exemplo: RESOLUÇÃO ABC de 20XX" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookInputNumberFormat
                    label="DATA DA NORMA: *"
                    name="data_norma"
                    format="##/##/####"
                    placeholder="dd/mm/aaaa"
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookInputSelect
                    label="TIPO DA NORMA: *"
                    name="id_tipo"
                    options={normasOptions}
                    hasPlaceholderOption={true}
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookInputMultiSelect
                    label="ASSUNTO DA NORMA: *"
                    name="id_assunto"
                    options={assuntosOptions}
                    placeholder="Marque todos que se aplique"
                    thinBorder={false}
                    isHorizontal={mediaQuery.desktop}
                    menuPlacement="bottom"
                />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookInputSelect
                    label="A NORMA SE APLICA A ALGUM MODO DE TRANSPORTE ESPECÍFICO? *"
                    name="tipo_veiculo"
                    options={transportesOptions}
                    hasPlaceholderOption={true}
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookInputFile label="ARQUIVO DA NORMA (PDF): *" accept=".pdf" name="arquivo" placeholder="Solte os arquivos aqui!" />
            </ReactHookFormItemCard>

            <ButtonsContainer>
                <Button variant="info" type="submit" className="btn-fill">
                    Salvar
                </Button>
            </ButtonsContainer>
        </Container>
    );
};

export default DadosDaNorma;
