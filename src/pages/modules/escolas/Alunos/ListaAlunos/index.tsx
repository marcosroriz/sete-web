import React from "react";
import { Button } from "react-bootstrap";

import { useHistory, useParams } from "react-router-dom";

import { AlunosList } from "entities/Aluno";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import { useAuth } from "contexts/Auth";

import ReactHookDualMultiSelect from "components/micro/Inputs/ReactHookDualMultiSelect";

import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";
import { Container } from "./styles";

type AlunosData = [AlunosList[] | null, React.Dispatch<React.SetStateAction<AlunosList[] | null>>];
type MultiOptions = { label: string; value: string };

import { EscolasService } from "services/Escolas";
import { AlunosService } from "services/Alunos";

import { alunosListHelper } from "helpers/DualMultiSelect/AlunosListRotaHelper";

const ListaAlunos: React.FC = () => {
    const history = useHistory();
    const { id: escolaId } = useParams<{ id: string }>();
    const { user } = useAuth();

    const [alunosCidade1, setAlunosCidade] = React.useState<MultiOptions[]>([]);
    const [alunosEscola1, setAlunosEscola] = React.useState<MultiOptions[]>([]);

    const { aditionalData } = useReactHookNavCard();

    const alunosCidade = aditionalData?.alunosCidade;
    const alunosEscola = aditionalData?.alunosEscola;

    const handleVoltarClick = () => {
        history.goBack();
    };

    // React.useEffect(() => {
    //     setAlunosCidade(alunosCidade);
    //     setAlunosEscola(alunosEscola);
    // }, [alunosCidade, alunosEscola]);

    return (
        <Container>
            <ReactHookDualMultiSelect
                name="alunos"
                options={alunosCidade}
                selectedOptions={alunosEscola}
                texts={{ selected: { title: "Alunos Restantes" }, notSelected: { title: "Alunos Atendidos pela Escola" } }}
            />

            <ButtonsContainer position="evenly">
                <Button variant="danger" type="button" className="btn-fill" onClick={handleVoltarClick}>
                    Cancelar Edição
                </Button>
                <Button variant="success" type="submit" className="btn-fill">
                    Salvar
                </Button>
            </ButtonsContainer>
        </Container>
    );
};

export default ListaAlunos;
