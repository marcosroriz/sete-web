import React from "react";
import { Button } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";
import { Aluno, GrauParentescoEnum, GrauParentescoLabel, SexoEnum, SexoLabel, CorEnum, CorLabel } from "entities/Aluno";

import ReactHookInputRadio from "components/micro/Inputs/ReactHookInputRadio";
import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookInputCheckbox from "components/micro/Inputs/ReactHookInputCheckbox";
import ReactHookMultiFormList from "components/micro/Inputs/ReactHookMultiFormList";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ReactHookInputNumberFormat from "components/micro/Inputs/ReactHookInputNumberFormat";
import ReactHookInputSelect from "components/micro/Inputs/ReactHookInputSelect";
import BlockTitle from "components/micro/BlockTitle";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";

import { Container, mediaQuery } from "./styles";

type AlunoData = [Aluno | null, React.Dispatch<React.SetStateAction<Aluno | null>>];

const sexoOptions = Object.values(SexoEnum).map((value) => (
    <ReactHookInputRadio key={value} name="sexo" label={SexoLabel.get(value) || ""} value={value} position="right" />
));

const corOptions = Object.values(CorEnum).map((value) => (
    <ReactHookInputRadio key={value} name="cor" label={CorLabel.get(value) || ""} value={value} position="right" />
));

const grauOptions = Object.values(GrauParentescoEnum).map((value) => ({ label: GrauParentescoLabel.get(value) || "", value: value }));

const DadosPessoais: React.FC = () => {
    const { setValue } = useFormContext();
    const { nextStep, previousStep, aditionalData } = useReactHookNavCard();

    const [alunoData] = aditionalData?.alunoData as AlunoData;

    React.useEffect(() => {
        if (!!alunoData) {
            setValue("nome", alunoData?.nome || "");
            setValue("cpf", alunoData?.cpf || "");
            setValue("data_nascimento", alunoData?.data_nascimento || "");
            setValue("nome_responsavel", alunoData?.nome_responsavel || "");
            setValue("telefone_responsavel", alunoData?.telefone_responsavel || "");
            setValue("grau_responsavel", alunoData?.grau_responsavel?.toString() || "");
            setValue("sexo", alunoData?.sexo?.toString() || "");
            setValue("cor", alunoData?.cor?.toString() || "");
            setValue("def_caminhar", alunoData?.def_caminhar === "S");
            setValue("def_ouvir", alunoData?.def_ouvir === "S");
            setValue("def_enxergar", alunoData?.def_enxergar === "S");
            setValue("def_mental", alunoData?.def_mental === "S");
        }
    }, []);

    return (
        <Container>
            <BlockTitle message="FORNEÇA AS INFORMAÇÕES BÁSICAS A RESPEITO DO ALUNO SENDO CADASTRADO." />
            <ReactHookFormItemCard required>
                <ReactHookInputText label="NOME DO ALUNO*" name="nome" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard>
                <ReactHookInputNumberFormat label="CPF DO ALUNO" name="cpf" format="###.###.###-##" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookInputNumberFormat label="DATA DE NASCIMENTO*" name="data_nascimento" format="##/##/####" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard>
                <ReactHookInputText label="NOME DO RESPONSÁVEL" name="nome_responsavel" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard>
                <ReactHookInputNumberFormat
                    label="TELEFONE DO RESPONSÁVEL"
                    name="telefone_responsavel"
                    format={["(##) ####-#####", "(##) #####-####"]}
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard>
                <ReactHookInputSelect
                    label="GRAU DE PARENTESCO DO RESPONSÁVEL"
                    name="grau_responsavel"
                    options={grauOptions}
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookMultiFormList
                    label="SEXO DO ALUNO É?*"
                    name="sexo"
                    isHorizontal={mediaQuery.desktop}
                    fieldsHorizontal={mediaQuery.mobile}
                    formListSpacing="20px"
                >
                    {sexoOptions}
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookMultiFormList
                    label="A COR DO ALUNO É?*"
                    name="cor"
                    isHorizontal={mediaQuery.desktop}
                    fieldsHorizontal={mediaQuery.corHorizontal}
                    formListSpacing="10px"
                >
                    {corOptions}
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>
            <ReactHookFormItemCard>
                <ReactHookMultiFormList label="O ALUNO POSSUI ALGUMA DEFICIÊNCIA?*" isHorizontal={mediaQuery.desktop} fieldsHorizontal={mediaQuery.mobile}>
                    <ReactHookInputCheckbox label="De Caminhar" name="def_caminhar" />
                    <ReactHookInputCheckbox label="De Ouvir" name="def_ouvir" />
                    <ReactHookInputCheckbox label="De Enxergar" name="def_enxergar" />
                    <ReactHookInputCheckbox label="Mental ou Intelectual" name="def_mental" />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>
            <ButtonsContainer position={!!alunoData ? "evenly" : "right"}>
                {!!alunoData && (
                    <Button variant="default" type="button" className="btn-fill" onClick={previousStep}>
                        Voltar
                    </Button>
                )}
                <Button variant="info" type="button" className="btn-fill" onClick={nextStep}>
                    Próximo
                </Button>
            </ButtonsContainer>
        </Container>
    );
};

export default DadosPessoais;
