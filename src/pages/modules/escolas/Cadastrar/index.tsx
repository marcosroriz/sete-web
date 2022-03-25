import React from "react";
import { useParams } from "react-router-dom";

import { ReactHookNavCardProvider, ReactHookNavCardTab } from "contexts/ReactHookNavCard";

import { EscolasService } from "services/Escolas";
import { Escola } from "entities/Escola";

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
import { localizacaoSchema, dadosBasicosSchema, dadosEscolaresSchema } from "validators/modules/escolas";

type FormData = {
    latlng: [string, string];
    mec_co_uf: string;
    mec_co_municipio: string;
    loc_endereco: string;
    loc_cep: string;
    mec_tp_localizacao: string;
    mec_tp_localizacao_diferenciada: string;
    mec_tp_dependencia: string;
    nome: string;
    contato_responsavel: string;
    contato_telefone: string;
    contato_email: string;
    mec_in: boolean[];
    ensino: boolean[];
    horario: boolean[];
};

const formData = {
    latlng: ["", ""],
    mec_co_uf: "",
    mec_co_municipio: "",
    loc_endereco: "",
    loc_cep: "",
    mec_tp_localizacao: "",
    mec_tp_localizacao_diferenciada: "",
    mec_tp_dependencia: "",
    nome: "",
    contato_responsavel: "",
    contato_telefone: "",
    contato_email: "",
    mec_in: [false, false, false, false],
    ensino: [false, false, false, false],
    horario: [false, false, false],
};

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
            const body = {
                loc_latitude: data.latlng[0],
                loc_longitude: data.latlng[1],
                mec_co_uf: Number(data.mec_co_uf),
                mec_co_municipio: Number(data.mec_co_municipio),
                mec_no_entidade: data.nome,
                loc_endereco: data.loc_endereco,
                loc_cep: data.loc_cep,
                mec_tp_localizacao: Number(data.mec_tp_localizacao),
                mec_tp_localizacao_diferenciada: Number(data.mec_tp_localizacao_diferenciada),
                mec_tp_dependencia: Number(data.mec_tp_dependencia),
                nome: data.nome,
                contato_responsavel: data.contato_responsavel,
                contato_telefone: data.contato_telefone,
                contato_email: data.contato_email,
                mec_in_regular: data.mec_in[0] ? "S" : "N",
                mec_in_eja: data.mec_in[1] ? "S" : "N",
                mec_in_profissionalizante: data.mec_in[2] ? "S" : "N",
                mec_in_especial_exclusiva: data.mec_in[3] ? "S" : "N",
                ensino_pre_escola: data.ensino[0] ? "S" : "N",
                ensino_fundamental: data.ensino[1] ? "S" : "N",
                ensino_medio: data.ensino[2] ? "S" : "N",
                ensino_superior: data.ensino[3] ? "S" : "N",
                horario_matutino: data.horario[0] ? "S" : "N",
                horario_vespertino: data.horario[1] ? "S" : "N",
                horario_noturno: data.horario[2] ? "S" : "N",
            };

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
                defaultValues={formData as FormData}
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
