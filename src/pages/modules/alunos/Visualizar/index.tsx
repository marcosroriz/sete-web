import React from "react";
import { useParams } from "react-router-dom";

import { NavCardProvider, NavCardTab } from "contexts/NavCard";
import { useAuth } from "contexts/Auth";
import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";
import { Escola } from "entities/Escola";

import PageTitle from "components/micro/PageTitle";

import AlunosListar from "assets/icons/alunos/alunos-listar.png";
import FichaAlunoIcon from "assets/icons/alunos/alunos-dados-escolares.svg";
import LocalizacaoIcon from "assets/icons/alunos/alunos-localizacao.svg";

const Visualizar: React.FC = () => {
    const { id: alunoId } = useParams<{ id: string }>();
    const [alunoData, setalunoData] = React.useState<Escola | null>(null);

    const { errorHandler } = useError();
    const { clearModal, createModal } = useAlertModal();
    const { user } = useAuth();
    return (
        <>
            <PageTitle message="alunos Cadastradas" icon={AlunosListar} />
            <NavCardProvider aditionalData={{ alunoData: [alunoData, setalunoData] }}>
                <NavCardTab name="FICHA DO ALUNO" icon={<img src={FichaAlunoIcon} alt="" aria-hidden="true" />}>
                    <div />
                </NavCardTab>
                <NavCardTab name="LOCALIZAÇÃO" icon={<img src={LocalizacaoIcon} alt="" aria-hidden="true" />}>
                    <div />
                </NavCardTab>
            </NavCardProvider>
        </>
    );
};

export default Visualizar;
