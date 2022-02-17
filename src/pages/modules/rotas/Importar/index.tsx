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

import ArquivoRota from "./ArquivoRota";
import PreVisualizacao from "./PreVisualizacao";
import SalvarRota from "./SalvarRota";

const Importar: React.FC = () => {
    return (
        <>
            <PageTitle message="Cadastrar Escola" icon={ImportarRotasIcon} />
            <ReactHookNavCardProvider onSubmit={(data) => console.log(data)}>
                <ReactHookNavCardTab name="Arqivo de Rota" icon={<img src={ImportarGpxIcon} alt="" />} validationSchema={importRotaSchema}>
                    <ArquivoRota />
                </ReactHookNavCardTab>
                <ReactHookNavCardTab name="Pré-Visualização" icon={<img src={PreviewRotaIcon} alt="" />} validationSchema={gpxRouteSchema}>
                    <PreVisualizacao />
                </ReactHookNavCardTab>
                <ReactHookNavCardTab name="Salvar Rota" icon={<img src={SalvarRotaIcon} alt="" />} validationSchema={saveRouteSchema}>
                    <SalvarRota />
                </ReactHookNavCardTab>
            </ReactHookNavCardProvider>
        </>
    );
};

export default Importar;
