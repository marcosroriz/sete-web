import React from "react";

import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookInputNumberFormat from "components/micro/Inputs/ReactHookInputNumberFormat";
import ReactHookInputRadio from "components/micro/Inputs/ReactHookInputRadio";
import ReactHookInputCheckbox from "components/micro/Inputs/ReactHookInputCheckbox";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";

import { Container } from "./styles";

const DadosTransporte: React.FC = () => {
    return (
        <Container>
            <ReactHookFormItemCard name="cnh" required>
                <ReactHookInputNumberFormat label="CARTEIRA NACIONAL DE HABILITAÇÃO (CNH)*" name="cnh" format="#########-##" isHorizontal />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard name="vencimento_cnh" required>
                <ReactHookInputNumberFormat label="DATA DE VENCIMENTO DA CNH*" name="vencimento_cnh" format="##/##/####" isHorizontal />
            </ReactHookFormItemCard>
        </Container>
    );
};

export default DadosTransporte;
