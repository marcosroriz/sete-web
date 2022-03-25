import React from "react";
import { useParams } from "react-router-dom";

import { NavCardProvider, NavCardTab } from "contexts/NavCard";
import { useAuth } from "contexts/Auth";
import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";
import { Aluno } from "entities/Aluno";
import { AlunosService } from "services/Alunos";

import PageTitle from "components/micro/PageTitle";

import FichaAluno from "./FichaAluno";
import Localizacao from "./Localizacao";

import AlunosListar from "assets/icons/alunos/alunos-listar.png";
import FichaAlunoIcon from "assets/icons/alunos/alunos-dados-escolares.svg";
import LocalizacaoIcon from "assets/icons/alunos/alunos-localizacao.svg";
import { ReactHookNavCardProvider, ReactHookNavCardTab } from "contexts/ReactHookNavCard";

const Visualizar: React.FC = () => {
    const { id: alunoId } = useParams<{ id: string }>();
    const { user } = useAuth();
    const { errorHandler } = useError();
    const { clearModal, createModal } = useAlertModal();

    const [alunoData, setAlunoData] = React.useState<Aluno | null>(null);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                createModal();
                const codigo_cidade = user?.codigo_cidade || 0;
                const alunoService = new AlunosService();
                const response = await alunoService.getAluno(Number(alunoId), codigo_cidade);

                setAlunoData(response);

                if (!response.result) {
                    throw { ...response };
                }
                clearModal();
            } catch (err) {
                errorHandler(err, { title: "Erro ao buscar dados do aluno" });
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <PageTitle message="Vizualizar dados do Aluno" icon={AlunosListar} />
            <ReactHookNavCardProvider onSubmit={() => console.log("")} aditionalData={{ alunoData: [alunoData, setAlunoData] }}>
                <ReactHookNavCardTab name="FICHA DO ALUNO" icon={<img src={FichaAlunoIcon} alt="" aria-hidden="true" />}>
                    <FichaAluno />
                </ReactHookNavCardTab>
                <ReactHookNavCardTab name="LOCALIZAÇÃO" icon={<img src={LocalizacaoIcon} alt="" />}>
                    <Localizacao />
                </ReactHookNavCardTab>
            </ReactHookNavCardProvider>
        </>
    );
};

export default Visualizar;
