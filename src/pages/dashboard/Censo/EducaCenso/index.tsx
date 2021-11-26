import React from "react";

import BlockTitle from "components/micro/BlockTitle";

import InfoListItem from "components/micro/InfoListItem";

import { Container } from "./styles";

const EducaCenso: React.FC = () => {
    return (
        <Container>
            <BlockTitle message="PARA IMPORTAR A BASE DE DADOS PARA O SETE É NECESSÁRIO PRIMEIRAMENTE EXPORTÁ-LA DO SISTEMA EDUCACENSO DO INEP. PARA ISSO, SIGA AS SEGUINTES INSTRUÇÕES:" />
            <ul>
                <InfoListItem>
                    <a href="http://censobasico.inep.gov.br/censobasico/">http://censobasico.inep.gov.br/censobasico/</a>
                </InfoListItem>
                <InfoListItem />
            </ul>
        </Container>
    );
};

export default EducaCenso;
