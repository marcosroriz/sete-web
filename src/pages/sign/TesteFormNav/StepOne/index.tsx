import React from "react";

import FormikInputText from "components/micro/Inputs/FormikInputText";
import FormikFormItemCard from "components/micro/Cards/FormikFormItemCard";

import { useFormikNavCard } from "hooks/FormikNavCardContext";

import { Container } from "./styles";

const StepOne: React.FC = () => {
    const { tabs, currentTab } = useFormikNavCard();

    return (
        <Container>
            <FormikFormItemCard name="nome" required>
                <FormikInputText label="NOME" name="nome" isHorizontal />
            </FormikFormItemCard>
            <FormikFormItemCard name="email">
                <FormikInputText label="EMAIL" name="email" isHorizontal />
            </FormikFormItemCard>
        </Container>
    );
};

export default StepOne;
