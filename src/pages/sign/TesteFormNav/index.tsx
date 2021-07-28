import React from "react";
import { FaSignInAlt, FaQuestionCircle, FaRegRegistered } from "react-icons/fa";

import { FormNavCardProvider, FormNavCardTab } from "hooks/FormNavCardContext";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

const Autenticacao: React.FC = () => {
    const initialValues = {
        nome: "",
        email: "",
        senha: "",
        idade: 0,
        casado: false,
    };
    return (
        <FormNavCardProvider
            initialValues={initialValues}
            onSubmit={async (values) => {
                await sleep(500);
                console.log("values", values);
            }}
        >
            <FormNavCardTab name="StepOne" icon={<FaSignInAlt />}>
                <StepOne />
            </FormNavCardTab>

            <FormNavCardTab name="StepTwo" icon={<FaQuestionCircle />}>
                <StepTwo />
            </FormNavCardTab>

            <FormNavCardTab name="StepThree" icon={<FaRegRegistered />}>
                <StepThree />
            </FormNavCardTab>
        </FormNavCardProvider>
    );
};

export default Autenticacao;
