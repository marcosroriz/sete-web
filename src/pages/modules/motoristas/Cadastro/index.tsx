import React from "react";

import PageTitle from "components/micro/PageTitle";

import { dadosPessoaisSchema, dadosTransportesSchema } from "validators/modules/motoristas";
import { ReactHookNavCardProvider, ReactHookNavCardTab } from "contexts/ReactHookNavCard";

import DadosPessoais from "./DadosPessoais";
import DadosTransporte from "./DadosTransporte";

import PageIcon from "assets/icons/motorista/motorista-cadastro.png";
import DadosPessoaisIcon from "assets/icons/motorista/motorista-dados-pessoais.svg";
import DadosTransportesIcon from "assets/icons/motorista/motorista-dados-transportes.png";

type FormData = {
    nome: string;
    cpf: string;
    nascimento: string;
    telefone: string;
    sexo: string | null;
    criminais: string;
    cnh: string;
    vencimento_cnh: string;
};

const Cadastro: React.FC = () => {
    return (
        <>
            <PageTitle message="Cadastro de Motorista" icon={PageIcon} />
            <ReactHookNavCardProvider<FormData> mode="onSubmit" reValidateMode="onChange" onSubmit={(data) => console.log(data)}>
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

export default Cadastro;
