import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { recuperarsenhaSchema } from "validators/sign";

import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";

import { Container, Form, mediaQuery } from "./styles";

type FormValues = {
    email: string;
};

const RecuperarSenha: React.FC = () => {
    const methods = useForm<FormValues>({
        resolver: yupResolver(recuperarsenhaSchema),
    });
    const handleFormSubmit = React.useCallback(async (data: FormValues) => {console.log("submit", data)}, []);
    return (
        <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(handleFormSubmit)}>
                <p>Para recuperar sua senha digite o e-mail cadastrado abaixo.</p>
                <p>Você recebera um e-mail automaticamente contendo um link para modificar sua senha.</p>
                <Container>
                    <ReactHookInputText label="E-MAIL:" name="email" placeholder="Endereço de e-mail" isHorizontal={mediaQuery.mobile} thinBorder />
                    <div className="submitContainer">
                        <button type="submit">Recuperar Senha</button>
                    </div>
                </Container>
            </Form>
        </FormProvider>
    );
};

export default RecuperarSenha;
