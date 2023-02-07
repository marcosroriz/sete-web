import React from "react";
import { useParams } from "react-router-dom";

import { ReactHookNavCardProvider, ReactHookNavCardTab } from "contexts/ReactHookNavCard";
import { useAuth } from "contexts/Auth";
import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";
import { NormasService } from "services/Norma";

import PageTitle from "components/micro/PageTitle";
import DadosDaNorma from "./DadosDaNorma";
import { dadosDaNormaSchema, defaultValues, FormData, getBody } from "forms/NormasForm";

import CadastrarIcon from "assets/icons/normas/normas-cadastrar.png";
import ListarIcon from "assets/icons/normas/normas-listar.png";

const Cadastrar: React.FC = () => {
    const { id: normaId } = useParams<{ id: string }>();
    const { user } = useAuth();
    const { errorHandler } = useError();
    const { createModal, clearModal } = useAlertModal();

    const [normaData, setNormaData] = React.useState<any>(null);

    const handleFormSubmit = async (data: FormData) => {
        try {
            console.log("data submit", data);
            createModal();
            const normasService = new NormasService();
            const codigo_cidade = user?.codigo_cidade || 0;

            const body = getBody(data);

            // if (!!normaId) {
            //     const response = await normasService.updateNorma(body, normaId, codigo_cidade);
            //     if (!response.result) {
            //         throw { ...response };
            //     }
            //     createModal("success", { title: "Sucesso", html: "Norma editada com sucesso" });
            // } else {
            //     const response = await normasService.createNorma(body, codigo_cidade);
            //     if (!response.result) {
            //         throw { ...response };
            //     }
            //     createModal("success", { title: "Sucesso", html: "Norma cadastrada com sucesso" });
            // }
            clearModal();
        } catch (err) {
            if (!!normaId) {
                errorHandler(err, { title: "Erro ao editar norma" });
            } else {
                errorHandler(err, { title: "Erro ao cadastrar norma" });
            }
        }
    };

    React.useEffect(() => {
        if (!!normaId) {
            const fetchData = async () => {
                try {
                    createModal();
                    const normasService = new NormasService();
                    const codigo_cidade = user?.codigo_cidade || 0;
                    const response = await normasService.getNorma(Number(normaId), codigo_cidade);

                    setNormaData(response);
                    if (!response.result) {
                        throw { ...response };
                    }
                    clearModal();
                } catch (err) {
                    errorHandler(err, { title: "Erro ao buscar norma relacionada" });
                }
            };
            fetchData();
        }
    }, []);

    return (
        <>
            <PageTitle message="Cadastro de Norma" icon={CadastrarIcon} />
            <ReactHookNavCardProvider<FormData>
                mode="onSubmit"
                defaultValues={defaultValues}
                reValidateMode="onChange"
                onSubmit={handleFormSubmit}
                aditionalData={{
                    normaData: [normaData, setNormaData],
                }}
            >
                <ReactHookNavCardTab name="DADOS DA NORMA" icon={<img src={ListarIcon} alt="" aria-hidden="true" />} validationSchema={dadosDaNormaSchema}>
                    <DadosDaNorma />
                </ReactHookNavCardTab>
            </ReactHookNavCardProvider>
        </>
    );
};

export default Cadastrar;
