import React from "react";
import { useParams } from "react-router-dom";

import { NavCardProvider, NavCardTab } from "contexts/NavCard";
import { useAuth } from "contexts/Auth";
import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";
import { Escola } from "entities/Escola";
import { AlunosService } from "services/Alunos";

import PageTitle from "components/micro/PageTitle";

import FichaAluno from "./FichaAluno";

import AlunosListar from "assets/icons/alunos/alunos-listar.png";
import FichaAlunoIcon from "assets/icons/alunos/alunos-dados-escolares.svg";
import LocalizacaoIcon from "assets/icons/alunos/alunos-localizacao.svg";

const Visualizar: React.FC = () => {
    const { id: alunoId } = useParams<{ id: string }>();
    const [alunoData, setAlunoData] = React.useState<Escola | null>(null);

    const { errorHandler } = useError();
    const { clearModal, createModal } = useAlertModal();
    const { user } = useAuth();

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                createModal();
                const codigo_cidade = user?.codigo_cidade || 0;
                const anuloService = new AlunosService();
                const response = await anuloService.getAluno(Number(alunoId), codigo_cidade);
                setAlunoData(response);
                if (!response.result) {
                    throw { ...response };
                }
                clearModal();
            } catch (err) {
                errorHandler(err, { title: "Erro ao buscar dados do veículo" });
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <PageTitle message="alunos Cadastradas" icon={AlunosListar} />
            <NavCardProvider aditionalData={{ alunoData: [alunoData, setAlunoData] }}>
                <NavCardTab name="FICHA DO ALUNO" icon={<img src={FichaAlunoIcon} alt="" aria-hidden="true" />}>
                    <FichaAluno />
                </NavCardTab>
                <NavCardTab name="LOCALIZAÇÃO" icon={<img src={LocalizacaoIcon} alt="" aria-hidden="true" />}>
                    <div />
                </NavCardTab>
            </NavCardProvider>
        </>
    );
};

export default Visualizar;
