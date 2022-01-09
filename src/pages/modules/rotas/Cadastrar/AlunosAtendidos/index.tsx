import React from "react";
import { Button } from "react-bootstrap";

import { useAuth } from "contexts/Auth";
import { AlunosService } from "services/Alunos";
import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import { AlunosListRota } from "entities/Aluno";
import { alunosListHelper } from "helpers/DualMultiSelect/AlunosListRotaHelper";

import BlockTitle from "components/micro/BlockTitle";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";
import ReactHookDualMultiSelect from "components/micro/Inputs/ReactHookDualMultiSelect";

import { Container } from "./styles";

const titles = ["Lista de Alunos", "Alunos atendidos pela rota"];

const AlunosAtendidos: React.FC = () => {
    const { previousStep } = useReactHookNavCard();
    const { user } = useAuth();

    const [alunosList, setAlunosList] = React.useState<AlunosListRota[]>([]);

    const fetchData = async () => {
        const alunosService = new AlunosService();
        const codigo_cidade = user?.codigo_cidade || 0;

        const data = await alunosService.listAlunos(codigo_cidade);
        const treatedData = alunosListHelper.treatData(data.data);
        setAlunosList(treatedData);
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <Container>
            <BlockTitle message="ALUNOS ATENDIDOS" />
            <ReactHookDualMultiSelect title={titles} name="alunos" options={alunosList} />
            <ButtonsContainer>
                <Button variant="default" type="button" className="btn-fill" onClick={previousStep}>
                    Voltar
                </Button>
                <Button variant="info" type="submit" className="btn-fill">
                    Próximo
                </Button>
            </ButtonsContainer>
        </Container>
    );
};

export default AlunosAtendidos;
