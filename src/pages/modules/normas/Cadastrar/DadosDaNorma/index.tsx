import React from "react";
import { Button } from "react-bootstrap";

import { formatHelper } from "helpers/FormatHelper";
import { AssuntosEnum, AssuntosLabel, TiposNormasEnum, TiposNormasLabel, TransportesEnum, TransportesLabel } from "entities/Norma";

import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";
import BlockTitle from "components/micro/BlockTitle";
import ReactHookInputSelect from "components/micro/Inputs/ReactHookInputSelect";
import ReactHookInputMultiSelect from "components/micro/Inputs/ReactHookInputMultiSelect";

import { Container, mediaQuery } from "./styles";
import ReactHookInputFile from "components/micro/Inputs/ReactHookInputFile";

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
    return (
        <Container>
            <BlockTitle message="PREENCHA OS DADOS REFERENTES A GARAGEM DO MUNICÍPIO. VOCÊ PODE CLICAR NO MAPA PARA MUDAR A LOCALIZAÇÃO DA GARAGEM." />
            <ReactHookFormItemCard required>
                <ReactHookInputText
                    label="TÍTULO DA NORMA: *"
                    name="titulo_norma"
                    placeholder="Exemplo: RESOLUÇÃO ABC de 20XX"
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookInputText label="DATA DA NORMA: *" name="data_norma" placeholder="dd/mm/aaaa" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookInputSelect
                    label="TIPO DA NORMA: *"
                    name="tipo_norma"
                    options={normasOptions}
                    hasPlaceholderOption={true}
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookInputMultiSelect
                    label="ASSUNTO DA NORMA: *"
                    name="assunto_norma"
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
                    name="aplicabilidade"
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
