import React from "react";
import { useParams } from "react-router-dom";

import { ReactHookNavCardProvider, ReactHookNavCardTab } from "contexts/ReactHookNavCard";
import { useAuth } from "contexts/Auth";
import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";
import { MotoristasService } from "services/Motoristas";
import { Motorista } from "entities/Motorista";

import PageTitle from "components/micro/PageTitle";
import DadosPessoais from "./DadosPessoais";
import DadosTransporte from "./DadosTransporte";

import PageIcon from "assets/icons/motoristas/motorista-cadastro.png";
import DadosPessoaisIcon from "assets/icons/motoristas/motorista-dados-pessoais.svg";
import DadosTransportesIcon from "assets/icons/motoristas/motorista-dados-transportes.png";
import { dadosPessoaisSchema, dadosTransportesSchema, defaultValues, FormData, getBody } from "forms/MotoristasForm";

const Cadastrar: React.FC = () => {
    const { id: motoristaId } = useParams<{ id: string }>();
    const { user } = useAuth();
    const { errorHandler } = useError();
    const { createModal, clearModal } = useAlertModal();

    const [motoristaData, setMotoristaData] = React.useState<Motorista | null>(null);

    const handleFormSubmit = async (data: FormData) => {
        try {
            createModal();
            const motoristasService = new MotoristasService();
            const codigo_cidade = user?.codigo_cidade || 0;

            const body = getBody(data);

            if (!!motoristaId) {
                const motoristasResponse = await motoristasService.updateMotorista(body, motoristaId, codigo_cidade);
                if (!motoristasResponse.result) {
                    throw { ...motoristasResponse };
                }
                createModal("success", { title: "Sucesso", html: "Motorista editado com sucesso" });
            } else {
                const motoristasResponse = await motoristasService.createMotorista(body, codigo_cidade);
                if (!motoristasResponse.result) {
                    throw { ...motoristasResponse };
                }
                createModal("success", { title: "Sucesso", html: "Motorista cadastrado com sucesso" });
            }
        } catch (err) {
            errorHandler(err, { title: "Ocorreu um erro! Tente novamente" });
        }
    };

    React.useEffect(() => {
        if (!!motoristaId) {
            const fetchData = async () => {
                try {
                    createModal();
                    const codigo_cidade = user?.codigo_cidade || 0;
                    const motoristasService = new MotoristasService();
                    const response = await motoristasService.getMotorista(motoristaId, codigo_cidade);

                    setMotoristaData(response);

                    if (!response.result) {
                        throw { ...response };
                    }
                    clearModal();
                } catch (err) {
                    errorHandler(err, { title: "Erro ao buscar dados do motorista" });
                }
            };
            fetchData();
        }
    }, []);

    return (
        <>
            <PageTitle message="Cadastro de Motorista" icon={PageIcon} />
            <ReactHookNavCardProvider<FormData>
                mode="onSubmit"
                defaultValues={defaultValues}
                reValidateMode="onChange"
                onSubmit={handleFormSubmit}
                aditionalData={{
                    motoristaData: [motoristaData, setMotoristaData],
                }}
            >
                <ReactHookNavCardTab
                    name="DADOS PESSOAIS"
                    icon={<img src={DadosPessoaisIcon} alt="" aria-hidden="true" />}
                    validationSchema={dadosPessoaisSchema}
                >
                    <DadosPessoais />
                </ReactHookNavCardTab>

                <ReactHookNavCardTab
                    name="DADOS DE TRANSPORTES"
                    icon={<img src={DadosTransportesIcon} alt="" aria-hidden="true" />}
                    validationSchema={dadosTransportesSchema}
                >
                    <DadosTransporte />
                </ReactHookNavCardTab>
            </ReactHookNavCardProvider>
        </>
    );
};

export default Cadastrar;
