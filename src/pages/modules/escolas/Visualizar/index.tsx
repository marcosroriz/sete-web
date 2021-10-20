import React from "react";
import { useParams } from "react-router-dom";

import { NavCardProvider, NavCardTab } from "contexts/NavCard";
import { useAuth } from "contexts/Auth";
import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";
import { Escola } from "entities/Escola";

import PageTitle from "components/micro/PageTitle";

import DadosEscolaresIcon from "assets/icons/escolas/escolas-dados-escolares.png";
import DadosBasicosIcon from "assets/icons/escolas/escolas-dados-basicos.svg";
import LocalizacaoIcon from "assets/icons/escolas/escolas-localizacao.svg";
import EscolasCadastroIcon from "assets/icons/escolas/escolas-cadastro.png";

import Localizacao from "./Localizacao";
import AlunosAtendidos from "./AlunosAtendidos";
import FichaEscola from "./FichaEscola";

const Visualizar: React.FC = () => {
    const { id: escolaId } = useParams<{ id: string }>();
    const [escolaData, setEscolaData] = React.useState<Escola | null>(null);

    const { errorHandler } = useError();
    const { clearModal, createModal } = useAlertModal();
    const { user } = useAuth();
    return (
        <>
            <PageTitle message="Escolas Cadastradas" icon={EscolasCadastroIcon} />
            <NavCardProvider aditionalData={{ escolaData: [escolaData, setEscolaData] }}>
                <NavCardTab name="FICHA DA ESCOLA" icon={<img src={DadosBasicosIcon} alt="" aria-hidden="true" />}>
                    <Localizacao />
                </NavCardTab>
                <NavCardTab name="ALUNOS ATENDIDOS" icon={<img src={DadosEscolaresIcon} alt="" aria-hidden="true" />}>
                    <AlunosAtendidos />
                </NavCardTab>
                <NavCardTab name="LOCALIZAÇÃO" icon={<img src={LocalizacaoIcon} alt="" aria-hidden="true" />}>
                    <FichaEscola />
                </NavCardTab>
            </NavCardProvider>
        </>
    );
};

export default Visualizar;
