import React from "react";
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";

import { AlunosList } from "entities/Aluno";
import { alunosListHelper } from "helpers/DualMultiSelect/AlunosListRotaHelper";

import { AlunosService } from "services/Alunos";
import { EscolasService } from "services/Escolas";

import { useAuth } from "contexts/Auth";

import ReactHookDualMultiSelect from "components/micro/Inputs/ReactHookDualMultiSelect";

import { Container } from "./styles";

const ListaAlunos: React.FC = () => {
    const { id: escolaId } = useParams<{ id: string }>();
    const { user } = useAuth();
    const { setValue } = useFormContext();
    const [alunosList, setAlunosList] = React.useState<AlunosList[]>([]);

    React.useEffect(() => {
        (async () => {
            const codigo_cidade = user!.codigo_cidade!;
            const alunosService = new AlunosService();
            const escolasService = new EscolasService();
            const alunos = await alunosService.listAlunos(codigo_cidade);
            const treatedData = alunosListHelper.treatData(alunos.data);
            setAlunosList(treatedData);
            const data = await escolasService.listBindAlunosToEscola(Number(escolaId), codigo_cidade);
        })();
    }, []);

    return (
        <Container>
            <ReactHookDualMultiSelect
                name="alunos"
                options={alunosList}
                texts={{ selected: { title: "Alunos Restantes" }, notSelected: { title: "Alunos Atendidos pela Escola" } }}
            />
        </Container>
    );
};

export default ListaAlunos;
