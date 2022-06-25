import React from "react";
import { useParams } from "react-router-dom";

import { ReactHookNavCardProvider, ReactHookNavCardTab } from "contexts/ReactHookNavCard";
import { useAuth } from "contexts/Auth";
import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";
import { AlunosService } from "services/Alunos";
import { Aluno } from "entities/Aluno";

import PageTitle from "components/micro/PageTitle";

import Localizacao from "./Localizacao";
import DadosPessoais from "./DadosPessoais";
import DadosEscolares from "./DadosEscolares";

import { FormData, localizacaoSchema, dadosPessoaisSchema, dadosEscolaresSchema, defaultValues, getBody } from "forms/AlunosForm";

import DadosEscolaresIcon from "assets/icons/alunos/alunos-dados-escolares.svg";
import DadosPessoaisIcon from "assets/icons/alunos/alunos-dados-pessoais.svg";
import LocalizacaoIcon from "assets/icons/alunos/alunos-localizacao.svg";
import AlunosCadastroIcon from "assets/icons/alunos/alunos-cadastro.svg";

const Cadastrar: React.FC = () => {
    const { id: alunoId } = useParams<{ id: string }>();
    const { user } = useAuth();
    const { errorHandler } = useError();
    const { createModal, clearModal } = useAlertModal();

    const [alunoData, setAlunoData] = React.useState<Aluno | null>(null);
    const [escolaData, setEscolaData] = React.useState<any>(null);
    const [rotaData, setRotaData] = React.useState<any>(null);

    const handleSubmit = async (data: FormData) => {
        try {
            createModal();
            const alunosService = new AlunosService();
            const codigo_cidade = user?.codigo_cidade || 0;
            const body = getBody(data);

            if (!!alunoId) {
                const response = await alunosService.updateAluno(body, Number(alunoId), codigo_cidade);
                if (!response.result) {
                    throw { ...response };
                }
                createModal("success", { title: "Sucesso", html: "Aluno editado com sucesso" });
            } else {
                const response = await alunosService.createAluno(body, codigo_cidade);

                if (data.escola != "") {
                    await alunosService.bindEscolaToAluno({ id_escola: Number(data.escola) }, (response.messages as any)?.id, codigo_cidade);
                }
                if (data.rota != "") {
                    await alunosService.bindRotaToAluno({ id_rota: Number(data.rota) }, (response.messages as any)?.id, codigo_cidade);
                }

                if (!response.result) {
                    throw { ...response };
                }
                createModal("success", { title: "Sucesso", html: "Aluno cadastrado com sucesso" });
            }
        } catch (err) {
            errorHandler(err, { title: "Erro ao cadastrar aluno" });
        }
    };

    React.useEffect(() => {
        if (!!alunoId) {
            const fetchData = async () => {
                try {
                    createModal();
                    const codigo_cidade = user?.codigo_cidade || 0;
                    const alunosService = new AlunosService();
                    const response = await alunosService.getAluno(Number(alunoId), codigo_cidade);
                    const escolaVinculada = await alunosService.listBindEscolaToAluno(Number(alunoId), codigo_cidade);
                    const rotaVinculada = await alunosService.listBindRotaToAluno(Number(alunoId), codigo_cidade);

                    setAlunoData(response);
                    setEscolaData(escolaVinculada);
                    setRotaData(rotaVinculada);

                    if (!response.result) {
                        throw { ...response };
                    }
                    clearModal();
                } catch (err) {
                    errorHandler(err, { title: "Erro ao buscar dados do aluno" });
                }
            };
            fetchData();
        }
    }, []);

    return (
        <>
            <PageTitle message="Cadastrar Aluno" icon={AlunosCadastroIcon} />
            <ReactHookNavCardProvider<FormData>
                mode="onSubmit"
                defaultValues={defaultValues}
                reValidateMode="onChange"
                onSubmit={handleSubmit}
                aditionalData={{
                    alunoData: [alunoData, setAlunoData],
                    escolaData: [escolaData, setEscolaData],
                    rotaData: [rotaData, setRotaData],
                }}
            >
                <ReactHookNavCardTab name="Localização" icon={<img src={LocalizacaoIcon} alt="" />} validationSchema={localizacaoSchema}>
                    <Localizacao />
                </ReactHookNavCardTab>
                <ReactHookNavCardTab name="Dados Pessoais" icon={<img src={DadosPessoaisIcon} alt="" />} validationSchema={dadosPessoaisSchema}>
                    <DadosPessoais />
                </ReactHookNavCardTab>
                <ReactHookNavCardTab name="Dados Escolares" icon={<img src={DadosEscolaresIcon} alt="" />} validationSchema={dadosEscolaresSchema}>
                    <DadosEscolares />
                </ReactHookNavCardTab>
            </ReactHookNavCardProvider>
        </>
    );
};

export default Cadastrar;
