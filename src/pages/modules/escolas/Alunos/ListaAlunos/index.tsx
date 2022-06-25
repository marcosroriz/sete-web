import React from "react";
import { Button } from "react-bootstrap";

import { useHistory, useParams } from "react-router-dom";

import { AlunosList } from "entities/Aluno";
import { alunosListHelper } from "helpers/DualMultiSelect/AlunosListRotaHelper";

import { AlunosService } from "services/Alunos";
import { EscolasService } from "services/Escolas";
import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import { useAuth } from "contexts/Auth";

import ReactHookDualMultiSelect from "components/micro/Inputs/ReactHookDualMultiSelect";

import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";
import { Container } from "./styles";

const ListaAlunos: React.FC = () => {
    const history = useHistory();
    const { id: escolaId } = useParams<{ id: string }>();

    const { user } = useAuth();
    const [alunosList, setAlunosList] = React.useState<AlunosList[]>([]);
    const [selected, setSelected] = React.useState<AlunosList[]>([]);

    const handleVoltarClick = () => {
        history.goBack();
    };

    React.useEffect(() => {
        (async () => {
            const codigo_cidade = user!.codigo_cidade!;
            const alunosService = new AlunosService();
            const escolasService = new EscolasService();
            const alunos = await alunosService.listAlunos(codigo_cidade);
            const treatedData = alunosListHelper.treatData(alunos.data);
            setAlunosList(treatedData);
            const data = await escolasService.listBindAlunosToEscola(Number(escolaId), codigo_cidade);

            //setSelected(data);
        })();
    }, []);

    return (
        <Container>
            <ReactHookDualMultiSelect
                name="alunos"
                options={alunosList}
                //selectedOptions={selected}
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
