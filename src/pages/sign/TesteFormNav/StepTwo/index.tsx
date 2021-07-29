import React from "react";

import FormikInputText from "components/micro/Inputs/FormikInputText";

import { Container } from "./styles";

const StepTwo: React.FC = () => {
    return (
        <Container>
            <FormikInputText label="Sexo" name="sexo" />
        </Container>
    );
};

export default StepTwo;
