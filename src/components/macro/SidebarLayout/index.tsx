import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import { FaAddressBook, FaUsers, FaSignOutAlt } from "react-icons/fa";
import { Spin as Hamburger } from "hamburger-react";

import { useMediaQuery } from "hooks/MediaQuery";

import BackgroundImage from "../BackgroundImage";
import Footer from "../Footer";
import AccordionButton from "./AccordionButon";

import LogoSete from "assets/images/logo-sete-w.png";
import IconPerfil from "assets/icons/sidebar/sidebar-perfil.svg";
import IconAlunos from "assets/icons/sidebar/sidebar-alunos.svg";
import IconEscolas from "assets/icons/sidebar/sidebar-escolas.svg";
import IconFornecedores from "assets/icons/sidebar/sidebar-fornecedores.svg";
import IconFrotas from "assets/icons/sidebar/sidebar-frotas.svg";
import IconMotoristas from "assets/icons/sidebar/sidebar-motoristas.svg";
import IconRelatorios from "assets/icons/sidebar/sidebar-relatorios.svg";
import IconRotas from "assets/icons/sidebar/sidebar-rotas.svg";
import IconSenso from "assets/icons/sidebar/sidebar-senso.png";

import { Container, NavContainer, NavOverlay, Section, ChildrenContainer, NavItem, NavItemBody, HamburgerContainer, mediaQuery } from "./styles";

const SidebarLayout: React.FC = ({ children }) => {
    const matches = useMediaQuery(mediaQuery.mobile);
    const [menuIsOpened, setMenuIsOpened] = React.useState<boolean>(false);

    const [activeKey, setAtiveKey] = React.useState("");
    React.useEffect(() => {
        //setAtiveKey("0");
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
                {matches && (
                    <>
                        <NavOverlay menuIsOpened={menuIsOpened} onClick={() => setMenuIsOpened(false)} />
                        <HamburgerContainer menuIsOpened={menuIsOpened} style={{ zIndex: 100 }}>
                            <Hamburger
                                toggled={menuIsOpened}
                                toggle={setMenuIsOpened}
                                color="var(--color-yellow)"
                                hideOutline={false}
                                label="Abrir/Fechar Menu"
                            />
                        </HamburgerContainer>
                    </>
                )}
                <NavContainer menuIsOpened={menuIsOpened}>
                    <nav className="nav-content" aria-hidden={!menuIsOpened}>
                        {matches && (
                            <HamburgerContainer menuIsOpened={menuIsOpened}>
                                <Hamburger
                                    toggled={menuIsOpened}
                                    toggle={setMenuIsOpened}
                                    color="var(--color-yellow)"
                                    hideOutline={false}
                                    label="Abrir/Fechar Menu"
                                />
                            </HamburgerContainer>
                        )}
                        <div className="nav-logo">
                            <Link to="/form">
                                <img src={LogoSete} alt="Sistema Eletrônico de Gestão do Transporte Escolar" />
                            </Link>
                        </div>
                        <Accordion activeKey={activeKey} className="nav-items">
                            <NavItem isProfile>
                                <AccordionButton
                                    onClick={() => changeAccordionKey("0")}
                                    icon={IconPerfil}
                                    name="Irwin"
                                    isActive={activeKey === "0"}
                                    isProfile
                                />
                                <Accordion.Collapse eventKey="0">
                                    <NavItemBody isProfile>
                                        <li>
                                            <NavLink to="/" activeClassName="isActive">
                                                <FaAddressBook size={17} />
                                                Meu Perfil
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/" exact activeClassName="isActive">
                                                <FaUsers size={17} />
                                                Outros Usuários
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/" exact activeClassName="isActive">
                                                <FaSignOutAlt size={17} />
                                                Sair
                                            </NavLink>
                                        </li>
                                    </NavItemBody>
                                </Accordion.Collapse>
                            </NavItem>

                            <NavItem>
                                <AccordionButton onClick={() => changeAccordionKey("1")} icon={IconSenso} name="Censo Escolar" isActive={activeKey === "1"} />
                                <Accordion.Collapse eventKey="1">
                                    <NavItemBody>
                                        <li>
                                            <NavLink to="/" activeClassName="isActive">
                                                Importar Base de Dados
                                            </NavLink>
                                        </li>
                                    </NavItemBody>
                                </Accordion.Collapse>
                            </NavItem>

                            <NavItem>
                                <AccordionButton onClick={() => changeAccordionKey("2")} icon={IconAlunos} name="Alunos" isActive={activeKey === "2"} />
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
                                <AccordionButton onClick={() => changeAccordionKey("3")} icon={IconEscolas} name="Escolas" isActive={activeKey === "3"} />
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
                                                Gerenciar
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
                                <AccordionButton onClick={() => changeAccordionKey("4")} icon={IconMotoristas} name="Motoristas" isActive={activeKey === "4"} />
                                <Accordion.Collapse eventKey="4">
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
                                    </NavItemBody>
                                </Accordion.Collapse>
                            </NavItem>

                            <NavItem>
                                <AccordionButton onClick={() => changeAccordionKey("5")} icon={IconFrotas} name="Frotas" isActive={activeKey === "5"} />
                                <Accordion.Collapse eventKey="5">
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
                                                Gerenciar
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/" exact activeClassName="isActive">
                                                Ordens de Serviço
                                            </NavLink>
                                        </li>
                                    </NavItemBody>
                                </Accordion.Collapse>
                            </NavItem>

                            <NavItem>
                                <AccordionButton
                                    onClick={() => changeAccordionKey("6")}
                                    icon={IconFornecedores}
                                    name="Fornecedores"
                                    isActive={activeKey === "6"}
                                />
                                <Accordion.Collapse eventKey="6">
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
                                    </NavItemBody>
                                </Accordion.Collapse>
                            </NavItem>

                            <NavItem>
                                <AccordionButton onClick={() => changeAccordionKey("7")} icon={IconRotas} name="Rotas" isActive={activeKey === "7"} />
                                <Accordion.Collapse eventKey="7">
                                    <NavItemBody>
                                        <li>
                                            <NavLink to="/" activeClassName="isActive">
                                                Cadastrar
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/" exact activeClassName="isActive">
                                                Desenhar
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/" exact activeClassName="isActive">
                                                Gerenciar
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
                                <AccordionButton onClick={() => changeAccordionKey("8")} icon={IconRelatorios} name="Relatórios" isActive={activeKey === "8"} />
                                <Accordion.Collapse eventKey="8">
                                    <NavItemBody>
                                        <li>
                                            <NavLink to="/" activeClassName="isActive">
                                                Alunos
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/" exact activeClassName="isActive">
                                                Escolas
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/" exact activeClassName="isActive">
                                                Frota
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/" exact activeClassName="isActive">
                                                Rotas
                                            </NavLink>
                                        </li>
                                    </NavItemBody>
                                </Accordion.Collapse>
                            </NavItem>
                        </Accordion>
                    </nav>
                </NavContainer>
                <Section>
                    <ChildrenContainer>{children}</ChildrenContainer>
                    <Footer thinBorder />
                </Section>
            </Container>
        </>
    );
};

export default SidebarLayout;
