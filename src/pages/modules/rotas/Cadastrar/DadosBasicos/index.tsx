import React from "react";
import { Button } from "react-bootstrap";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";
import { formatHelper } from "helpers/FormatHelper";
import BlockTitle from "components/micro/BlockTitle";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ReactHookMultiFormList from "components/micro/Inputs/ReactHookMultiFormList";
import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookInputCheckbox from "components/micro/Inputs/ReactHookInputCheckbox";
import ReactHookInputRadio from "components/micro/Inputs/ReactHookInputRadio";
import ReactHookInputSelect from "components/micro/Inputs/ReactHookInputSelect";

import { Container, mediaQuery } from "./styles";
import { TiposVeiculosEnum, TiposVeiculosLabel, TiposRotasEnum, TiposRotasLabel, TiposMotoristasEnum, TiposMotoristasLabel, Rotas } from "entities/Rotas";
import { useFormContext } from "react-hook-form";
import { useAuth } from "contexts/Auth";
import { RotasService } from "services/Rotas";

type RotaData = [Rotas | null, React.Dispatch<React.SetStateAction<Rotas | null>>];

type SelectOptions = {
    value: string;
    label: string;
};

const veiculosOptions = formatHelper.getNumbersEnumValues(TiposVeiculosEnum).map((value) => ({
    label: TiposVeiculosLabel.get(value as TiposVeiculosEnum) || "",
    value: value.toString(),
}));

const motoristasOptions = formatHelper.getNumbersEnumValues(TiposMotoristasEnum).map((value) => ({
    label: TiposMotoristasLabel.get(value as TiposMotoristasEnum) || "",
    value: value.toString(),
}));

const tiposRotasOptions = formatHelper
    .getNumbersEnumValues(TiposRotasEnum)
    .map((value) => <ReactHookInputRadio key={value} name="tipo_rotas" label={TiposRotasLabel.get(value) || ""} value={value.toString()} position="right" />);

