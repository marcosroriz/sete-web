import React from "react";

import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";
import { ReactHookNavCardTab, ReactHookNavCardProvider } from "contexts/ReactHookNavCard";
import { CensoImportTableProvider, TableData } from "contexts/Tables/CensoImportTable";
import { baseDadosSchema, importarSchema } from "validators/dashboard/censo";

import IconInep from "assets/icons/censo/censo-inep.png";
import IconEducaCenso from "assets/icons/censo/censo-educacenso.png";
import IconProcessamento from "assets/icons/censo/censo-processamento.png";
import IconTxt from "assets/icons/censo/censo-txt.png";

import EducaCenso from "./EducaCenso";
import BaseDados from "./BaseDados";
import Importar from "./Importar";
import PageTitle from "components/micro/PageTitle";

type FormData = {
    arquivo: File;
    selecionado: TableData[];
};

const Censo: React.FC = () => {
    const { errorHandler } = useError();
    const { createModal, clearModal } = useAlertModal();

    const handleSubmit = async (data: FormData) => {
        try {
            console.log(data);
        } catch (err) {
            errorHandler(err, { title: "Atenção!" });
        }
    };

    return (
        <CensoImportTableProvider>
            <PageTitle message="Importar Base de Dados do Censo Escolar" icon={IconInep} />
            <ReactHookNavCardProvider<FormData> onSubmit={handleSubmit}>
                <ReactHookNavCardTab name="EDUCACENSO" icon={<img src={IconEducaCenso} alt="" />}>
                    <EducaCenso />
                </ReactHookNavCardTab>
                <ReactHookNavCardTab name="BASE DE DADOS" icon={<img src={IconTxt} alt="" />} validationSchema={baseDadosSchema}>
                    <BaseDados />
                </ReactHookNavCardTab>
                <ReactHookNavCardTab name="IMPORTAR" icon={<img src={IconProcessamento} alt="" />} validationSchema={importarSchema}>
                    <Importar />
                </ReactHookNavCardTab>
            </ReactHookNavCardProvider>
        </CensoImportTableProvider>
    );
};

export default Censo;
