import React from "react";

import { ReactHookNavCardProvider, ReactHookNavCardTab } from "contexts/ReactHookNavCard";

import PageTitle from "components/micro/PageTitle";

import Localizacao from "./Localizacao";
import DadosBasicos from "./DadosBasicos";
import DadosEscolares from "./DadosEscolares";

import DadosEscolaresIcon from "assets/icons/escolas/escolas-dados-escolares.png";
import DadosBasicosIcon from "assets/icons/escolas/escolas-dados-basicos.svg";
import LocalizacaoIcon from "assets/icons/escolas/escolas-localizacao.svg";
import EscolasCadastroIcon from "assets/icons/escolas/escolas-cadastro.png";

const Editar: React.FC = () => {
    return (
        <>
            <PageTitle message="Atualizar Escola" icon={EscolasCadastroIcon} />
            <ReactHookNavCardProvider onSubmit={(data) => console.log(data)}>
                <ReactHookNavCardTab name="Localização" icon={<img src={LocalizacaoIcon} alt="" />}>
                    <Localizacao />
                </ReactHookNavCardTab>
                <ReactHookNavCardTab name="Dados Básicos" icon={<img src={DadosBasicosIcon} alt="" />}>
                    <DadosBasicos />
                </ReactHookNavCardTab>
                <ReactHookNavCardTab name="Dados Escolares" icon={<img src={DadosEscolaresIcon} alt="" />}>
                    <DadosEscolares />
                </ReactHookNavCardTab>
            </ReactHookNavCardProvider>
        </>
    );
};

export default Editar;
