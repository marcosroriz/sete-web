import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth } from "contexts/Auth";
import { useAlertModal } from "hooks/AlertModal";
import { useError } from "hooks/Errors";
import { loginSchema } from "validators/sign";

import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookInputPassword from "components/micro/Inputs/ReactHookInputPassword";

import { Container, Form, mediaQuery } from "./styles";

type FormValues = {
    email: string;
    senha: string;
};

const Login: React.FC = () => {
    const { clearModal, createModal } = useAlertModal();
    const { errorHandler } = useError();
    const { signIn } = useAuth();
    const methods = useForm<FormValues>({
        resolver: yupResolver(loginSchema),
    });
    const handleFormSubmit = React.useCallback(async (data: FormValues) => {
        try {
            createModal();
            console.log("submit", data);
            await signIn(data);
            clearModal();
        } catch (err) {
            errorHandler(err, { title: "Falha ao Realizar login" });
        }
    }, []);
    return (
        <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(handleFormSubmit)}>
                <p>Para entrar no sistema por favor digite o endereço de e-mail e a senha de seu usuário abaixo.</p>
                <p>
                    Caso não tenha cadastro, faça o mesmo na aba <a href="/">registar</a>
                </p>
                <Container>
                    <ReactHookInputText label="E-MAIL:" name="email" placeholder="Endereço de e-mail" isHorizontal={mediaQuery.mobile} thinBorder />

                    <div className="inputContainer">
                        <ReactHookInputPassword label="SENHA:" name="senha" placeholder="Senha" isHorizontal={mediaQuery.mobile} thinBorder />
                    </div>

                    <div className="submitContainer">
                        <button type="submit">Entrar no sistema</button>
                    </div>
                </Container>
            </Form>
        </FormProvider>
    );
};

export default Login;
