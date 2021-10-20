import React from "react";
import { useParams } from "react-router-dom";

import { NavCardProvider, NavCardTab } from "contexts/NavCard";
import { useAuth } from "contexts/Auth";
import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";
import { VeiculosService } from "services/Veiculos";
import { Veiculo } from "entities/Veiculo";

import PageTitle from "components/micro/PageTitle";

import PageIconOnibus from "assets/icons/frotas/frotas-onibus.png";
import PageIconLancha from "assets/icons/frotas/frotas-lancha.png";
import FrotasFichaVeiculoIcon from "assets/icons/frotas/frotas-ficha-veiculo.png";

import FichaVeiculo from "./FichaVeiculo";

const Visualizar: React.FC = () => {
    const { id: veiculoId } = useParams<{ id: string }>();
    const [veiculoData, setVeiculoData] = React.useState<Veiculo | null>(null);

    const { errorHandler } = useError();
    const { clearModal, createModal } = useAlertModal();
    const { user } = useAuth();

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
            <PageTitle message="Dados do Veículo" icon={PageIconOnibus} iconRight={PageIconLancha} />
            <NavCardProvider aditionalData={{ veiculoData: [veiculoData, setVeiculoData] }}>
                <NavCardTab name="FICHA DO VEÍCULO" icon={<img src={FrotasFichaVeiculoIcon} alt="" aria-hidden="true" />}>
                    <FichaVeiculo />
                </NavCardTab>
            </NavCardProvider>
        </>
    );
};

export default Visualizar;
