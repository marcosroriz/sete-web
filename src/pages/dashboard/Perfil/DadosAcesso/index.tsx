import React from "react";

import { AuthenticatorService } from "services/Authenticator";

import { Container } from "./styles";

const DadosAcesso: React.FC = () => {
    React.useEffect(() => {
        const fetchUserData = async () => {
            const authenticatorService = new AuthenticatorService();
            const user = await authenticatorService.isAuthenticated();
            console.log(user);
        };
        fetchUserData();
    }, []);
    return <Container>Olá Acesso</Container>;
};

export default DadosAcesso;
