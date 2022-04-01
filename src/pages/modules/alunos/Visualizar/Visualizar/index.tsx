import React from "react";

import { useAuth } from "contexts/Auth";
import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";

import { AlunoListObj } from "entities/Aluno";
import { AlunosService } from "services/Alunos";

import PageTitle from "components/micro/PageTitle";

import LocalizacaoAlunos from "./LocalizacaoAlunos";

import AlunosListar from "assets/icons/alunos/alunos-listar.png";
import LocalizacaoIcon from "assets/icons/alunos/alunos-localizacao.svg";
import { ReactHookNavCardProvider, ReactHookNavCardTab } from "contexts/ReactHookNavCard";

type FormData = {
    latlng: [string, string];
    nivel: string[];
    turno: string[];
};

const formData = {
    latlng: ["", ""],
    nivel: ["1", "2", "3", "4", "5"],
    turno: ["1", "2", "3", "4"],
};

const Visualizar: React.FC = () => {
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
            <PageTitle message="Vizualizar dados do Aluno" icon={AlunosListar} />
            <ReactHookNavCardProvider<FormData>
                defaultValues={formData as FormData}
                onSubmit={() => console.log("")}
                aditionalData={{ alunosData: [alunosData, setAlunosData] }}
            >
                <ReactHookNavCardTab name="LOCALIZAÇÃO" icon={<img src={LocalizacaoIcon} alt="" />}>
                    <LocalizacaoAlunos />
                </ReactHookNavCardTab>
            </ReactHookNavCardProvider>
        </>
    );
};

export default Visualizar;
