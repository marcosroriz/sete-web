import React from "react";

import FormikInputText from "components/micro/Inputs/FormikInputText";

import { useFormNavCard } from "hooks/FormNavCardContext";

import { Container } from "./styles";

const StepOne: React.FC = () => {
    const { tabs, currentTab } = useFormNavCard();

    return (
        <Container>
            <FormikInputText label="Nome" name="nome" />
            <FormikInputText label="Email" name="email" />
        </Container>
    );
};

export default StepOne;