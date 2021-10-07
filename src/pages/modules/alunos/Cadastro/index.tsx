import React from "react";

import { ReactHookNavCardProvider, ReactHookNavCardTab } from "contexts/ReactHookNavCard";

import PageTitle from "components/micro/PageTitle";

import Localizacao from "./Localizacao";
import DadosPessoais from "./DadosPessoais";
import DadosEscolares from "./DadosEscolares";

import DadosEscolaresIcon from "assets/icons/alunos/alunos-dados-escolares.svg";
import DadosPessoaisIcon from "assets/icons/alunos/alunos-dados-pessoais.svg";
import LocalizacaoIcon from "assets/icons/alunos/alunos-localizacao.svg";
import AlunosCadastroIcon from "assets/icons/alunos/alunos-cadastro.svg";

const Cadastro: React.FC = () => {
    return (
        <>
            <PageTitle message="Cadastrar Aluno" icon={AlunosCadastroIcon} />
            <ReactHookNavCardProvider onSubmit={(data) => console.log(data)}>
                <ReactHookNavCardTab name="Localização" icon={<img src={LocalizacaoIcon} alt="" />}>
                    <Localizacao />
                </ReactHookNavCardTab>
                <ReactHookNavCardTab name="Dados Pessoais" icon={<img src={DadosPessoaisIcon} alt="" />}>
                    <DadosPessoais />
                </ReactHookNavCardTab>
                <ReactHookNavCardTab name="Dados Escolares" icon={<img src={DadosEscolaresIcon} alt="" />}>
                    <DadosEscolares />
                </ReactHookNavCardTab>
            </ReactHookNavCardProvider>
        </>
    );
};

export default Cadastro;
