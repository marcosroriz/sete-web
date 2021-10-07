import React from "react";

import { ReactHookNavCardProvider, ReactHookNavCardTab } from "contexts/ReactHookNavCard";

import PageTitle from "components/micro/PageTitle";

import Localizacao from "./Localizacao";
import DadosInstitucionais from "./DadosInstitucionais";

import DadosInstitucionaisIcon from "assets/icons/fornecedores/fornecedores-dados-institucionais.svg";
import LocalizacaoIcon from "assets/icons/fornecedores/fornecedores-localizacao.svg";
import FornecedoresCadastroIcon from "assets/icons/fornecedores/fornecedores-cadastro.png";

const Cadastro: React.FC = () => {
    return (
        <>
            <PageTitle message="Cadastrar Fornecedor" icon={FornecedoresCadastroIcon} />
            <ReactHookNavCardProvider onSubmit={(data) => console.log(data)}>
                <ReactHookNavCardTab name="Localização" icon={<img src={LocalizacaoIcon} alt="" />}>
                    <Localizacao />
                </ReactHookNavCardTab>
                <ReactHookNavCardTab name="Dados Institucionais" icon={<img src={DadosInstitucionaisIcon} alt="" />}>
                    <DadosInstitucionais />
                </ReactHookNavCardTab>
            </ReactHookNavCardProvider>
        </>
    );
};

export default Cadastro;
