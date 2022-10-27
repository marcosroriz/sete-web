import React from "react";
import { Button } from "react-bootstrap";

import { AssuntosEnum, AssuntosLabel } from "entities/Norma";

import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";
import BlockTitle from "components/micro/BlockTitle";
import ReactHookInputSelect from "components/micro/Inputs/ReactHookInputSelect";
import ReactHookInputMultiSelect from "components/micro/Inputs/ReactHookInputMultiSelect";

import { Container, mediaQuery } from "./styles";
import ReactHookInputFile from "components/micro/Inputs/ReactHookInputFile";

const tipos_normas = [
    { label: "Decreto", value: "0" },
    { label: "Deliberação", value: "1" },
    { label: "Instrução Normativa", value: "2" },
    { label: "Lei", value: "3" },
    { label: "Ordem de Serviço", value: "4" },
    { label: "Portaria", value: "5" },
    { label: "Resolução", value: "6" },
    { label: "Outro", value: "7" },
];

const aplicabilidade = [
    { label: "Ônibus", value: "0" },
    { label: "Bicicleta", value: "1" },
    { label: "Lancha", value: "2" },
    { label: "Todos", value: "3" },
    { label: "Não se aplica", value: "4" },
];

const assuntosOptions = [
    { label: "Campanhas educativas", value: "0" },
    { label: "Condições de trabalho do motorista", value: "1" },
    { label: "Conservação do veículo", value: "2" },
    { label: "Critérios de manutenção compartilhada para bicicletas", value: "3" },
    { label: "Distância máxima a ser percorrida - residência e embarque", value: "4" },
    { label: "Estudante beneficiados", value: "5" },
    { label: "Itinerários - menor tempo x maior segurança", value: "6" },
    { label: "Ponto de embarque e desembarque", value: "7" },
    { label: "Presença de monitores", value: "8" },
    { label: "Prevê atendimento a atividade pedagógicas, esportivas e culturais", value: "9" },
    { label: "Prevê atendimento a educação superior", value: "10" },
    { label: "Regras de uso de bicicleta", value: "11" },
    { label: "Segurança do estudante", value: "12" },
    { label: "Outros", value: "13" },
];

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
                    options={tipos_normas}
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
                    options={aplicabilidade}
                    hasPlaceholderOption={true}
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookInputFile label="ARQUIVO DA NORMA (PDF): *" name="arquivo" placeholder="Solte os arquivos aqui!" />
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
