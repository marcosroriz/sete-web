import React from "react";
import { Button } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

import { formatHelper } from "helpers/FormatHelper";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";
import { useAuth } from "contexts/Auth";
import { EscolasService } from "services/Escolas";
import { RotasService } from "services/Rotas";
import { Aluno, TurnoEnum, TurnoLabel, NivelEnum, NivelLabel } from "entities/Aluno";

import ReactHookInputRadio from "components/micro/Inputs/ReactHookInputRadio";
import ReactHookMultiFormList from "components/micro/Inputs/ReactHookMultiFormList";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ReactHookInputSelect from "components/micro/Inputs/ReactHookInputSelect";
import BlockTitle from "components/micro/BlockTitle";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";

import { Container, mediaQuery } from "./styles";

type SelectOptions = {
    value: string;
    label: string;
};

type AlunoData = [Aluno | null, React.Dispatch<React.SetStateAction<Aluno | null>>];
type EscolaData = any;
type RotaData = any;

const turnoOptions = formatHelper
    .getNumbersEnumValues(TurnoEnum)
    .map((value) => (
        <ReactHookInputRadio key={value} name="turno" label={TurnoLabel.get(value as TurnoEnum) || ""} value={value.toString()} position="right" />
    ));

const nivelOptions = formatHelper
    .getNumbersEnumValues(NivelEnum)
    .map((value) => (
        <ReactHookInputRadio key={value} name="nivel" label={NivelLabel.get(value as NivelEnum) || ""} value={value.toString()} position="right" />
    ));

const DadosEscolares: React.FC = () => {
    const { user } = useAuth();
    const { setValue } = useFormContext();
    const { previousStep, aditionalData } = useReactHookNavCard();

    const [alunoData] = aditionalData?.alunoData as AlunoData;
    const [escolaData] = aditionalData?.escolaData as EscolaData;
    const [rotaData] = aditionalData?.rotaData as RotaData;

    const [escolaOptions, setEscolaOptions] = React.useState<SelectOptions[]>([]);
    const [rotaOptions, setRotaOptions] = React.useState<SelectOptions[]>([]);

    const fetchData = async () => {
        try {
            const codigo_cidade = user?.codigo_cidade || 0;
            const escolasService = new EscolasService();
            const rotasService = new RotasService();

            const escolasResponse = await escolasService.listEscolas(codigo_cidade);
            const rotasResponse = await rotasService.listRotas(codigo_cidade);
            setEscolaOptions(escolasResponse.data.map((escola) => ({ value: escola.id_escola.toString(), label: escola.nome })));
            setRotaOptions(rotasResponse.data.map((rota) => ({ value: rota.id_rota.toString(), label: rota.nome })));
        } catch (err) {
            console.log(err);
        }
    };

    React.useEffect(() => {
        fetchData();

        if (!!alunoData) {
            setValue("turno", alunoData?.turno.toString() || "");
            setValue("nivel", alunoData?.nivel.toString() || "");
        }
        if (!!escolaData) {
            setValue("escola", escolaData?.id_escola.toString() || "");
        }
        if (!!rotaData) {
            setValue("rota", rotaData?.id_rota.toString());
        }
    }, [alunoData, escolaData, rotaData]);

    return (
        <Container>
            <BlockTitle message="A RESPEITO DOS DADOS ESCOLARES DO ALUNO, RESPONDA:" />
            <ReactHookFormItemCard required>
                <ReactHookInputSelect
                    label="QUAL A ESCOLA DO ALUNO?*"
                    name="escola"
                    placeholder="Escolha uma escola"
                    options={escolaOptions}
                    isHorizontal={mediaQuery.desktop}
                    hasPlaceholderOption
                />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookInputSelect
                    label="QUAL A ROTA DO ALUNO?*"
                    name="rota"
                    options={rotaOptions}
                    placeholder="Escolha uma rota"
                    isHorizontal={mediaQuery.desktop}
                    hasPlaceholderOption
                />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookMultiFormList label="QUAL O TURNO QUE O ALUNO ESTUDA?*" name="turno" isHorizontal={mediaQuery.desktop} formListSpacing="20px">
                    {turnoOptions}
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookMultiFormList
                    label="EM QUAL NÍVEL DE ENSINO O ALUNO SE ENCONTRA?*"
                    name="nivel"
                    isHorizontal={mediaQuery.desktop}
                    formListSpacing="20px"
                >
                    {nivelOptions}
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

export default DadosEscolares;
