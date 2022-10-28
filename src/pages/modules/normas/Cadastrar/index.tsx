import React from "react";
import { useParams } from "react-router-dom";

import { ReactHookNavCardProvider, ReactHookNavCardTab } from "contexts/ReactHookNavCard";
import { useAuth } from "contexts/Auth";
import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";
import { NormasService } from "services/Norma";
import { Norma } from "entities/Norma";

import PageTitle from "components/micro/PageTitle";
import DadosDaNorma from "./DadosDaNorma";

import CadastrarIcon from "assets/icons/normas/normas-cadastrar.png";
import ListarIcon from "assets/icons/normas/normas-listar.png";

type FormData = {
    titulo: string;
    data_norma: string;
    tipo_norma: string;
    assunto: string;
    aplicabilidade: string;
};

const formData = {
    titulo: "",
    data_norma: "",
    tipo_norma: "",
    assunto: "",
    aplicabilidade: "",
};

const Cadastrar: React.FC = () => {
    const { id: normaId } = useParams<{ id: string }>();
    const { user } = useAuth();
    const { errorHandler } = useError();
    const { createModal, clearModal } = useAlertModal();

    const handleFormSubmit = async (data: FormData) => {
        try {
            createModal();
            const normasService = new NormasService();
            const codigo_cidade = user?.codigo_cidade || 0;

            const body = {
                titulo: data.titulo,
                data_norma: data.data_norma,
                tipo_norma: data.tipo_norma,
                assunto: data.assunto,
                aplicabilidade: data.aplicabilidade,
            };
            if (!!normaId) {
                const response = await normasService.updateNorma(body, normaId, codigo_cidade);
                if (!response.result) {
                    throw { ...response };
                }
                createModal("success", { title: "Sucesso", html: "Norma editada com sucesso" });
            } else {
                const response = await normasService.createNorma(body, codigo_cidade);
                if (!response.result) {
                    throw { ...response };
                }
                createModal("success", { title: "Sucesso", html: "Norma cadastrada com sucesso" });
            }
        } catch (err) {
            errorHandler(err, { title: "Erro ao cadastrar norma" });
        }
    };
    return (
        <>
            <PageTitle message="Cadastro de Norma" icon={CadastrarIcon} />
            <ReactHookNavCardProvider<FormData>
                mode="onSubmit"
                defaultValues={formData as unknown as FormData}
                reValidateMode="onChange"
                onSubmit={handleFormSubmit}
            >
                <ReactHookNavCardTab name="DADOS DA NORMA" icon={<img src={ListarIcon} alt="" aria-hidden="true" />}>
                    <DadosDaNorma />
                </ReactHookNavCardTab>
            </ReactHookNavCardProvider>
        </>
    );
};

export default Cadastrar;
