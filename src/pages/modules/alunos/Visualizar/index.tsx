import React from "react";
import { useParams } from "react-router-dom";

import { NavCardProvider, NavCardTab } from "contexts/NavCard";
import { useAuth } from "contexts/Auth";
import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";
import { AlunosTableProvider } from "contexts/Tables/AlunosTableContext";

import { Aluno } from "entities/Aluno";
import { AlunosService } from "services/Alunos";

import { Escola } from "entities/Escola";
import { EscolasService } from "services/Escolas";

import PageTitle from "components/micro/PageTitle";

import FichaAluno from "./FichaAluno";
import Localizacao from "./Localizacao";

import AlunosListar from "assets/icons/alunos/alunos-listar.png";
import FichaAlunoIcon from "assets/icons/alunos/alunos-dados-escolares.svg";
import LocalizacaoIcon from "assets/icons/alunos/alunos-localizacao.svg";
import { ReactHookNavCardProvider, ReactHookNavCardTab } from "contexts/ReactHookNavCard";

type FormData = {
    latlng: [string, string];
};

const Visualizar: React.FC = () => {
    const { id: alunoId } = useParams<{ id: string }>();
    const { user } = useAuth();
    const { errorHandler } = useError();
    const { clearModal, createModal } = useAlertModal();

    const [alunoData, setAlunoData] = React.useState<Aluno | null>(null);
    const [escolaData, setEscolaData] = React.useState<Escola | null>(null);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                createModal();
                const codigo_cidade = user?.codigo_cidade || 0;
                const alunoService = new AlunosService();

                const alunoResponse = await alunoService.getAluno(Number(alunoId), codigo_cidade);
                setAlunoData(alunoResponse);

                const escolaService = new EscolasService();
                if (alunoResponse.id_escola) {
                    const escolaResponse = await escolaService.getEscola(alunoResponse.id_escola, codigo_cidade);
                    setEscolaData(escolaResponse);
                }

                if (!alunoResponse.result) {
                    throw { ...alunoResponse };
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
            <NavCardProvider aditionalData={{ alunoData: [alunoData, setAlunoData], escolaData: [escolaData, setEscolaData] }}>
                <NavCardTab name="FICHA DO ALUNO" icon={<img src={FichaAlunoIcon} alt="" aria-hidden="true" />}>
                    <FichaAluno />
                </NavCardTab>
                <NavCardTab name="LOCALIZAÇÃO" icon={<img src={LocalizacaoIcon} alt="" />}>
                    <Localizacao />
                </NavCardTab>
            </NavCardProvider>
        </>
    );
};

export default Visualizar;
