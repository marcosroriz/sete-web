import React from "react";
import { Button } from "react-bootstrap";

import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookInputNumberFormat from "components/micro/Inputs/ReactHookInputNumberFormat";
import ReactHookInputRadio from "components/micro/Inputs/ReactHookInputRadio";
import ReactHookInputCheckbox from "components/micro/Inputs/ReactHookInputCheckbox";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";

import { Container, ButtonsContainer } from "./styles";

const DadosTransporte: React.FC = () => {
    const { previousStep } = useReactHookNavCard();
    return (
        <Container>
            <ReactHookFormItemCard name="cnh" required>
                <ReactHookInputNumberFormat label="CARTEIRA NACIONAL DE HABILITAÇÃO (CNH)*" name="cnh" format="#########-##" isHorizontal />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard name="vencimento_cnh" required>
                <ReactHookInputNumberFormat label="DATA DE VENCIMENTO DA CNH*" name="vencimento_cnh" format="##/##/####" isHorizontal />
            </ReactHookFormItemCard>
            <ButtonsContainer>
                <Button variant="default" type="button" className="btn-fill" onClick={previousStep}>
                    Voltar
                </Button>
                <Button variant="info" type="submit" className="btn-fill">
                    Concluir
                </Button>
            </ButtonsContainer>
        </Container>
    );
};

export default DadosTransporte;
