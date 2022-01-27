import React from "react";
import { useParams } from "react-router-dom";

import { NavCardProvider, NavCardTab } from "contexts/NavCard";
import { useAuth } from "contexts/Auth";
import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";
import { Escola } from "entities/Escola";
import { EscolasService } from "services/Escolas";
import { escolasTableHelper } from "helpers/Tables/EscolasTableHelper";

import PageTitle from "components/micro/PageTitle";

import DadosEscolaresIcon from "assets/icons/escolas/escolas-dados-escolares.png";
import DadosBasicosIcon from "assets/icons/escolas/escolas-dados-basicos.svg";
import LocalizacaoIcon from "assets/icons/escolas/escolas-localizacao.svg";
import EscolasCadastroIcon from "assets/icons/escolas/escolas-cadastro.png";

import FichaEscola from "./FichaEscola";
import AlunosAtendidos from "./AlunosAtendidos";
import Localizacao from "./Localizacao";
import alunos from "routes/modules/alunos";

const Visualizar: React.FC = () => {
    const { id: escolaId } = useParams<{ id: string }>();
    const [escolaData, setEscolaData] = React.useState<Escola | null>(null);
    const [alunosData, setAlunosData] = React.useState<any | null>(null);

    const { errorHandler } = useError();
    const { clearModal, createModal } = useAlertModal();
    const { user } = useAuth();

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                createModal();
                const codigo_cidade = user?.codigo_cidade || 0;
                const escolasService = new EscolasService();
                const escolasResponse = await escolasService.getEscola(Number(escolaId), codigo_cidade);
                const alunosVinculados = await escolasService.listBindAlunosToEscola(Number(escolaId), codigo_cidade);

                setEscolaData(escolasResponse);
                setAlunosData(alunosVinculados);

                if (!escolasResponse.result) {
                    throw { ...escolasResponse };
                }
                clearModal();
            } catch (err) {
                errorHandler(err, { title: "Erro ao buscar dados da escola" });
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <PageTitle message="Escolas Cadastradas" icon={EscolasCadastroIcon} />
            <NavCardProvider aditionalData={{ escolaData: [escolaData, setEscolaData], alunosData: [alunosData, setAlunosData] }}>
                <NavCardTab name="FICHA DA ESCOLA" icon={<img src={DadosBasicosIcon} alt="" aria-hidden="true" />}>
                    <FichaEscola />
                </NavCardTab>
                <NavCardTab name="ALUNOS ATENDIDOS" icon={<img src={DadosEscolaresIcon} alt="" aria-hidden="true" />}>
                    <AlunosAtendidos />
                </NavCardTab>
                <NavCardTab name="LOCALIZAÇÃO" icon={<img src={LocalizacaoIcon} alt="" aria-hidden="true" />}>
                    <Localizacao />
                </NavCardTab>
            </NavCardProvider>
        </>
    );
};

export default Visualizar;
