import React from "react";
import * as yup from "yup";
import { Formik, Field } from "formik";

import FormikInputText from "components/micro/Inputs/FormikInputText";

import { Container, Form, mediaQuery } from "./styles";

const loginSchema = yup.object().shape({
    email: yup.string().required("Por favor digite seu endereço de e-mail").email("Digite um endereço de e-mail válido"),
    senha: yup.string().required("Por favor digite sua senha"),
});

const Login: React.FC = () => {
    const handleFormSubmit = React.useCallback(() => console.log("submit"), []);
    const initialValues = {
        email: "",
        senha: "",
    };
    return (
        <Formik validationSchema={loginSchema} initialValues={initialValues} onSubmit={handleFormSubmit}>
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <p>Para entrar no sistema por favor digite o endereço de e-mail e a senha de seu usuário abaixo.</p>
                    <p>
                        Caso não tenha cadastro, faça o mesmo na aba <a href="/">registar</a>
                    </p>
                    <Container>
                        <FormikInputText label="E-MAIL:" name="email" placeholder="Endereço de e-mail" isHorizontal={mediaQuery.mobile} thinBorder />

                        <div className="inputContainer">
                            <FormikInputText type="password" label="SENHA:" name="senha" placeholder="Senha" isHorizontal={mediaQuery.mobile} thinBorder />
                        </div>

                        <div className="submitContainer">
                            <label>
                                <Field type="checkbox" name="toggle" className="checkbox" />
                                Lembrar Senha
                            </label>
                            <button type="submit">Entrar no sistema</button>
                        </div>
                    </Container>
                </Form>
            )}
        </Formik>
    );
};

export default Login;
