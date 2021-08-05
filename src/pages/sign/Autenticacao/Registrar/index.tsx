import React from "react";
import { Formik } from "formik";

import FormikInputText from "components/micro/Inputs/FormikInputText";

import { Container, Form, mediaQuery } from "./styles";

const Registrar: React.FC = () => {
    const handleFormSubmit = React.useCallback(() => console.log("submit"), []);
    return (
        <Formik initialValues={{}} onSubmit={handleFormSubmit}>
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <p>Para registrar seu usuário, por favor preencha o formulário abaixo:</p>
                    <Container>
                        <FormikInputText label="NOME COMPLETO:" name="nome" placeholder="Digite seu nome" isHorizontal={mediaQuery.mobile} thinBorder />
                        <FormikInputText label="CPF:" name="cpf" placeholder="Digite seu CPF" isHorizontal={mediaQuery.mobile} thinBorder />
                        <FormikInputText label="TELEFONE:" name="telefone" placeholder="Digite seu Telefone" isHorizontal={mediaQuery.mobile} thinBorder />
                        <FormikInputText label="E-MAIL:" name="email" placeholder="Endereço de e-mail" isHorizontal={mediaQuery.mobile} thinBorder />
                        <FormikInputText
                            label="REPETIR E-MAIL:"
                            name="rep_email"
                            placeholder="Endereço de e-mail"
                            isHorizontal={mediaQuery.mobile}
                            thinBorder
                        />
                        <FormikInputText label="SENHA:" name="senha" placeholder="Senha" isHorizontal={mediaQuery.mobile} thinBorder />
                        <FormikInputText label="REPETIR SENHA:" name="rep_senha" placeholder="Senha" isHorizontal={mediaQuery.mobile} thinBorder />
                    </Container>
                    <p>Para registrar seu usuário, por favor preencha o formulário abaixo:</p>
                </Form>
            )}
        </Formik>
    );
};

export default Registrar;
