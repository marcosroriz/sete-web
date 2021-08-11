import React from "react";
import { Button } from "react-bootstrap";
import { Formik } from "formik";

import FormikInputText from "components/micro/Inputs/FormikInputText";
import FormikInputPassword from "components/micro/Inputs/FormikInputPassword";
import FormikInputNumberFormat from "components/micro/Inputs/FormikInputNumberFormat";
import FormikInputSelect from "components/micro/Inputs/FormikInputSelect";
import BlockToastCard from "components/micro/Cards/BlockToastCard";

import { registrarSchema } from "validators/sign/Autenticacao";

import { InputsContainer, Form, mediaQuery } from "./styles";

const registrarInitialValues = {
    nome: "",
    cpf: "",
    telefone: "",
    email_reg: "",
    rep_email_reg: "",
    senha_reg: "",
    rep_senha_reg: "",
    estado: "",
    municipio: "",
};

const Registrar: React.FC = () => {
    const handleFormSubmit = React.useCallback((values: any) => console.log("submit", values), []);
    return (
        <Formik initialValues={registrarInitialValues} onSubmit={handleFormSubmit} validationSchema={registrarSchema}>
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <p>Para registrar seu usuário, por favor preencha o formulário abaixo:</p>
                    <BlockToastCard
                        type="warning"
                        text="Recomenda-se a utilização do e-mail INSTITUCIONAL para liberação do cadastro o mais rápido possível."
                    />
                    <InputsContainer>
                        <FormikInputText label="NOME COMPLETO:" name="nome" placeholder="Digite seu nome" isHorizontal={mediaQuery.mobile} thinBorder />
                        <FormikInputNumberFormat
                            label="CPF:"
                            name="cpf"
                            placeholder="Digite seu CPF"
                            mask="_"
                            format="###.###.###-##"
                            isHorizontal={mediaQuery.mobile}
                            thinBorder
                        />
                        <FormikInputNumberFormat
                            label="TELEFONE:"
                            name="telefone"
                            placeholder="Digite seu Telefone"
                            isHorizontal={mediaQuery.mobile}
                            thinBorder
                        />
                        <FormikInputText label="E-MAIL:" name="email_reg" placeholder="Endereço de e-mail" isHorizontal={mediaQuery.mobile} thinBorder />
                        <FormikInputText
                            label="REPETIR E-MAIL:"
                            name="rep_email_reg"
                            placeholder="Endereço de e-mail"
                            isHorizontal={mediaQuery.mobile}
                            thinBorder
                        />
                        <FormikInputPassword label="SENHA:" name="senha_reg" placeholder="Senha" isHorizontal={mediaQuery.mobile} thinBorder />
                        <FormikInputPassword label="REPETIR SENHA:" name="rep_senha_reg" placeholder="Senha" isHorizontal={mediaQuery.mobile} thinBorder />
                    </InputsContainer>
                    <p className="city-divider">Para registrar seu usuário, por favor preencha o formulário abaixo:</p>
                    <InputsContainer>
                        <FormikInputSelect
                            label="ESTADO OU DISTRITO:"
                            name="estado"
                            placeholder="Selecione um Estado"
                            options={[
                                { value: "1", label: "Olá mundo" },
                                { value: "2", label: "Olá" },
                                { value: "3", label: "Olá mndo" },
                                { value: "4", label: "Olá mo" },
                            ]}
                            isHorizontal={mediaQuery.mobile}
                            thinBorder
                        />
                        <FormikInputSelect
                            label="MUNICÍPIO:"
                            name="municipio"
                            placeholder="Selecione um Município"
                            options={[
                                { value: "1", label: "Olá mundo" },
                                { value: "2", label: "Olá" },
                                { value: "3", label: "Olá mndo" },
                                { value: "4", label: "Olá mo" },
                            ]}
                            isHorizontal={mediaQuery.mobile}
                            thinBorder
                        />
                        <div className="submit-container">
                            <Button variant="warning" className="btn-fill" type="submit">
                                Registrar
                            </Button>
                        </div>
                    </InputsContainer>
                </Form>
            )}
        </Formik>
    );
};

export default Registrar;
