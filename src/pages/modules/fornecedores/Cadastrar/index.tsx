import React from "react";
import { useParams } from "react-router-dom";

import { FornecedoresService } from "services/Fornecedores";
import { Fornecedor } from "entities/Fornecedor";

import { ReactHookNavCardProvider, ReactHookNavCardTab } from "contexts/ReactHookNavCard";
import { useAuth } from "contexts/Auth";
import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";

import PageTitle from "components/micro/PageTitle";

import Localizacao from "./Localizacao";
import DadosInstitucionais from "./DadosInstitucionais";

import { dadosInstitucionaisSchema, FormData, defaultValues, getBody } from "forms/FornecedoresForm";

import DadosInstitucionaisIcon from "assets/icons/fornecedores/fornecedores-dados-institucionais.svg";
import LocalizacaoIcon from "assets/icons/fornecedores/fornecedores-localizacao.svg";
import FornecedoresCadastroIcon from "assets/icons/fornecedores/fornecedores-cadastro.png";

const Cadastrar: React.FC = () => {
    const { id: fornecedorId } = useParams<{ id: string }>();
    const { user } = useAuth();
    const { errorHandler } = useError();
    const { createModal, clearModal } = useAlertModal();

    const [fornecedorData, setFornecedorData] = React.useState<Fornecedor | null>(null);

    const handleFormSubmit = async (data: FormData) => {
        try {
            createModal();
            const fornecedoresService = new FornecedoresService();
            const codigo_cidade = user?.codigo_cidade || 0;
            const body = getBody(data);

            if (!!fornecedorId) {
                const response = await fornecedoresService.updateFornecedor(body, Number(fornecedorId), codigo_cidade);
                if (!response.result) {
                    throw { ...response };
                }
                createModal("success", { title: "Sucesso", html: "Fornecedor editado com sucesso" });
            } else {
                const response = await fornecedoresService.createFornecedor(body, codigo_cidade);
                if (!response.result) {
                    throw { ...response };
                }
                createModal("success", { title: "Sucesso", html: "Fornecedor cadastrado com sucesso" });
            }
        } catch (err) {
            errorHandler(err, { title: "Ocorreu alguma erro! Tente novamente." });
        }
    };

    React.useEffect(() => {
        if (!!fornecedorId) {
            const fetchData = async () => {
                try {
                    createModal();
                    const codigo_cidade = user?.codigo_cidade || 0;
                    const fornecedoresService = new FornecedoresService();
                    const response = await fornecedoresService.getFornecedor(Number(fornecedorId), codigo_cidade);

                    setFornecedorData(response);
                    if (!response.result) {
                        throw { ...response };
                    }
                    clearModal();
                } catch (err) {
                    errorHandler(err, { title: "Erro ao buscar dados do fornecedor" });
                }
            };
            fetchData();
        }
    }, []);

    return (
        <>
            <PageTitle message="Cadastrar Fornecedor" icon={FornecedoresCadastroIcon} />
            <ReactHookNavCardProvider<FormData>
                mode="onSubmit"
                defaultValues={defaultValues}
                reValidateMode="onChange"
                onSubmit={handleFormSubmit}
                aditionalData={{
                    fornecedorData: [fornecedorData, setFornecedorData],
                }}
            >
                <ReactHookNavCardTab name="Localização" icon={<img src={LocalizacaoIcon} alt="" />}>
                    <Localizacao />
                </ReactHookNavCardTab>
                <ReactHookNavCardTab
                    name="Dados Institucionais"
                    icon={<img src={DadosInstitucionaisIcon} alt="" />}
                    validationSchema={dadosInstitucionaisSchema}
                >
                    <DadosInstitucionais />
                </ReactHookNavCardTab>
            </ReactHookNavCardProvider>
        </>
    );
};

export default Cadastrar;
