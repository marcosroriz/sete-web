import React from "react";
import { Container as BootstrapContainer, Row, Col } from "react-bootstrap";

import LogoCecate from "assets/images/logo-cecate2.png";
import LogoEt from "assets/images/logo-et-ufg.png";
import LogoFnde from "assets/images/logo-fnde.png";

import { Container } from "./styles";

type FooterProps = {
    thinBorder?: boolean;
};

const Footer: React.FC<FooterProps> = ({ thinBorder = false }) => {
    return (
        <Container thinBorder={thinBorder}>
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
        </Container>
    );
};

export default Footer;
