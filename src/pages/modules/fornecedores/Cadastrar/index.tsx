import React from "react";

import { FornecedoresService } from "services/Fornecedores";

import { ReactHookNavCardProvider, ReactHookNavCardTab } from "contexts/ReactHookNavCard";
import { useAuth } from "contexts/Auth";
import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";

import PageTitle from "components/micro/PageTitle";

import Localizacao from "./Localizacao";
import DadosInstitucionais from "./DadosInstitucionais";

import DadosInstitucionaisIcon from "assets/icons/fornecedores/fornecedores-dados-institucionais.svg";
import LocalizacaoIcon from "assets/icons/fornecedores/fornecedores-localizacao.svg";
import FornecedoresCadastroIcon from "assets/icons/fornecedores/fornecedores-cadastro.png";

type FormData = {
    latlng: [string, string];
    loc_endereco: string;
    loc_cep: string;
    nome: string;
    telefone: string;
    cnpj: string;
    ramo_mecanica: boolean; // S/N pra api
    ramo_combustivel: boolean; // S/N pra api
    ramo_seguro: boolean; // S/N pra api
};

const formData = {
    latlng: ["", ""],
    loc_endereco: "",
    loc_cep: "",
    nome: "",
    telefone: "",
    cnpj: "",
    ramo_mecanica: false,
    ramo_combustivel: false,
    ramo_seguro: false,
};
const Cadastrar: React.FC = () => {
    const { user } = useAuth();
    const { errorHandler } = useError();
    const { createModal } = useAlertModal();

    const handleFormSubmit = async (data: FormData) => {
        try {
            createModal();
            const fornecedoresService = new FornecedoresService();
            const codigo_cidade = user?.codigo_cidade || 0;
            const body = {
                cnpj: data.cnpj,
                nome: data.nome,
                ramo_mecanica: data.ramo_mecanica ? "S" : "N",
                ramo_combustivel: data.ramo_combustivel ? "S" : "N",
                ramo_seguro: data.ramo_seguro ? "S" : "N",
                loc_latitude: data.latlng[0],
                loc_longitude: data.latlng[1],
                loc_endereco: data.loc_endereco,
                loc_cep: data.loc_cep,
                telefone: data.telefone,
            };

            const response = await fornecedoresService.createFornecedor(body, codigo_cidade);
            if (!response.result) {
                throw { ...response };
            }
            createModal("success", { title: "Sucesso", html: "Fornecedor cadastrado com sucesso" });
        } catch (err) {
            errorHandler(err, { title: "Erro ao cadastrar fornecedor" });
        }
    };

    return (
        <>
            <PageTitle message="Cadastrar Fornecedor" icon={FornecedoresCadastroIcon} />
            <ReactHookNavCardProvider<FormData> mode="onSubmit" defaultValues={formData} reValidateMode="onChange" onSubmit={handleFormSubmit}>
                <ReactHookNavCardTab name="Localização" icon={<img src={LocalizacaoIcon} alt="" />}>
                    <Localizacao />
                </ReactHookNavCardTab>
                <ReactHookNavCardTab name="Dados Institucionais" icon={<img src={DadosInstitucionaisIcon} alt="" />}>
                    <DadosInstitucionais />
                </ReactHookNavCardTab>
            </ReactHookNavCardProvider>
        </>
    );
};

export default Cadastrar;
