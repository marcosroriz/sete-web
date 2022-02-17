import React from "react";
import { useParams } from "react-router-dom";

import { NavCardProvider, NavCardTab } from "contexts/NavCard";
import { useAuth } from "contexts/Auth";
import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";
import { MonitoresService } from "services/Monitores";

import PageTitle from "components/micro/PageTitle";

import PageIconOnibus from "assets/icons/frotas/frotas-onibus.png";
import PageIconLancha from "assets/icons/frotas/frotas-lancha.png";
import FrotasFichaVeiculoIcon from "assets/icons/frotas/frotas-ficha-veiculo.png";

import { Monitor } from "entities/Monitor";
import FichaMonitor from "./FichaVeiculo";

const Visualizar: React.FC = () => {
    const { id: monitorId } = useParams<{ id: string }>();
    const [monitorData, setMonitorData] = React.useState<Monitor | null>(null);

    const { errorHandler } = useError();
    const { clearModal, createModal } = useAlertModal();
    const { user } = useAuth();

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                createModal();
                const codigo_cidade = user?.codigo_cidade || 0;
                const motoristasService = new MonitoresService();
                const response = await motoristasService.getMonitor(monitorId, codigo_cidade);
                console.log("AQUIIIII monito", response);
                setMonitorData(response);
                clearModal();
            } catch (err) {
                errorHandler(err, { title: "Erro ao buscar dados do monitor" });
            }
        };
        fetchData();
    }, []);
    return (
        <>
            <PageTitle message="Dados do Motorista" icon={PageIconOnibus} iconRight={PageIconLancha} />
            <NavCardProvider aditionalData={{ monitorData: [monitorData, setMonitorData] }}>
                <NavCardTab name="FICHA DO MONITOR" icon={<img src={FrotasFichaVeiculoIcon} alt="" aria-hidden="true" />}>
                    <FichaMonitor />
                </NavCardTab>
            </NavCardProvider>
        </>
    );
};

export default Visualizar;
