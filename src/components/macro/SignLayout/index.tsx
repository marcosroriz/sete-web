import React from "react";
import { Container as BootstrapContainer, Row, Col } from "react-bootstrap";

import LogoCecate from "assets/images/logo-cecate2.png";
import LogoEt from "assets/images/logo-et-ufg.png";
import LogoFnde from "assets/images/logo-fnde.png";
import LogoSete from "assets/images/logo-sete-w.png";

import { ImageContainer, Container, Section, Header, ChildrenContainer, Footer } from "./styles";

const SignLayout: React.FC = ({ children }) => {
    return (
        <>
            <ImageContainer />
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
                <Footer>
                    <BootstrapContainer>
                        <Row>
                            <Col md={4}>
                                <div className="footer-logo fnde">
                                    <img src={LogoFnde} alt="FNDE" />
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="footer-logo cecate">
                                    <img src={LogoCecate} alt="CECATE" />
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="footer-logo et">
                                    <img src={LogoEt} alt="Engenharia de Transportes" />
                                </div>
                            </Col>
                        </Row>
                    </BootstrapContainer>
                </Footer>
            </Container>
        </>
    );
};

export default SignLayout;
