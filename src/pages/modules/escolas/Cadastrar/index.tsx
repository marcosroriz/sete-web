import React from "react";
import { useParams } from "react-router-dom";

import { ReactHookNavCardProvider, ReactHookNavCardTab } from "contexts/ReactHookNavCard";

import { EscolasService } from "services/Escolas";
import { Escola } from "entities/Escola";
import { formatHelper } from "helpers/FormatHelper";

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
import { localizacaoSchema, dadosBasicosSchema, dadosEscolaresSchema, getBody, defaultValues, FormData } from "forms/EscolasForm";

const Cadastrar: React.FC = () => {
    const { id: escolaId } = useParams<{ id: string }>();
    const { user } = useAuth();
    const { createModal, clearModal } = useAlertModal();
    const { errorHandler } = useError();

    const [escolaData, setEscolaData] = React.useState<Escola | null>(null);

    const handleSubmit = async (data: FormData) => {
        try {
            createModal();
            const escolasService = new EscolasService();
            const codigo_cidade = user?.codigo_cidade || 0;
            const body = getBody(data);
          
            if (!!escolaId) {
                const response = await escolasService.updateEscola(body, Number(escolaId), codigo_cidade);

                if (!response.result) {
                    throw { ...response };
                }
                createModal("success", { title: "Sucesso", html: "Escola editada com sucesso" });
            } else {
                const response = await escolasService.createEscolas(body, codigo_cidade);

                if (!response.result) {
                    throw { ...response };
                }
                createModal("success", { title: "Sucesso", html: "Escola cadastrada com sucesso" });
            }
        } catch (err) {
            errorHandler(err, { title: "Erro ao cadastrar Escola" });
        }
    };

    React.useEffect(() => {
        if (!!escolaId) {
            const fetchData = async () => {
                try {
                    createModal();
                    const codigo_cidade = user?.codigo_cidade || 0;
                    const escolasService = new EscolasService();
                    const response = await escolasService.getEscola(Number(escolaId), codigo_cidade);

                    setEscolaData(response);
                    if (!response.result) {
                        throw { ...response };
                    }
                    clearModal();
                } catch (err) {
                    errorHandler(err, { title: "Erro ao buscar dados da escola" });
                }
            };
            fetchData();
        }
    }, []);

    return (
        <>
            <PageTitle message="Cadastrar Escola" icon={EscolasCadastroIcon} />
            <ReactHookNavCardProvider<FormData>
                mode="onSubmit"
                defaultValues={defaultValues}
                reValidateMode="onChange"
                onSubmit={handleSubmit}
                aditionalData={{
                    escolaData: [escolaData, setEscolaData],
                }}
            >
                <ReactHookNavCardTab name="Localização" icon={<img src={LocalizacaoIcon} alt="" />} validationSchema={localizacaoSchema}>
                    <Localizacao />
                </ReactHookNavCardTab>
                <ReactHookNavCardTab name="Dados Básicos" icon={<img src={DadosBasicosIcon} alt="" />} validationSchema={dadosBasicosSchema}>
                    <DadosBasicos />
                </ReactHookNavCardTab>
                <ReactHookNavCardTab name="Dados Escolares" icon={<img src={DadosEscolaresIcon} alt="" />} validationSchema={dadosEscolaresSchema}>
                    <DadosEscolares />
                </ReactHookNavCardTab>
            </ReactHookNavCardProvider>
        </>
    );
};

export default Cadastrar;
