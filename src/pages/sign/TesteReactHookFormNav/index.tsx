import React from "react";
import * as yup from "yup";
import { FaSignInAlt, FaQuestionCircle, FaRegRegistered } from "react-icons/fa";

import { ReactHookNavCardProvider, ReactHookNavCardTab } from "hooks/ReactHookNavCardContext";

import SidebarLayout from "components/macro/SidebarLayout";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

const sleep = (time: number) => new Promise((acc) => setTimeout(acc, time));

const sepOneSchema = yup.object().shape({
    nome: yup.string().required("Este campo e obrigatório"),
    //estado: yup.string().required("Este campo e obrigatório"),
});

const stepTwo = yup.object().shape({
    sexo: yup.string().required("Este campo e obrigatório"),
});

type FormValues = {
    nome: string;
    email: string;
    senha: string;
    idade: string;
    sexo: string;
    estado: string;
};

const TesteReactHookFormNav: React.FC = () => {
    return (
        <SidebarLayout>
            <ReactHookNavCardProvider<FormValues>
                onSubmit={async (data) => {
                    await sleep(500);
                    console.log("data", data);
                }}
            >
                <ReactHookNavCardTab name="StepOne" icon={<FaSignInAlt />} validationSchema={sepOneSchema}>
                    <StepOne />
                </ReactHookNavCardTab>

                <ReactHookNavCardTab name="StepTwo" icon={<FaQuestionCircle />} validationSchema={stepTwo}>
                    <StepTwo />
                </ReactHookNavCardTab>

                <ReactHookNavCardTab name="StepThree" icon={<FaRegRegistered />}>
                    <StepThree />
                </ReactHookNavCardTab>
            </ReactHookNavCardProvider>
        </SidebarLayout>
    );
};

export default TesteReactHookFormNav;