const DadosBasicos: React.FC = () => {
    const { user } = useAuth();
    const { setValue } = useFormContext();
    const { nextStep, aditionalData } = useReactHookNavCard();

    const [RotaData] = aditionalData?.rotaData as RotaData;

    React.useEffect(() => {
        if (!!RotaData) {
            setValue("nome", RotaData?.nome || "");
            setValue("tipo_rotas", RotaData?.tipo_rotas?.toString() || "");
            setValue("turno[0]", RotaData?.turno_matutino === "S" ? true : false);
            setValue("turno[1]", RotaData?.turno_vespertino === "S" ? true : false);
            setValue("turno[2]", RotaData?.turno_noturno === "S" ? true : false);
            setValue("obstaculos[0]", RotaData?.da_porteira === "S" ? true : false);
            setValue("obstaculos[1]", RotaData?.da_mataburro === "S" ? true : false);
            setValue("obstaculos[2]", RotaData?.da_colchete === "S" ? true : false);
            setValue("obstaculos[3]", RotaData?.da_atoleiro === "S" ? true : false);
            setValue("obstaculos[4]", RotaData?.da_ponterustica === "S" ? true : false);
            setValue("quilometragem", RotaData?.quilometragem || "");
            setValue("tempo_estimado", RotaData?.tempo_estimado || "");
            setValue("inicioIda", RotaData?.hora_ida_inicio || "");
            setValue("terminoIda", RotaData?.hora_ida_termino || "");
            setValue("inicioVolta", RotaData?.hora_volta_inicio || "");
            setValue("terminoVolta", RotaData?.hora_volta_termino || "");
        }
    }, [RotaData]);

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
            <BlockTitle message="FORNEÇA AS INFORMAÇÕES BÁSICAS A RESPEITO DA ROTA SENDO CADASTRADA" />
            <ReactHookFormItemCard required>
                <ReactHookInputText label="NOME DA ROTA*" name="nome" isHorizontal={mediaQuery.desktop} placeholder="Exemplo: Rota Gávea Tijuca" />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard required>
                <ReactHookMultiFormList
                    label="TIPO DE ROTA:*"
                    name="tipo_rotas"
                    isHorizontal={mediaQuery.desktop}
                    fieldsHorizontal={mediaQuery.mobile}
                    formListSpacing="20px"
                >
                    {tiposRotasOptions}
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>

            <ReactHookFormItemCard>
                <ReactHookInputSelect
                    label="INFORME O VEÍCULO (E PLACA) UTILIZADO PARA REALIZAR ESSA ROTA:"
                    name="tipo_veiculo"
                    options={veiculosOptions}
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard>
                <ReactHookInputSelect
                    label="INFORME OS MOTORISTAS RESPONSÁVEIS POR ESSA ROTA:"
                    name="motoristas_responsaveis"
                    options={motoristasOptions}
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard required>
                <ReactHookMultiFormList
                    label="EM RELAÇÃO AO HORÁRIO DE FUNCIONAMENTO, A ROTA FUNCIONA NO PERÍODO DA:*"
                    name="turno"
                    isHorizontal={mediaQuery.desktop}
                    fieldsHorizontal={mediaQuery.mobile}
                    formListSpacing="30px"
                >
                    <ReactHookInputCheckbox label="Manhã" name="turno[0]" />
                    <ReactHookInputCheckbox label="Tarde" name="turno[1]" />
                    <ReactHookInputCheckbox label="Noite" name="turno[2]" />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>

            <ReactHookFormItemCard>
                <ReactHookMultiFormList
                    label="A ROTA PASSA POR ALGUM LOCAL DE DIFÍCIL ACESSO? SE SIM, MARQUE AS DIFICULDADES:"
                    name="obstaculos"
                    fieldsHorizontal={mediaQuery.mobile}
                    formListSpacing="30px"
                >
                    <ReactHookInputCheckbox label="Porteira" name="obstaculos[0]" />
                    <ReactHookInputCheckbox label="Mata-Burro" name="obstaculos[1]" />
                    <ReactHookInputCheckbox label="Colchete" name="obstaculos[2]" />
                    <ReactHookInputCheckbox label="Atoleiro" name="obstaculos[3]" />
                    <ReactHookInputCheckbox label="Ponte Rústica" name="obstaculos[4]" />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>

            <ReactHookFormItemCard required>
                <ReactHookInputText
                    label="INFORME A QUILOMETRAGEM ESTIMADA PARA ESSA ROTA (IDA + VOLTA)"
                    type="number"
                    suffix="KM"
                    name="quilometragem"
                    placeholder="Kilometragem estimada"
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard required>
                <ReactHookInputText
                    label="INFORME O TEMPO ESTIMADO PARA ESSA ROTA (IDA + VOLTA):"
                    type="number"
                    suffix="MIN"
                    name="tempo_estimado"
                    placeholder="Tempo estimado"
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard placeItems="center">
                <ReactHookMultiFormList
                    label="INFORME O HORÁRIO DE INÍCIO E TÉRMINO DA VIAGEM DE IDA"
                    name="horariosIda"
                    fieldsHorizontal={mediaQuery.mobile}
                    formListSpacing="40px"
                >
                    <ReactHookInputText label="HORÁRIO DE INÍCIO*" name="inicioIda" placeholder="09:00" isHorizontal={mediaQuery.desktop} dontShowError />
                    <ReactHookInputText label="HORÁRIO DE TÉRMINO*" name="terminoIda" placeholder="12:15" isHorizontal={mediaQuery.desktop} dontShowError />
                </ReactHookMultiFormList>
            </ReactHookFormItemCard>

            <ReactHookFormItemCard placeItems="center">
                <ReactHookMultiFormList
                    label="INFORME O HORÁRIO DE INÍCIO E TÉRMINO DA VIAGEM DE VOLTA"
                    name="horariosVolta"
                    fieldsHorizontal={mediaQuery.mobile}
                    formListSpacing="40px"
                >
                    <ReactHookInputText label="HORÁRIO DE INÍCIO*" name="inicioVolta" placeholder="09:00" isHorizontal={mediaQuery.desktop} dontShowError />
                    <ReactHookInputText label="HORÁRIO DE TÉRMINO*" name="terminoVolta" placeholder="12:15" isHorizontal={mediaQuery.desktop} dontShowError />
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
