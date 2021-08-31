import React from "react";
import { Button } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { registrarSchema } from "validators/sign";

import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookInputPassword from "components/micro/Inputs/ReactHookInputPassword";
import ReactHookInputNumberFormat from "components/micro/Inputs/ReactHookInputNumberFormat";
import ReactHookInputSelect from "components/micro/Inputs/ReactHookInputSelect";
import BlockToastCard from "components/micro/Cards/BlockToastCard";

import { InputsContainer, Form, mediaQuery } from "./styles";

type FormValues = {
    nome: string;
    cpf: string;
    telefone: string;
    email_reg: string;
    rep_email_reg: string;
    senha_reg: string;
    rep_senha_reg: string;
    estado: string;
    municipio: string;
};

const Registrar: React.FC = () => {
    const methods = useForm<FormValues>({
        mode: "all",
        resolver: yupResolver(registrarSchema),
    });
    const handleFormSubmit = React.useCallback((data: FormValues) => console.log("submit", data), []);
    return (
        <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(handleFormSubmit)}>
                <p>Para registrar seu usuário, por favor preencha o formulário abaixo:</p>
                <BlockToastCard type="warning" text="Recomenda-se a utilização do e-mail INSTITUCIONAL para liberação do cadastro o mais rápido possível." />
                <InputsContainer>
                    <ReactHookInputText label="NOME COMPLETO:" name="nome" placeholder="Digite seu nome" isHorizontal={mediaQuery.mobile} thinBorder />
                    <ReactHookInputNumberFormat
                        label="CPF:"
                        name="cpf"
                        placeholder="Digite seu CPF"
                        format="###.###.###-##"
                        isHorizontal={mediaQuery.mobile}
                        thinBorder
                    />
                    <ReactHookInputNumberFormat
                        label="TELEFONE:"
                        name="telefone"
                        placeholder="Digite seu Telefone"
                        format={["(##) ####-#####", "(##) #####-####"]}
                        isHorizontal={mediaQuery.mobile}
                        thinBorder
                    />
                    <ReactHookInputText label="E-MAIL:" name="email_reg" placeholder="Endereço de e-mail" isHorizontal={mediaQuery.mobile} thinBorder />
                    <ReactHookInputText
                        label="REPETIR E-MAIL:"
                        name="rep_email_reg"
                        placeholder="Endereço de e-mail"
                        isHorizontal={mediaQuery.mobile}
                        thinBorder
                    />
                    <ReactHookInputPassword label="SENHA:" name="senha_reg" placeholder="Senha" isHorizontal={mediaQuery.mobile} thinBorder />
                    <ReactHookInputPassword label="REPETIR SENHA:" name="rep_senha_reg" placeholder="Senha" isHorizontal={mediaQuery.mobile} thinBorder />
                </InputsContainer>
                <p className="city-divider">Para registrar seu usuário, por favor preencha o formulário abaixo:</p>
                <InputsContainer>
                    <ReactHookInputSelect
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
                    <ReactHookInputSelect
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
        </FormProvider>
    );
};

export default Registrar;
