import React from "react";
import { NavLink } from "react-router-dom";
import { Accordion, Card } from "react-bootstrap";

import BackgroundImage from "../BackgroundImage";
import Footer from "../Footer";
import AccordionButton from "./AccordionButon";

import LogoSete from "assets/images/logo-sete-w.png";
import IconPerfil from "assets/icons/sidebar-perfil.svg";
import IconAlunos from "assets/icons/sidebar-alunos.svg";
import IconEscolas from "assets/icons/sidebar-escolas.svg";
import IconFornecedores from "assets/icons/sidebar-fornecedores.svg";
import IconFrotas from "assets/icons/sidebar-frotas.svg";
import IconMotorista from "assets/icons/sidebar-motorista.svg";
import IconRelatorios from "assets/icons/sidebar-relatorios.svg";
import IconRotas from "assets/icons/sidebar-rotas.svg";
import IconSenso from "assets/icons/sidebar-senso.svg";

import { Container, Nav, Section, ChildrenContainer, NavItem, NavItemBody } from "./styles";

const SidebarLayout: React.FC = ({ children }) => {
    const [activeKey, setAtiveKey] = React.useState("");
    React.useEffect(() => {
        setAtiveKey("0");
    }, []);
    const changeAccordionKey = React.useCallback(
        (key: string) => {
            setAtiveKey((prev) => (prev !== key ? key : ""));
        },
        [setAtiveKey],
    );
    return (
        <>
            <BackgroundImage />
            <Container>
                <Nav>
                    <div className="nav-logo">
                        <a href="/form">
                            <img src={LogoSete} alt="Sistema Eletrônico de Gestão do Transporte Escolar" />
                        </a>
                    </div>
                    <Accordion activeKey={activeKey} className="nav-items">
                        <NavItem isProfile>
                            <AccordionButton onClick={() => changeAccordionKey("-1")} icon={IconPerfil} name="Irwin" isActive={activeKey === "-1"} isProfile />
                            <Accordion.Collapse eventKey="-1">
                                <NavItemBody isProfile>
                                    <li>
                                        <NavLink to="/" activeClassName="isActive">
                                            Cadastrar
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/" exact activeClassName="isActive">
                                            Gerenciar
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/" exact activeClassName="isActive">
                                            Importar de Planilha Eletrônica
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/" exact activeClassName="isActive">
                                            Visualizar
                                        </NavLink>
                                    </li>
                                </NavItemBody>
                            </Accordion.Collapse>
                        </NavItem>
                        <NavItem>
                            <AccordionButton onClick={() => changeAccordionKey("0")} icon={IconAlunos} name="Alunos" isActive={activeKey === "0"} />
                            <Accordion.Collapse eventKey="0">
                                <NavItemBody>
                                    <li>
                                        <NavLink to="/" activeClassName="isActive">
                                            Cadastrar
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/" exact activeClassName="isActive">
                                            Gerenciar
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/" exact activeClassName="isActive">
                                            Importar de Planilha Eletrônica
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/" exact activeClassName="isActive">
                                            Visualizar
                                        </NavLink>
                                    </li>
                                </NavItemBody>
                            </Accordion.Collapse>
                        </NavItem>
                        <NavItem>
                            <AccordionButton onClick={() => changeAccordionKey("1")} icon={IconEscolas} name="Escolas" isActive={activeKey === "1"} />
                            <Accordion.Collapse eventKey="1">
                                <NavItemBody>
                                    <li>
                                        <NavLink to="/" activeClassName="isActive">
                                            Cadastrar
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/" exact activeClassName="isActive">
                                            Gerenciar
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/" exact activeClassName="isActive">
                                            Importar de Planilha Eletrônica
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/" exact activeClassName="isActive">
                                            Visualizar
                                        </NavLink>
                                    </li>
                                </NavItemBody>
                            </Accordion.Collapse>
                        </NavItem>
                        <NavItem>
                            <AccordionButton onClick={() => changeAccordionKey("2")} icon={IconFornecedores} name="Fornecedores" isActive={activeKey === "2"} />
                            <Accordion.Collapse eventKey="2">
                                <NavItemBody>
                                    <li>
                                        <NavLink to="/" activeClassName="isActive">
                                            Cadastrar
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/" exact activeClassName="isActive">
                                            Gerenciar
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/" exact activeClassName="isActive">
                                            Importar de Planilha Eletrônica
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/" exact activeClassName="isActive">
                                            Visualizar
                                        </NavLink>
                                    </li>
                                </NavItemBody>
                            </Accordion.Collapse>
                        </NavItem>
                        <NavItem>
                            <AccordionButton onClick={() => changeAccordionKey("3")} icon={IconFrotas} name="Frotas" isActive={activeKey === "3"} />
                            <Accordion.Collapse eventKey="3">
                                <NavItemBody>
                                    <li>
                                        <NavLink to="/" activeClassName="isActive">
                                            Cadastrar
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/" exact activeClassName="isActive">
                                            Gerenciar
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/" exact activeClassName="isActive">
                                            Importar de Planilha Eletrônica
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/" exact activeClassName="isActive">
                                            Visualizar
                                        </NavLink>
                                    </li>
                                </NavItemBody>
                            </Accordion.Collapse>
                        </NavItem>
                    </Accordion>
                </Nav>
                <Section>
                    <ChildrenContainer>{children}</ChildrenContainer>
                    <Footer thinBorder />
                </Section>
            </Container>
        </>
    );
};

export default SidebarLayout;
