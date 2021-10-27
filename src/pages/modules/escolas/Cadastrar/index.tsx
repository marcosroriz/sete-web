import React from "react";

import { ReactHookNavCardProvider, ReactHookNavCardTab } from "contexts/ReactHookNavCard";

import { EscolasService } from "services/Escolas";

import { useAlertModal } from "hooks/AlertModal";
import { useError } from "hooks/Errors";
import { useAuth } from "contexts/Auth";

import PageTitle from "components/micro/PageTitle";

import Localizacao from "./Localizacao";
import DadosBasicos from "./DadosBasicos";
import DadosEscolares from "./DadosEscolares";

import DadosEscolaresIcon from "assets/icons/escolas/escolas-dados-escolares.png";
import DadosBasicosIcon from "assets/icons/escolas/escolas-dados-basicos.svg";
import LocalizacaoIcon from "assets/icons/escolas/escolas-localizacao.svg";
import EscolasCadastroIcon from "assets/icons/escolas/escolas-cadastro.png";

type FormData = {
    latlng: [number, number];
    mec_co_uf: string;
    mec_co_municipio: string;
    loc_endereco: string;
    loc_cep: string;
    mec_tp_localizacao: string;
    mec_tp_localizacao_diferenciada: string;

    nome: string;
    contato_responsavel: string;
    contato_telefone: string;
    contato_email: string;
    escola_tipo: string;

    mec_in_regular: boolean;
    mec_in_eja: boolean;
    mec_in_profissionalizante: boolean;
    ensino_pre_escola: boolean;
    ensino_fundamental: boolean;
    ensino_medio: boolean;
    ensino_superior: boolean;
    horario_matutino: boolean;
    horario_vespertino: boolean;
    horario_noturno: boolean;
};

const Cadastrar: React.FC = () => {
    const { user } = useAuth();
    const { createModal } = useAlertModal();
    const { errorHandler } = useError();
    const handleSubmit = async (data: FormData) => {
        try {
            createModal();
            const escolasService = new EscolasService();
            const codigo_cidade = user?.codigo_cidade || 0;
            const body = {
                loc_latitude: data.latlng[0].toString(),
                loc_longitude: data.latlng[1].toString(),
                mec_co_uf: Number(data.mec_co_uf),
                mec_co_municipio: Number(data.mec_co_municipio),
                loc_endereco: data.loc_endereco,
                loc_cep: data.loc_cep,
                mec_tp_localizacao: Number(data.mec_tp_localizacao),
                mec_tp_localizacao_diferenciada: Number(data.mec_tp_localizacao_diferenciada),
                nome: data.nome,
                contato_responsavel: data.contato_responsavel,
                contato_telefone: data.contato_telefone,
                contato_email: data.contato_email,
                mec_in_regular: data.contato_email ? "S" : "N",
                mec_in_eja: data.contato_email ? "S" : "N",
                mec_in_profissionalizante: data.contato_email ? "S" : "N",
                ensino_pre_escola: data.contato_email ? "S" : "N",
                ensino_fundamental: data.contato_email ? "S" : "N",
                ensino_medio: data.contato_email ? "S" : "N",
                ensino_superior: data.contato_email ? "S" : "N",
                horario_matutino: data.contato_email ? "S" : "N",
                horario_vespertino: data.contato_email ? "S" : "N",
                horario_noturno: data.contato_email ? "S" : "N",
            };
            const response = await escolasService.createEscolas(body, codigo_cidade);
            if (!response.result) {
                throw { ...response };
            }
            createModal("success", { title: "Sucesso", html: "Escola cadastrada com sucesso" });
        } catch (err) {
            errorHandler(err, { title: "Erro ao cadastrar Escola" });
        }
    };
    return (
        <>
            <PageTitle message="Cadastrar Escola" icon={EscolasCadastroIcon} />
            <ReactHookNavCardProvider<FormData> onSubmit={handleSubmit}>
                <ReactHookNavCardTab name="Localização" icon={<img src={LocalizacaoIcon} alt="" />}>
                    <Localizacao />
                </ReactHookNavCardTab>
                <ReactHookNavCardTab name="Dados Básicos" icon={<img src={DadosBasicosIcon} alt="" />}>
                    <DadosBasicos />
                </ReactHookNavCardTab>
                <ReactHookNavCardTab name="Dados Escolares" icon={<img src={DadosEscolaresIcon} alt="" />}>
                    <DadosEscolares />
                </ReactHookNavCardTab>
            </ReactHookNavCardProvider>
        </>
    );
};

export default Cadastrar;
