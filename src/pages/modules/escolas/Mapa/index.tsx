import React from "react";

import { useAuth } from "contexts/Auth";
import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";

import { EscolaListObj } from "entities/Escola";
import { EscolasService } from "services/Escolas";

import PageTitle from "components/micro/PageTitle";

import EscolasListar from "assets/icons/escolas/escolas-localizacao.svg";
import LocalizacaoIcon from "assets/icons/escolas/escolas-localizacao.svg";
import { NavCardProvider, NavCardTab } from "contexts/NavCard";

import Localizacao from "./Localizacao";

const Mapa: React.FC = () => {
    const { user } = useAuth();
    const { errorHandler } = useError();
    const { clearModal, createModal } = useAlertModal();

    const [escolasData, setEscolasData] = React.useState<EscolaListObj[] | null>(null);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                createModal();
                const codigo_cidade = user?.codigo_cidade || 0;
                const escolasService = new EscolasService();

                const escolasResponse = await escolasService.listEscolas(codigo_cidade);
                setEscolasData(escolasResponse.data);

                if (!escolasResponse.result) {
                    throw { ...escolasResponse };
                }
                clearModal();
            } catch (err) {
                errorHandler(err, { title: "Erro ao buscar dados das escolas" });
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <PageTitle message="Vizualizar dados das Escolas" icon={EscolasListar} />
            <NavCardProvider aditionalData={{ escolasData: [escolasData, setEscolasData] }}>
                <NavCardTab name="LOCALIZAÇÃO" icon={<img src={LocalizacaoIcon} alt="" />}>
                    <Localizacao />
                </NavCardTab>
            </NavCardProvider>
        </>
    );
};

export default Mapa;
