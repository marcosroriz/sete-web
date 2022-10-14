import React from "react";

import { useAuth } from "contexts/Auth";
import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";

import { AlunoListObj } from "entities/Aluno";
import { AlunosService } from "services/Alunos";

import PageTitle from "components/micro/PageTitle";

import AlunosListar from "assets/icons/alunos/alunos-listar.png";
import MapaIcon from "assets/icons/garagem/mapa-garagem.png";
import { NavCardProvider, NavCardTab } from "contexts/NavCard";

import Localizacao from "./Localizacao";

const Mapa: React.FC = () => {
    const { user } = useAuth();
    const { errorHandler } = useError();
    const { clearModal, createModal } = useAlertModal();

    const [alunosData, setAlunosData] = React.useState<AlunoListObj[] | null>(null);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                createModal();
                const codigo_cidade = user?.codigo_cidade || 0;
                const alunoService = new AlunosService();

                const alunosResponse = await alunoService.listAlunos(codigo_cidade);
                setAlunosData(alunosResponse.data);

                if (!alunosResponse.result) {
                    throw { ...alunosResponse };
                }
                clearModal();
            } catch (err) {
                errorHandler(err, { title: "Erro ao buscar dados dos alunos" });
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <PageTitle message="VIZUALIZAR ALUNOS CADASTRADOS" icon={AlunosListar} />
            <NavCardProvider aditionalData={{ alunosData: [alunosData, setAlunosData] }}>
                <NavCardTab name="MAPA DE ALUNOS ATENDIDOS" icon={<img src={MapaIcon} alt="Icone mapa" />}>
                    <Localizacao />
                </NavCardTab>
            </NavCardProvider>
        </>
    );
};

export default Mapa;
