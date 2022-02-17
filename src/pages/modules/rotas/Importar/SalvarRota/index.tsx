import React from "react";

import { RotasService } from "services/Rotas";

import { useAuth } from "contexts/Auth";

import BlockTitle from "components/micro/BlockTitle";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ReactHookInputSelect from "components/micro/Inputs/ReactHookInputSelect";

import { Container, mediaQuery } from "./styles";

type SelectOptions = {
    value: string;
    label: string;
};

const SalvarRota: React.FC = () => {
    const { user } = useAuth();

    const [rotaOptions, setRotaOptions] = React.useState<SelectOptions[]>([]);

    const fetchData = async () => {
        try {
            const codigo_cidade = user?.codigo_cidade || 0;
            const rotasService = new RotasService();

            const rotasResponse = await rotasService.listRotas(codigo_cidade);
            setRotaOptions(rotasResponse.data.map((rota) => ({ value: rota.id_rota.toString(), label: rota.nome })));
        } catch (err) {
            console.log(err);
        }
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <Container>
            <BlockTitle message="POR FAVOR SELECIONE PARA QUAL ROTA O ARQUIVO GPX SERÁ IMPORTADO." />
            <ReactHookFormItemCard required>
                <ReactHookInputSelect
                    label="SELECIONE A ROTA*"
                    name="rota"
                    placeholder="Selecione uma Opção"
                    options={rotaOptions}
                    isHorizontal={mediaQuery.desktop}
                />
            </ReactHookFormItemCard>
        </Container>
    );
};

export default SalvarRota;
