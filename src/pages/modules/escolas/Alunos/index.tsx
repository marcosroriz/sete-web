import React from "react";
import { useParams } from "react-router-dom";

import { EscolasService } from "services/Escolas";
import { AlunosService } from "services/Alunos";
import { ReactHookNavCardProvider, ReactHookNavCardTab } from "contexts/ReactHookNavCard";
import { useAuth } from "contexts/Auth";
import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";

import PageTitle from "components/micro/PageTitle";

import EscolasCadastro from "assets/icons/escolas/escolas-cadastro.png";
import DadosEscolaresIcon from "assets/icons/escolas/escolas-dados-escolares.png";

import ListaAlunos from "./ListaAlunos";

import { AlunosList } from "entities/Aluno";
import { alunosListHelper } from "helpers/DualMultiSelect/AlunosListRotaHelper";

type FormData = {
    alunos: number[];
};

const formData = {
    alunos: [],
};

function difference(a: any[], b: any[]) {
    return a.filter(function (x) {
        return b.indexOf(x) < 0;
    });
}

const Alunos: React.FC = () => {
    const { id: escolaId } = useParams<{ id: string }>();
    const { user } = useAuth();
    const { errorHandler } = useError();
    const { createModal, createModalAsync } = useAlertModal();
    const [alunosCidade, setAlunosCidade] = React.useState<AlunosList[]>([]);
    const [alunosEscola, setAlunosEscola] = React.useState<AlunosList[]>([]);

    React.useEffect(() => {
        console.log("alunosEscola", alunosEscola);
    }, [alunosEscola]);

    React.useEffect(() => {
        (async () => {
            const codigo_cidade = user!.codigo_cidade!;
            const escolasService = new EscolasService();
            const alunosService = new AlunosService();
            const alunos = await alunosService.listAlunos(codigo_cidade);
            const alunosEscola = await escolasService.listBindAlunosToEscola(Number(escolaId), codigo_cidade);

            if (!!alunos.result) {
                const treatedData = alunosListHelper.treatData(alunos.data);
                setAlunosCidade(treatedData);
            }
            if (!!alunosEscola.result) {
                const treatedData = alunosListHelper.treatData(alunosEscola.data);
                setAlunosEscola(treatedData);
            }
        })();
    }, []);

    const handleFormSubmit = React.useCallback(
        async (data: FormData) => {
            try {
                createModal();

                const codigo_cidade = user!.codigo_cidade!;
                const escolasService = new EscolasService();
                const alunosEscola = await escolasService.listBindAlunosToEscola(Number(escolaId), codigo_cidade);

                const treatedData = alunosListHelper.treatData(alunosEscola.data);
                console.log("alunosEscolaSubmit", treatedData);

                console.log("data", data.alunos);

                const orignalArray = treatedData.map((aluno) => {
                    return aluno.value;
                });

                console.log("originalArruay", orignalArray);
                const insertedArray = difference(data.alunos, orignalArray);
                const deletedArray = difference(orignalArray, data.alunos);

                const bodyDelete = {
                    alunos: deletedArray.map((aluno) => {
                        return { id_aluno: Number(aluno) };
                    }),
                };

                const bodyInsert = {
                    alunos: insertedArray.map((aluno) => {
                        return { id_aluno: Number(aluno) };
                    }),
                };

                const responseInsert = await escolasService.bindAlunosToEscola(bodyInsert, Number(escolaId), codigo_cidade);
                const responseDelete = await escolasService.deleteAlunosOfEscola(bodyDelete, Number(escolaId), codigo_cidade);

                if (!responseDelete.result || !responseInsert.result) {
                    throw { ...responseInsert };
                } else {
                    createModalAsync("success", { title: "Sucesso ", html: "Alunos da Escola editados com sucesso" });
                }
            } catch (err) {
                errorHandler(err, { title: "Erro ao editar alunos atendidos pela escola" });
            }
        },
        [alunosEscola, setAlunosEscola],
    );

    return (
        <>
            <PageTitle message="Gerir Alunos Atendidos pela Escola" icon={EscolasCadastro} />
            <ReactHookNavCardProvider<FormData>
                mode="onSubmit"
                defaultValues={formData as FormData}
                reValidateMode="onChange"
                onSubmit={handleFormSubmit}
                aditionalData={{
                    alunosCidade: alunosCidade,
                    alunosEscola: alunosEscola,
                }}
            >
                <ReactHookNavCardTab name="LISTA DE ALUNOS" icon={<img src={DadosEscolaresIcon} alt="" aria-hidden="true" />}>
                    <ListaAlunos />
                </ReactHookNavCardTab>
            </ReactHookNavCardProvider>
        </>
    );
};

export default Alunos;
