import React from "react";
import { useParams } from "react-router-dom";

import { NavCardProvider, NavCardTab } from "contexts/NavCard";
import { useAuth } from "contexts/Auth";
import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";
import { RotasService } from "services/Rotas";
import { Rota } from "entities/Rota";
import { Aluno } from "entities/Aluno";
import { Escola } from "entities/Escola";

import PageTitle from "components/micro/PageTitle";

import PageIconOnibus from "assets/icons/frotas/frotas-onibus.png";
import PageIconLancha from "assets/icons/frotas/frotas-lancha.png";
import FrotasFichaVeiculoIcon from "assets/icons/frotas/frotas-ficha-veiculo.png";

import FichaRota from "./FichaRota";
import AlunosAtendidos from "./AlunosAtendidos";
import EscolasAtendidas from "./EscolasAtendidas";
import Localizacao from "./Localizacao";

const Visualizar: React.FC = () => {
    const { id: rotaId } = useParams<{ id: string }>();
    const [rotaData, setRotaData] = React.useState<Rota | null>(null);
    const [alunosData, setAlunosData] = React.useState<Aluno[] | null>(null);
    const [escolasData, setEscolasData] = React.useState<Escola[] | null>(null);

    const { errorHandler } = useError();
    const { clearModal, createModal } = useAlertModal();
    const { user } = useAuth();

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                createModal();
                const codigo_cidade = user?.codigo_cidade || 0;
                const rotasService = new RotasService();
                const rotasResponse = await rotasService.getRota(Number(rotaId), codigo_cidade);
                const alunosVinculados = await rotasService.listBindAlunosToRota(Number(rotaId), codigo_cidade);
                //const escolasVinculadas = await rotasService.listBindEscolasToRota(Number(rotaId), codigo_cidade);

                setRotaData(rotasResponse);
                setAlunosData(alunosVinculados);
                //setEscolasData(escolasVinculadas);

                clearModal();
            } catch (err) {
                errorHandler(err, { title: "Erro ao buscar dados da rota" });
            }
        };
        fetchData();
    }, []);
    return (
        <>
            <PageTitle message="Dados do Rota" icon={PageIconOnibus} iconRight={PageIconLancha} />
            <NavCardProvider
                aditionalData={{ rotaData: [rotaData, setRotaData], alunosData: [alunosData, setAlunosData], escolasData: [escolasData, setEscolasData] }}
            >
                <NavCardTab name="FICHA DA ROTA" icon={<img src={FrotasFichaVeiculoIcon} alt="" aria-hidden="true" />}>
                    <FichaRota />
                </NavCardTab>
                <NavCardTab name="ESCOLAS ATENDIDAS" icon={<img src={FrotasFichaVeiculoIcon} alt="" aria-hidden="true" />}>
                    <EscolasAtendidas />
                </NavCardTab>
                <NavCardTab name="ALUNOS ATENDIDOS" icon={<img src={FrotasFichaVeiculoIcon} alt="" aria-hidden="true" />}>
                    <AlunosAtendidos />
                </NavCardTab>
                <NavCardTab name="TRAJETO" icon={<img src={FrotasFichaVeiculoIcon} alt="" aria-hidden="true" />}>
                    <Localizacao />
                </NavCardTab>
            </NavCardProvider>
        </>
    );
};

export default Visualizar;
