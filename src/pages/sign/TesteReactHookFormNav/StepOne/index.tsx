import React from "react";

import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookInputPassword from "components/micro/Inputs/ReactHookInputPassword";
import ReactHookInputNumberFormat from "components/micro/Inputs/ReactHookInputNumberFormat";
import ReactHookInputSelect from "components/micro/Inputs/ReactHookInputSelect";
import ReactHookInputCheckbox from "components/micro/Inputs/ReactHookInputCheckbox";

import { Container } from "./styles";

const StepOne: React.FC = () => {
    return (
        <Container>
            <ReactHookInputText label="NOME" name="nome" isHorizontal />
            <ReactHookInputPassword label="EMAIL" name="email" isHorizontal />
            <ReactHookInputNumberFormat label="SENHA" name="senha" format={["(##) ####-#####", "(##) #####-####"]} isHorizontal />
            <ReactHookInputSelect
                label="ESTADO OU DISTRITO:"
                name="estado"
                placeholder="Selecione um Estado"
                options={[
                    { value: "1", label: "Olá mundo" },
                    { value: "2", label: "Olá" },
                    { value: "3", label: "Olá mndo" },
                    { value: "4", label: "Olá mo" },
                ]}
                isHorizontal
            />
            <ReactHookInputCheckbox label="CHECKBOX" name="check" />
        </Container>
    );
};

export default StepOne;
