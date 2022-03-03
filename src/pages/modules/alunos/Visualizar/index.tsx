import React from "react";
import { useParams } from "react-router-dom";

import { NavCardProvider, NavCardTab } from "contexts/NavCard";
import { useAuth } from "contexts/Auth";
import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";

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

                const escolaService = new EscolasService();

                const idEscola = alunoResponse.id_escola != null ? Number(alunoResponse.id_escola) : Number(52272457);
                const escolaResponse = await escolaService.getEscola(idEscola, codigo_cidade);

                setAlunoData(alunoResponse);
                setEscolaData(escolaResponse);

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
            <ReactHookNavCardProvider
                onSubmit={() => console.log("")}
                aditionalData={{ alunoData: [alunoData, setAlunoData], escolaData: [escolaData, setEscolaData] }}
            >
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
