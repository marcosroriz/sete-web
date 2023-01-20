import React from "react";

import { importRotaSchema, gpxRouteSchema, saveRouteSchema } from "validators/modules/rotas";

import { ReactHookNavCardProvider, ReactHookNavCardTab } from "contexts/ReactHookNavCard";
import { useAuth } from "contexts/Auth";
import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";

import PageTitle from "components/micro/PageTitle";

import ImportarRotasIcon from "assets/icons/rotas/rotas-importar.png";
import ImportarGpxIcon from "assets/icons/rotas/rotas-importargpx.png";
import PreviewRotaIcon from "assets/icons/rotas/rotas-preview.png";
import SalvarRotaIcon from "assets/icons/rotas/rotas-salvar.png";

import MalhaAtual from "./MalhaAtual";
import AtualizarMalha from "./AtualizarMalha";

const MalhaViaria: React.FC = () => {
    //const handleSubmit = async (data) => {};
    return (
        <>
            <PageTitle message="Malha Viária" icon={ImportarRotasIcon} />
            <ReactHookNavCardProvider onSubmit={(data) => console.log(data)}>
                <ReactHookNavCardTab name="Malha Atual" icon={<img src={ImportarGpxIcon} alt="" />}>
                    <MalhaAtual />
                </ReactHookNavCardTab>
                <ReactHookNavCardTab name="Atualizar Malha" icon={<img src={PreviewRotaIcon} alt="" />}>
                    <AtualizarMalha />
                </ReactHookNavCardTab>
            </ReactHookNavCardProvider>
        </>
    );
};

export default MalhaViaria;
