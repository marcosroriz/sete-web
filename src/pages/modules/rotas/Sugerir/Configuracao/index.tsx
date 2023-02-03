import React from "react";
import { Button } from "react-bootstrap";

import { useAuth } from "contexts/Auth";
import { AlunosService } from "services/Alunos";
import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import { AlunosList } from "entities/Aluno";
import { alunosListHelper } from "helpers/DualMultiSelect/AlunosListRotaHelper";
import { formatHelper } from "helpers/FormatHelper";

import BlockTitle from "components/micro/BlockTitle";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";
import ReactHookDualMultiSelect from "components/micro/Inputs/ReactHookDualMultiSelect";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ReactHookMultiFormList from "components/micro/Inputs/ReactHookMultiFormList";
import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookInputCheckbox from "components/micro/Inputs/ReactHookInputCheckbox";
import ReactHookInputRadio from "components/micro/Inputs/ReactHookInputRadio";
import ReactHookInputSelect from "components/micro/Inputs/ReactHookInputSelect";

import { Container, mediaQuery } from "./styles";

// const gerarOptions = formatHelper.getNumbersEnumValues(TiposVeiculosEnum).map((value) => ({
//     label: TiposVeiculosLabel.get(value as TiposVeiculosEnum) || "",
//     value: value.toString(),
// }));

const Configuracao: React.FC = () => {
    const { previousStep } = useReactHookNavCard();

    return (
        <Container>
            <BlockTitle message="FORNEÇA AS INFORMAÇÕES BÁSICAS A RESPEITO DA ROTA SENDO CADASTRADA" />

            <ReactHookFormItemCard required>
                <ReactHookMultiFormList
                    label="GERAR ROTAS PARA:*"
                    name="gerar"
                    isHorizontal={mediaQuery.desktop}
                    fieldsHorizontal={mediaQuery.mobile}
                    formListSpacing="20px"
                >
                    {/* {gerarOptions} */}
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookMultiFormList
                    label="TURNO:*"
                    name="turno"
                    isHorizontal={mediaQuery.desktop}
                    fieldsHorizontal={mediaQuery.mobile}
                    formListSpacing="20px"
                >
                    {/* {tiposRotasOptions} */}
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookInputText
                    label="TEMPO MÁXIMO DE VIAGEM POR ROTA:*"
                    type="number"
                    suffix="MINUTOS"
                    name="tempo"
                    placeholder="90"
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookInputText
                    label="DISTÂNCIA MÁXIMA POR ROTA:*"
                    type="number"
                    suffix="KM"
                    name="distancia"
                    placeholder="60"
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookInputText
                    label="VELOCIDADE MÉDIA DOS VEÍCULOS:*"
                    type="number"
                    suffix="KM/H"
                    name="velocidade_media"
                    placeholder="80"
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookInputText
                    label="QUANTIDADE DE VEÍCULOS:*"
                    type="number"
                    suffix="VEÍCULOS"
                    name="velocidade_media"
                    placeholder="80"
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookInputText
                    label="CAPACIDADE MÁXIMA DE CADA VEÍCULO:*"
                    type="number"
                    suffix="ESTUDANTES"
                    name="capacidade_maxima"
                    placeholder="80"
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>
            <ButtonsContainer>
                <Button variant="info" type="submit" className="btn-fill">
                    Próximo
                </Button>
            </ButtonsContainer>
        </Container>
    );
};

export default Configuracao;
