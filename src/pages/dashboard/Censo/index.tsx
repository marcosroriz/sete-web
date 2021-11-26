import React from "react";

import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";
import { ReactHookNavCardTab, ReactHookNavCardProvider } from "contexts/ReactHookNavCard";

import IconInep from "assets/icons/censo/censo-inep.png";
import IconEducaCenso from "assets/icons/censo/censo-educacenso.png";
import IconProcessamento from "assets/icons/censo/censo-processamento.png";
import IconTxt from "assets/icons/censo/censo-txt.png";

import EducaCenso from "./EducaCenso";
import BaseDados from "./BaseDados";
import Importar from "./Importar";
import PageTitle from "components/micro/PageTitle";

const Censo: React.FC = () => {
    const { errorHandler } = useError();
    const { createModal, clearModal } = useAlertModal();

    const handleSubmit = async () => {
        try {
        } catch (err) {
            errorHandler(err, { title: "Atenção!" });
        }
    };

    return (
        <>
            <PageTitle message="Importar Base de Dados do Censo Escolar" icon={IconInep} />
            <ReactHookNavCardProvider onSubmit={handleSubmit}>
                <ReactHookNavCardTab name="EDUCACENSO" icon={<img src={IconEducaCenso} alt="" />}>
                    <EducaCenso />
                </ReactHookNavCardTab>
                <ReactHookNavCardTab name="BASE DE DADOS" icon={<img src={IconTxt} alt="" />}>
                    <BaseDados />
                </ReactHookNavCardTab>
                <ReactHookNavCardTab name="IMPORTAR" icon={<img src={IconProcessamento} alt="" />}>
                    <Importar />
                </ReactHookNavCardTab>
            </ReactHookNavCardProvider>
        </>
    );
};

export default Censo;
