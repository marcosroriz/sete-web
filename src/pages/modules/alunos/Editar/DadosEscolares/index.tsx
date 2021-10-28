import React from "react";
import { Button } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";
import { Aluno } from "entities/Aluno";

import ReactHookInputRadio from "components/micro/Inputs/ReactHookInputRadio";
import ReactHookMultiFormList from "components/micro/Inputs/ReactHookMultiFormList";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ReactHookInputSelect from "components/micro/Inputs/ReactHookInputSelect";
import BlockTitle from "components/micro/BlockTitle";

import { ButtonsContainer, Container, mediaQuery } from "./styles";

const escolaOptions = [{ label: "Escolher rota depois", value: "0" }];
const rotaOptions = [{ label: "Escolher rota depois", value: "0" }];

type AlunoData = [Aluno | null, React.Dispatch<React.SetStateAction<Aluno | null>>];

const DadosEscolares: React.FC = () => {
    const { previousStep, aditionalData } = useReactHookNavCard();

    const [alunoData] = aditionalData?.alunoData as AlunoData;

    React.useEffect(() => {
        if (alunoData) {
            // setValue("latlng[0]", alunoData?.loc_latitude || "");
            // setValue("latlng[0]", alunoData.loc_longitude || "");
            // setValue("mec_co_uf", alunoData?.mec_co_uf?.toString() || "");
            // setValue("mec_co_municipio", alunoData?.mec_co_municipio?.toString() || "");
            // setValue("loc_endereco", alunoData?.loc_endereco || "");
            // setValue("loc_cep", alunoData?.loc_cep || "");
            // setValue("mec_tp_localizacao", alunoData?.mec_tp_localizacao?.toString() || "");
            // setValue("mec_tp_localizacao_diferenciada", alunoData?.mec_tp_localizacao_diferenciada?.toString() || "");
        }
    }, [alunoData]);
    return (
        <Container>
            <BlockTitle message="A RESPEITO DOS DADOS ESCOLARES DO ALUNO, RESPONDA:" />
            <ReactHookFormItemCard>
                <ReactHookInputSelect label="QUAL A ESCOLA DO ALUNO?" name="escola" options={escolaOptions} isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard>
                <ReactHookInputSelect label="QUAL A ROTA DO ALUNO?" name="rota" options={rotaOptions} isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookMultiFormList label="QUAL O TURNO QUE O ALUNO ESTUDA?*" name="turno" isHorizontal={mediaQuery.desktop} formListSpacing="20px">
                    <ReactHookInputRadio label="Manhã" value="1" name="turno" position="right" />
                    <ReactHookInputRadio label="Tarde (Vespertino)" value="2" name="turno" position="right" />
                    <ReactHookInputRadio label="Integral (Manhã + Tarde)" value="3" name="turno" position="right" />
                    <ReactHookInputRadio label="Noite (Noturno)" value="4" name="turno" position="right" />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookMultiFormList
                    label="EM QUAL NÍVEL DE ENSINO O ALUNO SE ENCONTRA?*"
                    name="nivel"
                    isHorizontal={mediaQuery.desktop}
                    formListSpacing="20px"
                >
                    <ReactHookInputRadio label="Infantil(Creche e Pré-Escola)" value="1" name="nivel" position="right" />
                    <ReactHookInputRadio label="Fundamental" value="2" name="nivel" position="right" />
                    <ReactHookInputRadio label="Médio" value="3" name="nivel" position="right" />
                    <ReactHookInputRadio label="Superior" value="4" name="nivel" position="right" />
                    <ReactHookInputRadio label="Outro" value="5" name="nivel" position="right" />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>
            <ButtonsContainer>
                <Button variant="default" type="button" className="btn-fill" onClick={previousStep}>
                    Voltar
                </Button>
                <Button variant="info" type="submit" className="btn-fill">
                    Concluír
                </Button>
            </ButtonsContainer>
        </Container>
    );
};

export default DadosEscolares;
