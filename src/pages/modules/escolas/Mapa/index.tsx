import React from "react";

import { useAuth } from "contexts/Auth";
import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";

import { EscolaListObj } from "entities/Escola";
import { EscolasService } from "services/Escolas";

import PageTitle from "components/micro/PageTitle";

import EscolaIcon from "assets/icons/escolas/escolas-cadastro.png";
import MapaIcon from "assets/icons/garagem/mapa-garagem.png";
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
            <PageTitle message="Visualizar Escolas Cadastradas" icon={EscolaIcon} />
            <NavCardProvider aditionalData={{ escolasData: [escolasData, setEscolasData] }}>
                <NavCardTab name="Mapa da Escola (E Alunos Atendidos)" icon={<img src={MapaIcon} alt="Icone Mapa" />}>
                    <Localizacao />
                </NavCardTab>
            </NavCardProvider>
        </>
    );
};

export default Mapa;
