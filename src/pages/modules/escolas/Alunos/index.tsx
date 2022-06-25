import React from "react";
import { useParams } from "react-router-dom";

import { EscolasService } from "services/Escolas";
import { ReactHookNavCardProvider, ReactHookNavCardTab } from "contexts/ReactHookNavCard";
import { useAuth } from "contexts/Auth";
import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";

import PageTitle from "components/micro/PageTitle";

import EscolasCadastro from "assets/icons/escolas/escolas-cadastro.png";
import DadosEscolaresIcon from "assets/icons/escolas/escolas-dados-escolares.png";

import ListaAlunos from "./ListaAlunos";

type FormData = {
    alunos: number[];
};

const formData = {
    alunos: [],
};

const Alunos: React.FC = () => {
    const { id: escolaId } = useParams<{ id: string }>();
    const { user } = useAuth();
    const { errorHandler } = useError();
    const { createModal } = useAlertModal();

    const handleFormSubmit = async (data: FormData) => {
        try {
            createModal();
            const escolasService = new EscolasService();
            const codigo_cidade = user?.codigo_cidade || 0;
            const body = {
                alunos: data.alunos,
            };

            // const response = await escolasService.(body, codigo_cidade);
            //  if (!response.result) {
            //     throw { ...response };
            // }

            createModal("success", { title: "Sucesso", html: "Alunos atendidos editados com sucesso" });
        } catch (err) {
            errorHandler(err, { title: "Erro ao editar alunos atendidos pela escola" });
        }
    };
    return (
        <>
            <PageTitle message="Gerir Alunos Atendidos pela Escola" icon={EscolasCadastro} />
            <ReactHookNavCardProvider<FormData> mode="onSubmit" defaultValues={formData as FormData} reValidateMode="onChange" onSubmit={handleFormSubmit}>
                <ReactHookNavCardTab name="LISTA DE ALUNOS" icon={<img src={DadosEscolaresIcon} alt="" aria-hidden="true" />}>
                    <ListaAlunos />
                </ReactHookNavCardTab>
            </ReactHookNavCardProvider>
        </>
    );
};

export default Alunos;
