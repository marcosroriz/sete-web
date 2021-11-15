import React from "react";

import { ReactHookNavCardProvider, ReactHookNavCardTab } from "contexts/ReactHookNavCard";
import { useAuth } from "contexts/Auth";
import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";
import { MotoristasService } from "services/Motoristas";
import { dadosPessoaisSchema, dadosTransportesSchema } from "validators/modules/motoristas";
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
    nascimento: string;
    sexo: string;
    telefone: string;
    numero_cnh: string;
    vencimento_cnh: string;
    tipo_cnh: boolean[];
    turno: boolean[];
    arquivos: FileData[];
};

const formData = {
    nome: "",
    cpf: "",
    telefone: "",
    nascimento: "",
    sexo: "",
    numero_cnh: "",
    vencimento_cnh: "",
    tipo_cnh: [false, false, false, false, false],
    turno: [false, false, false],
};

const Cadastrar: React.FC = () => {
    const { user } = useAuth();
    const { errorHandler } = useError();
    const { createModal } = useAlertModal();

    const handleFormSubmit = async (data: FormData) => {
        //console.log(data);
        try {
            createModal();
            const motoristasService = new MotoristasService();
            const codigo_cidade = user?.codigo_cidade || 0;

            const body = {
                nome: data.nome,
                cpf: data.cpf.replace(/[-.]/g, ""),
                data_nascimento: data.nascimento,
                sexo: data.sexo == "masc" ? 1 : data.sexo == "fem" ? 2 : 3,
                telefone: data.telefone,
                cnh: data.numero_cnh,
                data_validade_cnh: data.vencimento_cnh,
                turno_manha: data.turno[0] == true ? "S" : "N",
                turno_tarde: data.turno[1] == true ? "S" : "N",
                turno_noite: data.turno[2] == true ? "S" : "N",
                tem_cnh_a: data.tipo_cnh[0] == true ? "S" : "N",
                tem_cnh_b: data.tipo_cnh[0] == true ? "S" : "N",
                tem_cnh_c: data.tipo_cnh[0] == true ? "S" : "N",
                tem_cnh_d: data.tipo_cnh[0] == true ? "S" : "N",
                tem_cnh_e: data.tipo_cnh[0] == true ? "S" : "N",
            };

            //console.log(body);
            const motoristasResponse = await motoristasService.createMotorista(body, codigo_cidade);
            if (!motoristasResponse.result) {
                throw { ...motoristasResponse };
            }
            createModal("success", { title: "Sucesso", html: "Motorista cadastrado com sucesso" });
        } catch (err) {
            errorHandler(err, { title: "Erro ao cadastrar motorista" });
        }
    };

    return (
        <>
            <PageTitle message="Cadastro de Motorista" icon={PageIcon} />
            <ReactHookNavCardProvider<FormData> mode="onSubmit" defaultValues={formData} reValidateMode="onChange" onSubmit={handleFormSubmit}>
                <ReactHookNavCardTab
                    name="DADOS PESSOAIS"
                    icon={<img src={DadosPessoaisIcon} alt="" aria-hidden="true" />}
                    validationSchema={dadosPessoaisSchema}
                >
                    <DadosPessoais />
                </ReactHookNavCardTab>

                <ReactHookNavCardTab
                    name="DADOS DE TRANSPORTES"
                    icon={<img src={DadosTransportesIcon} alt="" aria-hidden="true" />}
                    validationSchema={dadosTransportesSchema}
                >
                    <DadosTransporte />
                </ReactHookNavCardTab>
            </ReactHookNavCardProvider>
        </>
    );
};

export default Cadastrar;
function body(body: any) {
    throw new Error("Function not implemented.");
}
