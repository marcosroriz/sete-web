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
import { dadosInstitucionaisSchema } from "validators/modules/fornecedores";

type FormData = {
    latlng: [string, string];
    endereco: string;
    cep: string;
    nome: string;
    telefone: string;
    cpf_cnpj: string;
    so_mecaninca: boolean; // S/N pra api
    so_combustivel_oleo: boolean; // S/N pra api
    so_seguros: boolean; // S/N pra api
};

const formData = {
    latlng: ["", ""],
    endereco: "",
    cep: "",
    nome: "",
    telefone: "",
    cpf_cnpj: "",
    so_mecaninca: false,
    so_combustivel_oleo: false,
    so_seguros: false,
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
                cnpj: data.cpf_cnpj,
                nome: data.nome,
                ramo_mecanica: data.so_mecaninca ? "S" : "N",
                ramo_combustivel: data.so_combustivel_oleo ? "S" : "N",
                ramo_seguro: data.so_seguros ? "S" : "N",
                loc_latitude: data.latlng[0],
                loc_longitude: data.latlng[1],
                loc_endereco: data.endereco,
                loc_cep: data.cep,
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
