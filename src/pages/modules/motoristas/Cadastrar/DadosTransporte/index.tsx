import React from "react";
import { Button } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";
import { Motorista } from "entities/Motorista";
import { useAuth } from "contexts/Auth";

import { RotasService } from "services/Rotas";

import ReactHookMultiFormList from "components/micro/Inputs/ReactHookMultiFormList";
import ReactHookInputNumberFormat from "components/micro/Inputs/ReactHookInputNumberFormat";
import ReactHookInputCheckbox from "components/micro/Inputs/ReactHookInputCheckbox";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";
import ReactHookInputMultiSelect from "components/micro/Inputs/ReactHookInputMultiSelect";
import BlockTitle from "components/micro/BlockTitle";

import { Container, mediaQuery } from "./styles";

type SelectOptions = {
    value: string;
    label: string;
};

type MotoristaData = [Motorista | null, React.Dispatch<React.SetStateAction<Motorista | null>>];

const DadosTransporte: React.FC = () => {
    const { user } = useAuth();
    const { setValue } = useFormContext();
    const { previousStep, aditionalData } = useReactHookNavCard();

    const [motoristaData] = aditionalData?.motoristaData as MotoristaData;

    React.useEffect(() => {
        if (!!motoristaData) {
            setValue("salario", motoristaData?.salario || "");
            setValue("cnh", motoristaData?.cnh || "");
            setValue("data_validade_cnh", motoristaData?.data_validade_cnh || "");
            setValue("turno[0]", motoristaData?.turno_manha === "S" ? true : false);
            setValue("turno[1]", motoristaData?.turno_tarde === "S" ? true : false);
            setValue("turno[2]", motoristaData?.turno_noite === "S" ? true : false);
            setValue("tipo_cnh[0]", motoristaData?.tem_cnh_a === "S" ? true : false);
            setValue("tipo_cnh[1]", motoristaData?.tem_cnh_b === "S" ? true : false);
            setValue("tipo_cnh[2]", motoristaData?.tem_cnh_c === "S" ? true : false);
            setValue("tipo_cnh[3]", motoristaData?.tem_cnh_d === "S" ? true : false);
            setValue("tipo_cnh[4]", motoristaData?.tem_cnh_e === "S" ? true : false);
        }
    }, [motoristaData]);

    const [rotaOptions, setRotaOptions] = React.useState<SelectOptions[]>([]);

    const fetchData = async () => {
        try {
            const codigo_cidade = user?.codigo_cidade || 0;
            const rotasService = new RotasService();
            const rotasResponse = await rotasService.listRotas(codigo_cidade);
            setRotaOptions(rotasResponse.data.map((rota) => ({ value: rota.id_rota.toString(), label: rota.nome })));
        } catch (err) {
            console.log(err);
        }
    };

    React.useEffect(() => {
        fetchData();
    }, []);
    return (
        <Container>
            <BlockTitle message="A RESPEITO DOS DADOS DE TRANSPORTE DO MOTORISTA, INFORME:" />
            <ReactHookFormItemCard>
                <ReactHookInputMultiSelect
                    label="O MOTORISTA ATUA EM QUAIS ROTAS?"
                    name="rotas"
                    options={rotaOptions}
                    placeholder="Escolha pelo menos uma rota"
                    isHorizontal={mediaQuery.desktop}
                    thinBorder={false}
                    menuPlacement="bottom"
                />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard name="cnh" required>
                <ReactHookInputNumberFormat
                    label="CARTEIRA NACIONAL DE HABILITAÇÃO (CNH)*"
                    name="cnh"
                    placeholder="Informe o número de registro da CNH do motorista"
                    format="#########-##"
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard>
                <ReactHookInputNumberFormat
                    label="DATA DE VENCIMENTO DA CNH"
                    name="data_validade_cnh"
                    placeholder="Informe a data de vencimento da CNH"
                    format="##/##/####"
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard required>
                <ReactHookMultiFormList
                    label="O MOTORISTA ESTÁ HABILITADO A DIRIGIR QUAIS CATEGORIAS DE VEÍCULOS?*"
                    name="tipo_cnh"
                    formListSpacing="40px"
                    isHorizontal={mediaQuery.desktop}
                    fieldsHorizontal={mediaQuery.mobile}
                >
                    <ReactHookInputCheckbox label="A" name="tipo_cnh[0]" />
                    <ReactHookInputCheckbox label="B" name="tipo_cnh[1]" />
                    <ReactHookInputCheckbox label="C" name="tipo_cnh[2]" />
                    <ReactHookInputCheckbox label="D" name="tipo_cnh[3]" />
                    <ReactHookInputCheckbox label="E" name="tipo_cnh[4]" />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>

            <ReactHookFormItemCard required>
                <ReactHookMultiFormList
                    label="QUAL O TURNO DE TRABALHO DO MOTORISTA?*"
                    name="turno"
                    formListSpacing="40px"
                    isHorizontal={mediaQuery.desktop}
                    fieldsHorizontal={mediaQuery.mobile}
                >
                    <ReactHookInputCheckbox label="Manhã" name="turno[0]" />
                    <ReactHookInputCheckbox label="Tarde" name="turno[1]" />
                    <ReactHookInputCheckbox label="Noite" name="turno[2]" />
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

export default DadosTransporte;
