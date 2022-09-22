import React from "react";
import { useParams } from "react-router-dom";

import { ReactHookNavCardProvider, ReactHookNavCardTab } from "contexts/ReactHookNavCard";
import { useAuth } from "contexts/Auth";
import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";
import { VeiculosService } from "services/Veiculos";
import { Veiculo } from "entities/Veiculo";
import { dadosBasicosSchema, detalhesVeiculoSchema, defaultValues, FormData, getBody } from "forms/FrotasForm";

import PageTitle from "components/micro/PageTitle";
import DadosBasicos from "./DadosBasicos";
import DetalhesVeiculo from "./DetalhesVeiculo";

import PageIconOnibus from "assets/icons/frotas/frotas-onibus.png";
import PageIconLancha from "assets/icons/frotas/frotas-lancha.png";
import DadosBasicosIcon from "assets/icons/frotas/frotas-dados-basicos.png";
import DetalhesVeiculoIcon from "assets/icons/frotas/frotas-detalhes-veicuo.png";

const Cadastrar: React.FC = () => {
    const { id: veiculoId } = useParams<{ id: string }>();
    const [veiculoData, setVeiculoData] = React.useState<Veiculo | null>(null);

    const { user } = useAuth();
    const { errorHandler } = useError();
    const { clearModal, createModal } = useAlertModal();

    const handleFormSubmit = async (data: FormData) => {
        try {
            createModal();
            const veiculosService = new VeiculosService();
            const codigo_cidade = user?.codigo_cidade || 0;
            const body = getBody(data);

            if (!!veiculoId) {
                const response = await veiculosService.updateVeiculo(body, Number(veiculoId), codigo_cidade);
                if (!response.result) {
                    throw { ...response };
                }
                createModal("success", { title: "Sucesso", html: "Veículo editado com sucesso" });
            } else {
                const response = await veiculosService.createVeiculo(body, codigo_cidade);
                if (!response.result) {
                    throw { ...response };
                }
                createModal("success", { title: "Sucesso", html: "Veículo cadastrado com sucesso" });
            }
        } catch (err) {
            errorHandler(err, { title: "Ocorreu alguma erro! Tente novamente" });
        }
    };

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                createModal();
                const codigo_cidade = user?.codigo_cidade || 0;
                const veiculosService = new VeiculosService();
                if (!!veiculoId) {
                    const veiculosResponse = await veiculosService.getVeiculo(Number(veiculoId), codigo_cidade);
                    setVeiculoData(veiculosResponse);
                    if (!veiculosResponse.result) {
                        throw { ...veiculosResponse };
                    }
                }
                clearModal();
            } catch (err) {
                errorHandler(err, { title: "Erro ao buscar dados do veículo" });
            }
        };
        fetchData();
    }, [veiculoId]);

    return (
        <>
            <PageTitle message="Cadastro de Veículo" icon={PageIconOnibus} iconRight={PageIconLancha} />
            <ReactHookNavCardProvider<FormData>
                mode="onSubmit"
                defaultValues={defaultValues}
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

export default Cadastrar;
