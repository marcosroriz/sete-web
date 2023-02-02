import React from "react";
import { useParams } from "react-router-dom";

import { RotasService } from "services/Rotas";

import { ReactHookNavCardProvider, ReactHookNavCardTab } from "contexts/ReactHookNavCard";
import { useAuth } from "contexts/Auth";
import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";

import PageTitle from "components/micro/PageTitle";

import AlunosAtendidos from "./AlunosAtendidos";
import DadosBasicos from "./DadosBasicos";
import EscolasAtendidas from "./EscolasAtendidas";

import EscolasAtendidasIcon from "assets/icons/rotas/rotas-escolas-atendidas.svg";
import DadosBasicosIcon from "assets/icons/rotas/rotas-dados-basicos.png";
import AlunosAtendidosIcon from "assets/icons/rotas/rotas-alunos-atendidos.png";
import RotasCadastroIcon from "assets/icons/rotas/rotas-cadastro.png";

import { formData, FormData } from "forms/Rotas";
import { Rotas } from "entities/Rotas";

const Cadastrar: React.FC = () => {
    const { id: rotaId } = useParams<{ id: string }>();
    const { user } = useAuth();
    const { errorHandler } = useError();
    const { createModal, clearModal } = useAlertModal();

    const [rotaData, setRotaData] = React.useState<Rotas | null>(null);

    const handleFormSubmit = async (data: FormData) => {
        try {
            createModal();
            const rotasService = new RotasService();
            const codigo_cidade = user?.codigo_cidade || 0;

            const body = {
                nome: data.nome,
                tipo_rotas: Number(data.tipo_rotas),
                turno_matutino: data.turno[0] ? "S" : "N",
                turno_vespertino: data.turno[1] ? "S" : "N",
                turno_noturno: data.turno[2] ? "S" : "N",
                da_porteira: data.obstaculos[0] ? "S" : "N",
                da_mataburro: data.obstaculos[1] ? "S" : "N",
                da_colchete: data.obstaculos[2] ? "S" : "N",
                da_atoleiro: data.obstaculos[3] ? "S" : "N",
                da_ponterustica: data.obstaculos[4] ? "S" : "N",
                quilometragem: data.quilometragem,
                tempo_estimado: data.tempo_estimado,
                hora_ida_inicio: data.hora_ida_inicio,
                hora_ida_termino: data.hora_ida_termino,
                hora_volta_inicio: data.hora_volta_inicio,
                hora_volta_termino: data.hora_volta_termino,
            };

            if (!!rotaId) {
                const response = await rotasService.updateRota(body, rotaId, codigo_cidade);

                if (!response.result) {
                    throw { ...response };
                }
                createModal("success", { title: "Sucesso", html: "Rota editada com sucesso" });
            } else {
                const response = await rotasService.createRota(body, codigo_cidade);

                if (!response.result) {
                    throw { ...response };
                }
                createModal("success", { title: "Sucesso", html: "Rota cadastrada com sucesso" });
            }
        } catch (err) {
            errorHandler(err, { title: "Erro ao cadastrar rota" });
        }
    };

    React.useEffect(() => {
        if (!!rotaId) {
            const fetchData = async () => {
                try {
                    createModal();
                    const codigo_cidade = user?.codigo_cidade || 0;
                    const rotasService = new RotasService();
                    const response = await rotasService.getRota(rotaId, codigo_cidade);

                    setRotaData(response);
                    if (!response.result) {
                        throw { ...response };
                    }
                    clearModal();
                } catch (err) {
                    errorHandler(err, { title: "Erro ao buscar dados da rota" });
                }
            };
            fetchData();
        }
    }, []);
    return (
        <>
            <PageTitle message="Cadastro de Rota" icon={RotasCadastroIcon} />
            <ReactHookNavCardProvider<FormData>
                mode="onSubmit"
                defaultValues={formData as unknown as FormData}
                reValidateMode="onChange"
                onSubmit={handleFormSubmit}
                aditionalData={{
                    rotaData: [rotaData, setRotaData],
                }}
            >
                <ReactHookNavCardTab name="Dados Básicos" icon={<img src={DadosBasicosIcon} alt="" />}>
                    <DadosBasicos />
                </ReactHookNavCardTab>
                <ReactHookNavCardTab name="Escolas Atendidas" icon={<img src={EscolasAtendidasIcon} alt="" />}>
                    <EscolasAtendidas />
                </ReactHookNavCardTab>
                <ReactHookNavCardTab name="Alunos Atendidos" icon={<img src={AlunosAtendidosIcon} alt="" />}>
                    <AlunosAtendidos />
                </ReactHookNavCardTab>
            </ReactHookNavCardProvider>
        </>
    );
};

export default Cadastrar;
