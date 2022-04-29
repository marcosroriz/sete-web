import React from "react";
import { ReactHookNavCardProvider, ReactHookNavCardTab } from "contexts/ReactHookNavCard";

import PageTitle from "components/micro/PageTitle";

import EscolasCadastro from "assets/icons/escolas/escolas-cadastro.png";
import DadosEscolaresIcon from "assets/icons/escolas/escolas-dados-escolares.png";

import ListaAlunos from "./ListaAlunos";

const Alunos: React.FC = () => {
    return (
        <>
            <PageTitle message="Gerir Alunos Atendidos pela Escola" icon={EscolasCadastro} />
            <ReactHookNavCardProvider onSubmit={(data) => console.log("data", data)}>
                <ReactHookNavCardTab name="LISTA DE ALUNOS" icon={<img src={DadosEscolaresIcon} alt="" aria-hidden="true" />}>
                    <ListaAlunos />
                </ReactHookNavCardTab>
            </ReactHookNavCardProvider>
        </>
    );
};

export default Alunos;
