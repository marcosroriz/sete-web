import React from "react";

import { Container } from "./styles";

const Login: React.FC = () => {
    return (
        <Container>
            <p>Para entrar no sistema por favor digite o endereço de e-mail e a senha de seu usuário abaixo.</p>
            <p>
                Caso não tenha cadastro, faça o mesmo na aba <a href="/">registar</a>
            </p>
        </Container>
    );
};

export default Login;
