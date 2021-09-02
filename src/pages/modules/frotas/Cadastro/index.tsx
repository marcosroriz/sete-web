import React from "react";

import { ReactHookNavCardProvider, ReactHookNavCardTab } from "contexts/ReactHookNavCard";
import { dadosBasicosSchema, detalhesEnvioSchema } from "validators/modules/frotas";

import PageTitle from "components/micro/PageTitle";
import DadosBasicos from "./DadosBasicos";
import DetalhesEnvio from "./DetalhesEnvio";

import PageIconOnibus from "assets/icons/frotas/frota-onibus.png";
import PageIconLancha from "assets/icons/frotas/frota-lancha.png";
import DadosBasicosIcon from "assets/icons/frotas/frota-dados-basicos.png";
import DetalhesVeiculoIcon from "assets/icons/frotas/frota-detalhes-veicuo.png";

type FormData = {
    modo: string;
    tipo: string;
    marca: string;
    aquisicao_programa: string;
    aquisicao: string;
    origem: string;
    placa: string;
    renavam: string;
    quilometragem: string;
    capacidade: string;
    manutencao: string;
};

const Cadastro: React.FC = () => {
    return (
        <>
            <PageTitle message="Cadastro de Motorista" icon={PageIconOnibus} iconRight={PageIconLancha} />
            <ReactHookNavCardProvider<FormData> mode="onSubmit" reValidateMode="onChange" onSubmit={(data) => console.log(data)}>
                <ReactHookNavCardTab
                    name="DADOS PESSOAIS"
                    icon={<img src={DadosBasicosIcon} alt="" aria-hidden="true" />}
                    validationSchema={dadosBasicosSchema}
                >
                    <DadosBasicos />
                </ReactHookNavCardTab>

                <ReactHookNavCardTab
                    name="DADOS DE TRANSPORTES"
                    icon={<img src={DetalhesVeiculoIcon} alt="" aria-hidden="true" />}
                    validationSchema={detalhesEnvioSchema}
                >
                    <DetalhesEnvio />
                </ReactHookNavCardTab>
            </ReactHookNavCardProvider>
        </>
    );
};

export default Cadastro;
