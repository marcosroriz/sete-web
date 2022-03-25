import React from "react";
import { useParams } from "react-router-dom";

import { NavCardProvider, NavCardTab } from "contexts/NavCard";
import { useAuth } from "contexts/Auth";
import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";
import { MotoristasService } from "services/Motoristas";
import { Motorista } from "entities/Motorista";

import PageTitle from "components/micro/PageTitle";

import PageIconOnibus from "assets/icons/frotas/frotas-onibus.png";
import PageIconLancha from "assets/icons/frotas/frotas-lancha.png";
import FrotasFichaVeiculoIcon from "assets/icons/frotas/frotas-ficha-veiculo.png";

import FichaVeiculo from "./FichaVeiculo";

const Visualizar: React.FC = () => {
    const { id: motoristaId } = useParams<{ id: string }>();
    const [motoristaData, setMotoristaData] = React.useState<Motorista | null>(null);

    const { errorHandler } = useError();
    const { clearModal, createModal } = useAlertModal();
    const { user } = useAuth();

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                createModal();
                const codigo_cidade = user?.codigo_cidade || 0;
                const motoristasService = new MotoristasService();
                const response = await motoristasService.getMotorista(motoristaId, codigo_cidade);
                setMotoristaData(response);
                clearModal();
            } catch (err) {
                errorHandler(err, { title: "Erro ao buscar dados do veículo" });
            }
        };
        fetchData();
    }, []);
    return (
        <>
            <PageTitle message="Dados do Motorista" icon={PageIconOnibus} iconRight={PageIconLancha} />
            <NavCardProvider aditionalData={{ motoristaData: [motoristaData, setMotoristaData] }}>
                <NavCardTab name="FICHA DO MOTORISTA" icon={<img src={FrotasFichaVeiculoIcon} alt="" aria-hidden="true" />}>
                    <FichaVeiculo />
                </NavCardTab>
            </NavCardProvider>
        </>
    );
};

export default Visualizar;
