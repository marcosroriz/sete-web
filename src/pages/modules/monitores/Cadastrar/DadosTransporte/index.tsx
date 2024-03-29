import React from "react";
import { Button } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";
import { Monitor } from "entities/Monitor";
import { useAuth } from "contexts/Auth";

import { RotasService } from "services/Rotas";

import ReactHookMultiFormList from "components/micro/Inputs/ReactHookMultiFormList";
import ReactHookInputCheckbox from "components/micro/Inputs/ReactHookInputCheckbox";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";
import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookInputMultiSelect from "components/micro/Inputs/ReactHookInputMultiSelect";

import { Container, mediaQuery } from "./styles";

type SelectOptions = {
    value: string;
    label: string;
};

type MonitorData = [Monitor | null, React.Dispatch<React.SetStateAction<Monitor | null>>];

const DadosTransporte: React.FC = () => {
    const { user } = useAuth();
    const { setValue } = useFormContext();
    const { previousStep, nextStep, aditionalData } = useReactHookNavCard();

    const [monitorData] = aditionalData?.monitorData as MonitorData;

    React.useEffect(() => {
        if (!!monitorData) {
            setValue("rotas", monitorData?.rotas || "");
            setValue("salario", monitorData?.salario || "");
            setValue("turno[0]", monitorData?.turno_manha === "S" ? true : false);
            setValue("turno[1]", monitorData?.turno_tarde === "S" ? true : false);
            setValue("turno[2]", monitorData?.turno_noite === "S" ? true : false);
        }
    }, [monitorData]);

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
            <ReactHookFormItemCard>
                <ReactHookInputMultiSelect
                    label="QUAL A ROTA DO ALUNO?"
                    name="rotas"
                    options={rotaOptions}
                    placeholder="Escolha uma rota"
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard>
                <ReactHookInputText label="SALÁRIO*" name="salario" type="number" prefix="R$" isHorizontal={mediaQuery.desktop} />
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
