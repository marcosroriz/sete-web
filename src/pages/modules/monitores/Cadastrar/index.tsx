import React from "react";

import { ReactHookNavCardProvider, ReactHookNavCardTab } from "contexts/ReactHookNavCard";
import { useAuth } from "contexts/Auth";
import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";
import { MonitoresService } from "services/Monitores";
//import { dadosPessoaisSchema, dadosTransportesSchema } from "validators/modules/monitores";
import { FileData } from "entities/FileData";

import PageTitle from "components/micro/PageTitle";
import DadosPessoais from "./DadosPessoais";
import DadosTransporte from "./DadosTransporte";

import PageIcon from "assets/icons/motoristas/motorista-cadastro.png";
import DadosPessoaisIcon from "assets/icons/motoristas/motorista-dados-pessoais.svg";
import DadosTransportesIcon from "assets/icons/motoristas/motorista-dados-transportes.png";

type FormData = {
    nome: string;
    cpf: string;
    data_nascimento: string;
    sexo: string;
    telefone: string;
    vinculo: string;
    rotas: string;
    salario: number;
    turno: boolean[];
};

const formData = {
    nome: "",
    cpf: "",
    data_nascimento: "",
    sexo: "",
    telefone: "",
    vinculo: "",
    salario: "",
    turno: [false, false, false],
};

const Cadastrar: React.FC = () => {
    const { user } = useAuth();
    const { errorHandler } = useError();
    const { createModal } = useAlertModal();

    const handleFormSubmit = async (data: FormData) => {
        try {
            createModal();
            const monitoresService = new MonitoresService();
            const codigo_cidade = user?.codigo_cidade || 0;

            const body = {
                nome: data.nome,
                cpf: data.cpf.replace(/[-.]/g, ""),
                data_nascimento: data.data_nascimento,
                sexo: Number(data.sexo),
                telefone: data.telefone,
                vinculo: Number(data.vinculo),
                //rotas: data.rotas,
                salario: data.salario,
                turno_manha: data.turno[0] ? "S" : "N",
                turno_tarde: data.turno[1] ? "S" : "N",
                turno_noite: data.turno[2] ? "S" : "N",
            };
            console.log(body);
            const monitoresResponse = await monitoresService.createMonitor(body, codigo_cidade);
            if (!monitoresResponse.result) {
                throw { ...monitoresResponse };
            }
            createModal("success", { title: "Sucesso", html: "Monitor(a) cadastrado com sucesso" });
        } catch (err) {
            errorHandler(err, { title: "Erro ao cadastrar monitor(a)" });
        }
    };

    return (
        <>
            <PageTitle message="Cadastro de Monitor(a)" icon={PageIcon} />
            <ReactHookNavCardProvider<FormData> mode="onSubmit" defaultValues={formData} reValidateMode="onChange" onSubmit={handleFormSubmit}>
                <ReactHookNavCardTab
                    name="DADOS PESSOAIS"
                    icon={<img src={DadosPessoaisIcon} alt="" aria-hidden="true" />}
                    //validationSchema={dadosPessoaisSchema}
                >
                    <DadosPessoais />
                </ReactHookNavCardTab>

                <ReactHookNavCardTab
                    name="DADOS DE TRANSPORTES"
                    icon={<img src={DadosTransportesIcon} alt="" aria-hidden="true" />}
                    //validationSchema={dadosTransportesSchema}
                >
                    <DadosTransporte />
                </ReactHookNavCardTab>
            </ReactHookNavCardProvider>
        </>
    );
};

export default Cadastrar;
