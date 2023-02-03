import React from "react";
import { useParams } from "react-router-dom";

import { RotasService } from "services/Rotas";

import { ReactHookNavCardProvider, ReactHookNavCardTab } from "contexts/ReactHookNavCard";
import { useAuth } from "contexts/Auth";
import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";

import PageTitle from "components/micro/PageTitle";

import AlunosAtendidos from "./AlunosAtendidos";
import DadosBasicos from "./DadosBasicos";
import EscolasAtendidas from "./EscolasAtendidas";

import EscolasAtendidasIcon from "assets/icons/rotas/rotas-escolas-atendidas.svg";
import DadosBasicosIcon from "assets/icons/rotas/rotas-dados-basicos.png";
import AlunosAtendidosIcon from "assets/icons/rotas/rotas-alunos-atendidos.png";
import RotasCadastroIcon from "assets/icons/rotas/rotas-cadastro.png";

import { defaultValues, FormData, getBody } from "forms/Rotas";
import { Rotas } from "entities/Rotas";

const Cadastrar: React.FC = () => {
    const { id: rotaId } = useParams<{ id: string }>();
    const { user } = useAuth();
    const { errorHandler } = useError();
    const { createModal, clearModal } = useAlertModal();

    const [rotaData, setRotaData] = React.useState<Rotas | null>(null);

    const handleFormSubmit = async (data: FormData) => {
        try {
            createModal();
            const rotasService = new RotasService();
            const codigo_cidade = user?.codigo_cidade || 0;

            const body = getBody(data);

            if (!!rotaId) {
                const response = await rotasService.updateRota(body, rotaId, codigo_cidade);

                if (!response.result) {
                    throw { ...response };
                }
                createModal("success", { title: "Sucesso", html: "Rota editada com sucesso" });
            } else {
                const response = await rotasService.createRota(body, codigo_cidade);

                if (!response.result) {
                    throw { ...response };
                }
                createModal("success", { title: "Sucesso", html: "Rota cadastrada com sucesso" });
            }
        } catch (err) {
            errorHandler(err, { title: "Erro ao cadastrar rota" });
        }
    };

    React.useEffect(() => {
        if (!!rotaId) {
            const fetchData = async () => {
                try {
                    createModal();
                    const codigo_cidade = user?.codigo_cidade || 0;
                    const rotasService = new RotasService();
                    const response = await rotasService.getRota(rotaId, codigo_cidade);

                    setRotaData(response);
                    if (!response.result) {
                        throw { ...response };
                    }
                    clearModal();
                } catch (err) {
                    errorHandler(err, { title: "Erro ao buscar dados da rota" });
                }
            };
            fetchData();
        }
    }, []);
    return (
        <>
            <PageTitle message="Cadastro de Rota" icon={RotasCadastroIcon} />
            <ReactHookNavCardProvider<FormData>
                mode="onSubmit"
                defaultValues={defaultValues}
                reValidateMode="onChange"
                onSubmit={handleFormSubmit}
                aditionalData={{
                    rotaData: [rotaData, setRotaData],
                }}
            >
                <ReactHookNavCardTab name="Dados Básicos" icon={<img src={DadosBasicosIcon} alt="" />}>
                    <DadosBasicos />
                </ReactHookNavCardTab>
                <ReactHookNavCardTab name="Escolas Atendidas" icon={<img src={EscolasAtendidasIcon} alt="" />}>
                    <EscolasAtendidas />
                </ReactHookNavCardTab>
                <ReactHookNavCardTab name="Alunos Atendidos" icon={<img src={AlunosAtendidosIcon} alt="" />}>
                    <AlunosAtendidos />
                </ReactHookNavCardTab>
            </ReactHookNavCardProvider>
        </>
    );
};

export default Cadastrar;
