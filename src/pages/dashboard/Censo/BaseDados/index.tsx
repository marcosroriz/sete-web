import React from "react";

import BlockTitle from "components/micro/BlockTitle";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";
import ReactHookInputFile from "components/micro/Inputs/ReactHookInputFile";

import { Container } from "./styles";

const BaseDados: React.FC = () => {
    return (
        <Container>
            <BlockTitle message="POR FAVOR, ENVIE A BASE DE DADOS EXPORTADA DO SISTEMA EDUCACENSO. VOCÊ DEVE ENCAMINHAR O ARQUIVO DESCOMPACTADO (TXT)." />
            <ReactHookFormItemCard required>
                <ReactHookInputFile
                    name="arquivo"
                    label="ARQUIVO DO CENSO ESCOLAR (TXT):*"
                    placeholder="Clique aqui para selecionar arquivos ou os arreste para esse campo"
                />
            </ReactHookFormItemCard>
        </Container>
    );
};

export default BaseDados;
