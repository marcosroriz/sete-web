import React from "react";
import * as yup from "yup";
import { FaSignInAlt, FaQuestionCircle, FaRegRegistered } from "react-icons/fa";

import { FormNavCardProvider, FormNavCardTab } from "hooks/FormNavCardContext";

import SidebarLayout from "components/macro/SidebarLayout";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

const sleep = (time: number) => new Promise((acc) => setTimeout(acc, time));

const sepOneSchema = yup.object().shape({
    nome: yup.string().required("Este campo e obrigatório"),
    email: yup.string().required("Este campo é obrigatório").email("Este campo é um email"),
});

const stepTwo = yup.object().shape({
    sexo: yup.string().required("Este campo e obrigatório"),
});

const Autenticacao: React.FC = () => {
    const initialValues = {
        nome: "",
        email: "",
        senha: "",
        idade: "",
        sexo: "",
    };
    return (
        <SidebarLayout>
            <FormNavCardProvider
                initialValues={initialValues}
                onSubmit={async (values) => {
                    await sleep(500);
                    console.log("values", values);
                }}
            >
                <FormNavCardTab name="StepOne" icon={<FaSignInAlt />} validationSchema={sepOneSchema}>
                    <StepOne />
                </FormNavCardTab>

                <FormNavCardTab name="StepTwo" icon={<FaQuestionCircle />} validationSchema={stepTwo}>
                    <StepTwo />
                </FormNavCardTab>

                <FormNavCardTab name="StepThree" icon={<FaRegRegistered />}>
                    <StepThree />
                </FormNavCardTab>
            </FormNavCardProvider>
        </SidebarLayout>
    );
};

export default Autenticacao;
