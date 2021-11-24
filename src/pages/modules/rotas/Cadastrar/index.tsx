import React from "react";

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

type FormData = {
    nome: string;
};

const formData = {
    name: "",
};

const Cadastrar: React.FC = () => {
    const { user } = useAuth();
    const { errorHandler } = useError();
    const { createModal } = useAlertModal();

    const handleFormSubmit = async (data: FormData) => {
        try {
            createModal();
            const rotasService = new RotasService();
            const codigo_cidade = user?.codigo_cidade || 0;
            const body = {
                nome: data.nome,
            };
            console.log(data);

            // const response = await rotasService.createRota(body, codigo_cidade);
            // if (!response.result) {
            //     throw { ...response };
            // }
            createModal("success", { title: "Sucesso", html: "Rota cadastrada com sucesso" });
        } catch (err) {
            errorHandler(err, { title: "Erro ao cadastrar rota" });
        }
    };
    return (
        <>
            <PageTitle message="Cadastrar Escola" icon={RotasCadastroIcon} />
            <ReactHookNavCardProvider onSubmit={(data) => console.log(data)}>
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
