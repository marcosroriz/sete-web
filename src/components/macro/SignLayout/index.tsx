import React from "react";
import { Container as BootstrapContainer, Row, Col } from "react-bootstrap";

import BackgroundImage from "../BackgroundImage";
import Footer from "../Footer";

import LogoSete from "assets/images/logo-sete-w.png";

import { Container, Section, Header, ChildrenContainer } from "./styles";

const SignLayout: React.FC = ({ children }) => {
    return (
        <>
            <BackgroundImage />
            <Container>
                <Section>
                    <Header>
                        <figure className="header-logo">
                            <div>
                                <img src={LogoSete} alt="SETE" />
                            </div>
                            <figcaption>Sistema Eletrônico de Gestão do Transporte Escolar</figcaption>
                        </figure>
                    </Header>
                    <ChildrenContainer>{children}</ChildrenContainer>
                </Section>
                <Footer />
            </Container>
        </>
    );
};

export default SignLayout;
