import React from "react";
import { useParams } from "react-router-dom";
import { useFormContext } from "react-hook-form";

import { ReactHookNavCardProvider, ReactHookNavCardTab, useReactHookNavCard } from "contexts/ReactHookNavCard";
import { useAuth } from "contexts/Auth";
import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";
import { VeiculosService } from "services/Veiculos";
import { Veiculo } from "entities/Veiculo";
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
    ano: number;
    numero_pneus: number;
    vida_util_pneu: number;
    potencia: number;
    preco: number;
    origem: string;
    placa: string;
    renavam: string;
    km_atual: number;
    km_inicial: number;
    capacidade: number;
    manutencao: string;
    ipva: number;
    dpvat: number;
    seguro_anual: number;
    consumo: number;
    tipo_combustivel: string;
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

const Editar: React.FC = () => {
    const { id: veiculoId } = useParams<{ id: string }>();
    const [veiculoData, setVeiculoData] = React.useState<Veiculo | null>(null);

    const { errorHandler } = useError();
    const { clearModal, createModal } = useAlertModal();
    const { user } = useAuth();

    const handleFormSubmit = async (data: FormData) => {
        try {
            createModal();
            const veiculosService = new VeiculosService();
            const codigo_cidade = user?.codigo_cidade || 0;
            const body = {
                modo: Number(data.modo),
                tipo: Number(data.tipo),
                marca: data.marca,
                modelo: Number(data.modelo),
                ano: data.ano,
                origem: Number(data.origem),
                placa: data.placa.replace("-", ""),
                renavam: data.renavam,
                km_inicial: data.km_inicial,
                km_atual: data.km_atual,
                capacidade: data.capacidade,
                manutencao: data.manutencao,
            };
            const veiculosResponse = await veiculosService.updateVeiculo(body, Number(veiculoId), codigo_cidade);
            if (!veiculosResponse.result) {
                throw { ...veiculosResponse };
            }
            createModal("success", { title: "Sucesso", html: "Veículo atualizado com sucesso" });
        } catch (err) {
            errorHandler(err, { title: "Erro ao atualizar veículo" });
        }
    };

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                createModal();
                const codigo_cidade = user?.codigo_cidade || 0;
                const veiculosService = new VeiculosService();
                const veiculosResponse = await veiculosService.getVeiculo(Number(veiculoId), codigo_cidade);
                setVeiculoData(veiculosResponse);
                if (!veiculosResponse.result) {
                    throw { ...veiculosResponse };
                }
                clearModal();
            } catch (err) {
                errorHandler(err, { title: "Erro ao buscar dados do veículo" });
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <PageTitle message="Edição de Veículo" icon={PageIconOnibus} iconRight={PageIconLancha} />
            <ReactHookNavCardProvider<FormData>
                mode="onSubmit"
                defaultValues={formData}
                reValidateMode="onChange"
                onSubmit={handleFormSubmit}
                aditionalData={{
                    veiculoData: [veiculoData, setVeiculoData],
                }}
            >
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

export default Editar;
