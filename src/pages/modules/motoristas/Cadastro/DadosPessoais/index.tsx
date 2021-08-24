import React from "react";

import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookInputNumberFormat from "components/micro/Inputs/ReactHookInputNumberFormat";
import ReactHookInputRadio from "components/micro/Inputs/ReactHookInputRadio";
import ReactHookInputCheckbox from "components/micro/Inputs/ReactHookInputCheckbox";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";

import { Container } from "./styles";

const DadosPessoais: React.FC = () => {
    return (
        <Container>
            <ReactHookFormItemCard required>
                <ReactHookInputText label="NOME DO MOTORISTA*" name="nome" isHorizontal />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard required>
                <ReactHookInputNumberFormat label="CPF DO MOTORISTA*" name="cpf" format="###.###.###-##" isHorizontal />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard required>
                <ReactHookInputNumberFormat label="DATA DE NASCIMENTO*" name="nascimento" format="##/##/####" isHorizontal />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard>
                <ReactHookInputNumberFormat label="TELEFONE*" name="telefone" format={["(##) ####-#####", "(##) #####-####"]} isHorizontal />
            </ReactHookFormItemCard>

            <ReactHookFormItemCard required>
                <div className="dados-radio-field">
                    <ReactHookInputRadio label="Masculino" value="masc" name="sexo" position="right" />
                    <ReactHookInputRadio label="Feminino" value="fem" name="sexo" position="right" />
                    <ReactHookInputRadio label="Não Informado" value="none" name="sexo" position="right" />
                </div>
            </ReactHookFormItemCard>

            <ReactHookFormItemCard>
                <ReactHookInputText label="NÚMERO DO DOCUMENTO DE ANTECENDENTES CRIMINAIS*" name="criminais" isHorizontal />
            </ReactHookFormItemCard>
        </Container>
    );
};

export default DadosPessoais;
