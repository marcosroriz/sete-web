import React from "react";

import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";

import { Container } from "./styles";

const StepTwo: React.FC = () => {
    return (
        <Container>
            <ReactHookFormItemCard required name="sexo">
                <ReactHookInputText label="Sexo" name="sexo" isHorizontal />
            </ReactHookFormItemCard>
        </Container>
    );
};

export default StepTwo;
