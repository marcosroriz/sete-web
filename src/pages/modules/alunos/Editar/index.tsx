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
    mec_tp_localizacao: string;
    loc_endereco: string;
    loc_cep: string;
    da_porteira: boolean;
    da_mataburro: boolean;
    da_colchete: boolean;
    da_atoleiro: boolean;
    da_ponterustica: boolean;
    nome: string;
    cpf: string;
    data_nascimento: string;
    nome_responsavel: string;
    telefone_responsavel: string;
    grau_responsavel: string;
    sexo: string;
    cor: string;
    def_caminhar: boolean;
    def_ouvir: boolean;
    def_enxergar: boolean;
    def_mental: boolean;
    escola: string;
    rota: string;
    turno: string;
    nivel: string;
};

const Editar: React.FC = () => {
    const { id: alunoId } = useParams<{ id: string }>();
    const { user } = useAuth();
    const { errorHandler } = useError();
    const { createModal, clearModal } = useAlertModal();

    const [alunoData, setAlunoData] = React.useState<Aluno | null>(null);
    const [escolaData, setEscolaData] = React.useState<any>(null);
    const [rotaData, setRotaData] = React.useState<any>(null);

    const handleFormSubmit = async (data: FormData) => {
        try {
            createModal();
            const alunosService = new AlunosService();
            const codigo_cidade = user?.codigo_cidade || 0;
            const body = {
                loc_latitude: data.latlng[0],
                loc_longitude: data.latlng[1],
                loc_endereco: data.loc_endereco,
                loc_cep: data.loc_cep,
                mec_tp_localizacao: Number(data.mec_tp_localizacao),
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
            //await alunosService.bindEscolaToAlunoEdit({ id_escola: Number(data.escola) }, alunoData?.id_aluno as number, codigo_cidade);
            //await alunosService.bindRotaToAlunoEdit({ id_rota: Number(data.rota) }, alunoData?.id_aluno as number, codigo_cidade);
            createModal("success", { title: "Sucesso", html: "Aluno editado com sucesso" });
        } catch (err) {
            errorHandler(err, { title: "Erro ao editar aluno" });
        }
    };

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                createModal();
                const codigo_cidade = user?.codigo_cidade || 0;
                const alunosService = new AlunosService();
                const response = await alunosService.getAluno(Number(alunoId), codigo_cidade);
                const escolaVinculada = await alunosService.listBindEscolaToAluno(Number(alunoId), codigo_cidade);
                const rotaVinculada = await alunosService.listBindRotaToAluno(Number(alunoId), codigo_cidade);

                setAlunoData(response);
                setEscolaData(escolaVinculada);
                setRotaData(rotaVinculada);

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
            <PageTitle message="Atualizar Aluno" icon={AlunosCadastroIcon} />
            <ReactHookNavCardProvider<FormData>
                onSubmit={handleFormSubmit}
                aditionalData={{
                    alunoData: [alunoData, setAlunoData],
                    escolaData: [escolaData, setEscolaData],
                    rotaData: [rotaData, setRotaData],
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
