import React from "react";

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
import rotas from "routes/modules/rotas";

type FormData = {
    nome: string;
    km: string;
    tipo: number;
    turno: boolean[];
    da_porteira: boolean;
    da_mataburro: boolean;
    da_colchete: boolean;
    da_atoleiro: boolean;
    da_ponterustica: boolean;
    tempo: string;
    alunos: number[];
    escolas: number[];
};

const formData = {
    nome: "",
    km: null,
    tipo: null,
    turno: [false, false, false],
    da_porteira: true,
    da_mataburro: false,
    da_colchete: false,
    da_atoleiro: false,
    da_ponterustica: false,
    tempo: null,
    alunos: [],
    escolas: [],
};

const Cadastrar: React.FC = () => {
    const { user } = useAuth();
    const { errorHandler } = useError();
    const { createModal } = useAlertModal();

    const handleFormSubmit = async (data: FormData) => {
        try {
            createModal();
            const rotasService = new RotasService();
            const codigo_cidade = user?.codigo_cidade || 0;
            const body = {
                nome: data.nome,
                km: Number(data.km),
                tipo: Number(data.tipo),
                turno_matutino: data.turno[0] === true ? "S" : "N",
                turno_vespertino: data.turno[1] === true ? "S" : "N",
                turno_noturno: data.turno[2] === true ? "S" : "N",
                da_porteira: data.da_porteira === true ? "S" : "N",
                da_mataburro: data.da_mataburro === true ? "S" : "N",
                da_colchete: data.da_colchete === true ? "S" : "N",
                da_atoleiro: data.da_atoleiro === true ? "S" : "N",
                da_ponterustica: data.da_ponterustica === true ? "S" : "N",
                shape: "shape",
                hora_ida_inicio: "string",
                hora_ida_termino: "string",
                hora_volta_inicio: "string",
                hora_volta_termino: "string",
                tempo: Number(data.tempo),
                //alunos: data.alunos,
                //escolas: data.escolas,
            };

            const response = await rotasService.createRota(body, codigo_cidade);

            if (data.escolas.length > 0) {
                for (let i = 0; data.escolas[i] != null; i++) {
                    data.escolas[i] = Number(data.escolas[i]);
                }
                await rotasService.bindEscolasToRota({ escolas: data.escolas }, (response.messages as any)?.id, codigo_cidade);
            }
            if (data.alunos.length > 0) {
                for (let i = 0; data.alunos[i] != null; i++) {
                    data.alunos[i] = Number(data.alunos[i]);
                }
                await rotasService.bindAlunosToRota({ alunos: data.escolas }, (response.messages as any)?.id, codigo_cidade);
            }

            if (!response.result) {
                throw { ...response };
            }

            createModal("success", { title: "Sucesso", html: "Rota cadastrada com sucesso" });
        } catch (err) {
            errorHandler(err, { title: "Erro ao cadastrar rota" });
        }
    };
    return (
        <>
            <PageTitle message="Cadastrar Escola" icon={RotasCadastroIcon} />
            <ReactHookNavCardProvider<FormData>
                mode="onSubmit"
                defaultValues={formData as unknown as FormData}
                reValidateMode="onChange"
                onSubmit={handleFormSubmit}
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
