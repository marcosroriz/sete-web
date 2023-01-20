import React from "react";
import { Button } from "react-bootstrap";

import { useAuth } from "contexts/Auth";
import { AlunosService } from "services/Alunos";
import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import { AlunosList } from "entities/Aluno";
import { alunosListHelper } from "helpers/DualMultiSelect/AlunosListRotaHelper";

import BlockTitle from "components/micro/BlockTitle";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";
import ReactHookDualMultiSelect from "components/micro/Inputs/ReactHookDualMultiSelect";

import { Container } from "./styles";

const Configuracao: React.FC = () => {
    const { previousStep } = useReactHookNavCard();

    return (
        <Container>
            <ButtonsContainer>
                <Button variant="info" type="submit" className="btn-fill">
                    Próximo
                </Button>
            </ButtonsContainer>
        </Container>
    );
};

export default Configuracao;
