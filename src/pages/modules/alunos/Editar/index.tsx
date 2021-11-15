import React from "react";
import { useParams } from "react-router-dom";

import { ReactHookNavCardProvider, ReactHookNavCardTab } from "contexts/ReactHookNavCard";
import { useAuth } from "contexts/Auth";
import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";
import { AlunosService } from "services/Alunos";
import { Aluno } from "entities/Aluno";

import PageTitle from "components/micro/PageTitle";

import Localizacao from "./Localizacao";
import DadosPessoais from "./DadosPessoais";
import DadosEscolares from "./DadosEscolares";

import DadosEscolaresIcon from "assets/icons/alunos/alunos-dados-escolares.svg";
import DadosPessoaisIcon from "assets/icons/alunos/alunos-dados-pessoais.svg";
import LocalizacaoIcon from "assets/icons/alunos/alunos-localizacao.svg";
import AlunosCadastroIcon from "assets/icons/alunos/alunos-cadastro.svg";

type FormData = {
    latlng: [string, string];
    loc_endereco: string;
    mec_tp_localizacao: string;
    endereco: string;
    da_porteira: boolean; // S/N pra api
    da_mataburro: boolean; // S/N pra api
    da_colchete: boolean; // S/N pra api
    da_atoleiro: boolean; // S/N pra api
    da_ponterustica: boolean; // S/N pra api
    nome: string;
    cpf: string; // Não pode ter formato normal
    data_nascimento: string;
    nome_responsavel: string;
    telefone_responsavel: string;
    grau_responsavel: string; // número pra api
    sexo: string; // número pra api
    cor: string; // número pra api
    def_caminhar: boolean; // S/N pra api
    def_ouvir: boolean; // S/N pra api
    def_enxergar: boolean; // S/N pra api
    def_mental: boolean; // S/N pra api
    escola: any;
    rota: any;
    turno: string; // número pra api
    nivel: string; // número pra api
};

const Editar: React.FC = () => {
    const { id: alunoId } = useParams<{ id: string }>();
    const { user } = useAuth();
    const { errorHandler } = useError();
    const { createModal, clearModal } = useAlertModal();

    const [alunoData, setAlunoData] = React.useState<Aluno | null>(null);

    const handleFormSubmit = async (data: FormData) => {
        try {
            createModal();
            const alunosService = new AlunosService();
            const codigo_cidade = user?.codigo_cidade || 0;
            const body = {
                loc_latitude: data.latlng[0],
                loc_longitude: data.latlng[1],
                loc_endereco: data.loc_endereco,
                mec_tp_localizacao: Number(data.mec_tp_localizacao),
                endereco: data.endereco,
                da_porteira: data.da_porteira ? "S" : "N",
                da_mataburro: data.da_mataburro ? "S" : "N",
                da_colchete: data.da_colchete ? "S" : "N",
                da_atoleiro: data.da_atoleiro ? "S" : "N",
                da_ponterustica: data.da_ponterustica ? "S" : "N",
                nome: data.nome,
                cpf: data.cpf.replace(/\./g, "").replace(/-/g, ""),
                data_nascimento: data.data_nascimento,
                nome_responsavel: data.nome_responsavel,
                telefone_responsavel: data.telefone_responsavel,
                grau_responsavel: Number(data.grau_responsavel),
                sexo: Number(data.sexo),
                cor: Number(data.cor),
                def_caminhar: data.def_caminhar ? "S" : "N",
                def_ouvir: data.def_ouvir ? "S" : "N",
                def_enxergar: data.def_enxergar ? "S" : "N",
                def_mental: data.def_mental ? "S" : "N",
                turno: Number(data.turno),
                nivel: Number(data.nivel),
            };
            const response = await alunosService.updateAluno(body, Number(alunoId), codigo_cidade);
            if (!response.result) {
                throw { ...response };
            }
            createModal("success", { title: "Sucesso", html: "Veículo cadastrado com sucesso" });
        } catch (err) {
            errorHandler(err, { title: "Erro ao cadastrar veículo" });
        }
    };

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                createModal();
                const codigo_cidade = user?.codigo_cidade || 0;
                const alunosService = new AlunosService();
                const response = await alunosService.getAluno(Number(alunoId), codigo_cidade);
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
            <PageTitle message="Atualizar Aluno" icon={AlunosCadastroIcon} />
            <ReactHookNavCardProvider<FormData>
                onSubmit={handleFormSubmit}
                aditionalData={{
                    alunoData: [alunoData, setAlunoData],
                }}
            >
                <ReactHookNavCardTab name="Localização" icon={<img src={LocalizacaoIcon} alt="" />}>
                    <Localizacao />
                </ReactHookNavCardTab>
                <ReactHookNavCardTab name="Dados Pessoais" icon={<img src={DadosPessoaisIcon} alt="" />}>
                    <DadosPessoais />
                </ReactHookNavCardTab>
                <ReactHookNavCardTab name="Dados Escolares" icon={<img src={DadosEscolaresIcon} alt="" />}>
                    <DadosEscolares />
                </ReactHookNavCardTab>
            </ReactHookNavCardProvider>
        </>
    );
};

export default Editar;
