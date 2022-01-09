import React from "react";
import { Button } from "react-bootstrap";

import { useAuth } from "contexts/Auth";
import { EscolasService } from "services/Escolas";
import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import { EscolaListRota } from "entities/Escola";
import { escolasListHelper } from "helpers/DualMultiSelect/EscolasListRotaHelper";

import BlockTitle from "components/micro/BlockTitle";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";
import ReactHookDualMultiSelect from "components/micro/Inputs/ReactHookDualMultiSelect";

import { Container } from "./styles";

const titles = ["Lista de Escolas", "Escolas atendidos pela rota"];

const EscolasAtendidas: React.FC = () => {
    const { previousStep, nextStep } = useReactHookNavCard();
    const { user } = useAuth();

    const [escolasList, setEscolasList] = React.useState<EscolaListRota[]>([]);

    const fetchData = async () => {
        const escolasService = new EscolasService();
        const codigo_cidade = user?.codigo_cidade || 0;

        const data = await escolasService.listEscolas(codigo_cidade);
        const treatedData = escolasListHelper.treatData(data.data);
        setEscolasList(treatedData);
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <Container>
            <BlockTitle message="ESCOLAS ATENDIDAS" />

            <ReactHookDualMultiSelect title={titles} name="escolas" options={escolasList} />
            <ButtonsContainer>
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

export default EscolasAtendidas;
