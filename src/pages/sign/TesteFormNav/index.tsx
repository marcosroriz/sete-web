import React from "react";
import * as yup from "yup";
import { FaSignInAlt, FaQuestionCircle, FaRegRegistered } from "react-icons/fa";

import { FormikNavCardProvider, FormikNavCardTab } from "hooks/FormikNavCardContext";

import SidebarLayout from "components/macro/SidebarLayout";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

const sleep = (time: number) => new Promise((acc) => setTimeout(acc, time));

const sepOneSchema = yup.object().shape({
    nome: yup.string().required("Este campo e obrigatório"),
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
            <FormikNavCardProvider
                initialValues={initialValues}
                onSubmit={async (values) => {
                    await sleep(500);
                    console.log("values", values);
                }}
            >
                <FormikNavCardTab name="StepOne" icon={<FaSignInAlt />} validationSchema={sepOneSchema}>
                    <StepOne />
                </FormikNavCardTab>

                <FormikNavCardTab name="StepTwo" icon={<FaQuestionCircle />} validationSchema={stepTwo}>
                    <StepTwo />
                </FormikNavCardTab>

                <FormikNavCardTab name="StepThree" icon={<FaRegRegistered />}>
                    <StepThree />
                </FormikNavCardTab>
            </FormikNavCardProvider>
        </SidebarLayout>
    );
};

export default Autenticacao;
