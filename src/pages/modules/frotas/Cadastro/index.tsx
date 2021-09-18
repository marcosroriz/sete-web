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

import PageIconOnibus from "assets/icons/frotas/frota-onibus.png";
import PageIconLancha from "assets/icons/frotas/frota-lancha.png";
import DadosBasicosIcon from "assets/icons/frotas/frota-dados-basicos.png";
import DetalhesVeiculoIcon from "assets/icons/frotas/frota-detalhes-veicuo.png";

type FormData = {
    modo: string;
    tipo: {
        label: string;
        value: string;
    };
    marca: {
        label: string;
        value: string;
    };
    ano_programa: {
        label: string;
        value: string;
    };
    ano: number;
    origem: string;
    placa: string;
    renavam: string;
    km_atual: number;
    km_inicial: number;
    capacidade: number;
    manutencao: string;
};

const formData = {
    modo: "",
    tipo: {
        label: "",
        value: "",
    },
    marca: {
        label: "",
        value: "",
    },
    ano_programa: {
        label: "",
        value: "",
    },
    ano: "",
    origem: "",
    placa: "",
    renavam: "",
    km_atual: "",
    km_inicial: "",
    capacidade: "",
    manutencao: "",
};

const Cadastro: React.FC = () => {
    const { user } = useAuth();
    const { errorHandler } = useError();
    const { clearModal, createModal } = useAlertModal();
    const handleFormSubmit = async (data: FormData) => {
        try {
            createModal();
            const veiculosService = new VeiculosService();
            const codigo_cidade = user?.codigo_cidade || 0;
            const body = {
                modo: Number(data.modo),
                tipo: Number(data.tipo.value),
                modelo: data.marca.label,
                ano: Number(data.ano),
                origem: Number(data.origem),
                placa: data.placa.replace("-", ""),
                km_inicial: data.km_inicial,
                km_atual: data.km_atual,
                capacidade: data.capacidade,
            };
            const veiculosResponse = await veiculosService.createVeiculo(body, codigo_cidade);
            if (!veiculosResponse.result) {
                throw { ...veiculosResponse };
            }
            createModal("success", { title: "Sucesso" });
        } catch (err) {
            errorHandler(err, { title: "Erro ao cadastrar veículo" });
        }
    };
    return (
        <>
            <PageTitle message="Cadastro de Motorista" icon={PageIconOnibus} iconRight={PageIconLancha} />
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

export default Cadastro;
