import React from "react";
import { ProgressBar } from "react-bootstrap";

import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";
import { useAuth } from "contexts/Auth";
import { ReactHookNavCardTab, ReactHookNavCardProvider } from "contexts/ReactHookNavCard";
import { CensoImportTableProvider, TableData } from "contexts/Tables/CensoImportTable";
import { baseDadosSchema, importarSchema } from "validators/dashboard/censo";
import { CensoService } from "services/Censo";

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
    escolas_selecionadas: TableData[];
};

const Censo: React.FC = () => {
    const { errorHandler } = useError();
    const { user } = useAuth();
    const { createModal, incrementProgress } = useAlertModal();

    const handleSubmit = async (data: FormData) => {
        try {
            createModal("progress");
            const codigo_cidade = user?.codigo_cidade || 0;
            const censoService = new CensoService();
            const incrementNumber = Number((100 / data.escolas_selecionadas.length).toPrecision(2));
            for (let tabela of data.escolas_selecionadas) {
                incrementProgress(incrementNumber);
                const body = {
                    escolas: [{ ...tabela.escola, mec_co_municipio: codigo_cidade }],
                    alunos: tabela.alunos,
                };
                await censoService.createCensoRegistro(body, codigo_cidade);
            }
            createModal("success", { title: "Sucesso", html: "Veículo cadastrado com sucesso" });
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
