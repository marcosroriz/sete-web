import React from "react";

import { ReactHookNavCardProvider, ReactHookNavCardTab } from "contexts/ReactHookNavCard";
import { useAuth } from "contexts/Auth";
import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";
import { VeiculosService } from "services/Veiculos";
import { dadosBasicosSchema, detalhesVeiculoSchema } from "validators/modules/frotas";

import PageTitle from "components/micro/PageTitle";
import DadosBasicos from "./DadosBasicos";
import DetalhesVeiculo from "./DetalhesVeiculo";

import PageIconOnibus from "assets/icons/frotas/frotas-onibus.png";
import PageIconLancha from "assets/icons/frotas/frotas-lancha.png";
import DadosBasicosIcon from "assets/icons/frotas/frotas-dados-basicos.png";
import DetalhesVeiculoIcon from "assets/icons/frotas/frotas-detalhes-veicuo.png";

type FormData = {
    modo: string;
    tipo: string;
    marca: string;
    modelo: string;
    ano_programa: string;
    ano: number;
    origem: string;
    placa: string;
    renavam: string;
    km_atual: string;
    km_inicial: string;
    capacidade: number;
    manutencao: string;
};

const formData = {
    modo: "",
    tipo: "",
    marca: "",
    modelo: "",
    ano: "",
    origem: "",
    placa: "",
    renavam: "",
    km_atual: "",
    km_inicial: "",
    capacidade: "",
    manutencao: "",
};

const Cadastrar: React.FC = () => {
    const { user } = useAuth();
    const { errorHandler } = useError();
    const { createModal } = useAlertModal();

    const handleFormSubmit = async (data: FormData) => {
        try {
            createModal();
            const veiculosService = new VeiculosService();
            const codigo_cidade = user?.codigo_cidade || 0;
            const body = {
                modo: Number(data.modo),
                tipo: Number(data.tipo),
                marca: Number(data.marca),
                modelo: data.modelo,
                ano: Number(data.ano),
                origem: Number(data.origem),
                placa: data.placa.replace("-", ""),
                renavam: data.renavam,
                km_inicial: Number(data.km_inicial),
                km_atual: Number(data.km_atual),
                capacidade: data.capacidade,
                manutencao: data.manutencao === "true",
            };
            const response = await veiculosService.createVeiculo(body, codigo_cidade);
            if (!response.result) {
                throw { ...response };
            }
            createModal("success", { title: "Sucesso", html: "Veículo cadastrado com sucesso" });
        } catch (err) {
            errorHandler(err, { title: "Erro ao cadastrar veículo" });
        }
    };

    return (
        <>
            <PageTitle message="Cadastro de Veículo" icon={PageIconOnibus} iconRight={PageIconLancha} />
            <ReactHookNavCardProvider<FormData> mode="onSubmit" defaultValues={formData} reValidateMode="onChange" onSubmit={handleFormSubmit}>
                <ReactHookNavCardTab name="DADOS BÁSICOS" icon={<img src={DadosBasicosIcon} alt="" aria-hidden="true" />} validationSchema={dadosBasicosSchema}>
                    <DadosBasicos />
                </ReactHookNavCardTab>

                <ReactHookNavCardTab
                    name="DADOS DO VEÍCULO"
                    icon={<img src={DetalhesVeiculoIcon} alt="" aria-hidden="true" />}
                    validationSchema={detalhesVeiculoSchema}
                >
                    <DetalhesVeiculo />
                </ReactHookNavCardTab>
            </ReactHookNavCardProvider>
        </>
    );
};

export default Cadastrar;
