import React from "react";

import { ReactHookNavCardProvider, ReactHookNavCardTab } from "contexts/ReactHookNavCard";

import { GaragemService } from "services/Garagem";

import { useAlertModal } from "hooks/AlertModal";
import { useError } from "hooks/Errors";
import { useAuth } from "contexts/Auth";

import { dadosGaragemSchema } from "validators/modules/garagem";

import PageTitle from "components/micro/PageTitle";

import Localizacao from "./Localizacao";

import MapaGaragemIcon from "assets/icons/garagem/mapa-garagem.png";
import GaragemCadastroIcon from "assets/icons/garagem/tab-garagem.png";

type FormData = {
    latlng: [string, string];
    loc_endereco: string;
    loc_cep: string;
};

const formData = {
    latlng: ["", ""],
    loc_endereco: "",
    loc_cep: "",
};

const Garagem: React.FC = () => {
    const { user } = useAuth();
    const { createModal } = useAlertModal();
    const { errorHandler } = useError();

    const handleSubmit = async (data: FormData) => {
        try {
            createModal();
            const garagemService = new GaragemService();
            const codigo_cidade = user?.codigo_cidade || 0;
            const body = {
                loc_latitude: data.latlng[0].toString(),
                loc_longitude: data.latlng[1].toString(),
                loc_endereco: data.loc_endereco,
                loc_cep: data.loc_cep,
            };
            const response = await garagemService.createGaragem(body, codigo_cidade);
            if (!response.result) {
                throw { ...response };
            }
            createModal("success", { title: "Sucesso", html: "Garagem cadastrada com sucesso" });
        } catch (err) {
            errorHandler(err, { title: "Erro ao cadastrar a Garagem" });
        }
    };
    return (
        <>
            <PageTitle message="Garagem" icon={GaragemCadastroIcon} />

            <ReactHookNavCardProvider<FormData> mode="onSubmit" defaultValues={formData as FormData} reValidateMode="onChange" onSubmit={handleSubmit}>
                <ReactHookNavCardTab name="MAPA DA GARAGEM" icon={<img src={MapaGaragemIcon} alt="" />} validationSchema={dadosGaragemSchema}>
                    <Localizacao />
                </ReactHookNavCardTab>
            </ReactHookNavCardProvider>
        </>
    );
};

export default Garagem;
