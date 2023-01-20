import React from "react";
import { Button } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

import { formatHelper } from "helpers/FormatHelper";

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

const sexoOptions = formatHelper
    .getNumbersEnumValues(SexoEnum)
    .map((value) => <ReactHookInputRadio key={value} name="sexo" label={SexoLabel.get(value as SexoEnum) || ""} value={value.toString()} position="right" />);

const corOptions = formatHelper
    .getNumbersEnumValues(CorEnum)
    .map((value) => <ReactHookInputRadio key={value} name="cor" label={CorLabel.get(value as CorEnum) || ""} value={value.toString()} position="right" />);

const grauOptions = formatHelper.getNumbersEnumValues(GrauParentescoEnum).map((value) => ({
    label: GrauParentescoLabel.get(value as GrauParentescoEnum) || "",
    value: value.toString(),
}));

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
    }, [alunoData]);

    return (
        <Container>
            <BlockTitle message="FORNEÇA AS INFORMAÇÕES BÁSICAS A RESPEITO DO ALUNO SENDO CADASTRADO." />
            <ReactHookFormItemCard required>
                <ReactHookInputText label="NOME DO ALUNO*" name="nome" placeholder="Informe o nome do aluno:" isHorizontal={mediaQuery.desktop} />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard>
                <ReactHookInputNumberFormat
                    label="CPF DO ALUNO"
                    name="cpf"
                    format="###.###.###-##"
                    placeholder="Informe o CPF do aluno:"
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard required>
                <ReactHookInputNumberFormat
                    label="DATA DE NASCIMENTO*"
                    name="data_nascimento"
                    format="##/##/####"
                    placeholder="Informe a data de nascimento do aluno:"
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard>
                <ReactHookInputText
                    label="NOME DO RESPONSÁVEL"
                    name="nome_responsavel"
                    placeholder="Informe o nome do responsável:"
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>
            <ReactHookFormItemCard>
                <ReactHookInputNumberFormat
                    label="TELEFONE DO RESPONSÁVEL"
                    name="telefone_responsavel"
                    format={["(##) ####-#####", "(##) #####-####"]}
                    placeholder="Informe o telefone do responsável"
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
                    label="SEXO DO ALUNO:*"
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
                    label="COR DO ALUNO:*"
                    name="cor"
                    isHorizontal={mediaQuery.desktop}
                    fieldsHorizontal={mediaQuery.corHorizontal}
                    formListSpacing="20px"
                >
                    {corOptions}
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>
            <ReactHookFormItemCard placeItems="left">
                <ReactHookMultiFormList
                    label="O ALUNO POSSUI ALGUMA DEFICIÊNCIA? SE SIM, MARQUE AS OPÇÕES:"
                    isHorizontal={mediaQuery.desktop}
                    fieldsHorizontal={mediaQuery.mobile}
                    formListSpacing="20px"
                >
                    <ReactHookInputCheckbox label="De Caminhar" name="def_caminhar" />
                    <ReactHookInputCheckbox label="De Ouvir" name="def_ouvir" />
                    <ReactHookInputCheckbox label="De Enxergar" name="def_enxergar" />
                    <ReactHookInputCheckbox label="Mental ou Intelectual" name="def_mental" />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>
            <ButtonsContainer position="evenly">
                <Button variant="default" type="button" className="btn-fill" onClick={previousStep}>
                    Voltar
                </Button>
                <Button variant="info" type="button" className="btn-fill" onClick={nextStep}>
                    Próximo
                </Button>
            </ButtonsContainer>
        </Container>
    );
};

export default DadosPessoais;
