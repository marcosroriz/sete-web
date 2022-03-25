import React from "react";

import { ReactHookNavCardProvider, ReactHookNavCardTab } from "contexts/ReactHookNavCard";
import { useAuth } from "contexts/Auth";
import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";

import PageTitle from "components/micro/PageTitle";

import ImportarAlunosIcon from "assets/icons/alunos/alunos-importar-alunos.png";
import PlanilhaIcon from "assets/icons/alunos/alunos-planilha.png";
import BaseDadosIcon from "assets/icons/alunos/alunos-base-dados.png";
import ImportacaoIcon from "assets/icons/alunos/alunos-importacao.png";

import Planilha from "./Planilha";
import BaseDados from "./BaseDados";
import Importacao from "./Importacao";

const Importar: React.FC = () => {
    return (
        <>
            <PageTitle message="Importar Alunos" icon={ImportarAlunosIcon} />
            <ReactHookNavCardProvider onSubmit={(data) => console.log(data)}>
                <ReactHookNavCardTab name="Planilha" icon={<img src={PlanilhaIcon} alt="" />}>
                    <Planilha />
                </ReactHookNavCardTab>
                <ReactHookNavCardTab name="Base de Dados" icon={<img src={BaseDadosIcon} alt="" />}>
                    <BaseDados />
                </ReactHookNavCardTab>
                <ReactHookNavCardTab name="Importação" icon={<img src={ImportacaoIcon} alt="" />}>
                    <Importacao />
                </ReactHookNavCardTab>
            </ReactHookNavCardProvider>
        </>
    );
};

export default Importar;
