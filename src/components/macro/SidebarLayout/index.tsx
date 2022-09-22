/**
 * Template do Sidebar para a navegação dentro do SETE
 */

import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import { FaAddressBook, FaUsers, FaSignOutAlt } from "react-icons/fa";
import { Spin as Hamburger } from "hamburger-react";

import { SidebarItemKeys } from "entities/SidebarItemKeys";
import { useMediaQuery } from "hooks/MediaQuery";
import { useAuth } from "contexts/Auth";
import { useSidebarAccordion } from "contexts/SidebarAccordion";

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
    const { user, signOut } = useAuth();
    const { activeAccordionKey, changeAccordionKey } = useSidebarAccordion();
    const matches = useMediaQuery(mediaQuery.desktop);
    const [menuIsOpened, setMenuIsOpened] = React.useState<boolean>(false);

    const logout = React.useCallback(async () => {
        await signOut();
    }, [signOut]);

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
                            <Link to="/">
                                <img src={LogoSete} alt="Sistema Eletrônico de Gestão do Transporte Escolar" />
                            </Link>
                        </div>
                        <Accordion activeKey={activeAccordionKey} className="nav-items">
                            <NavItem isProfile>
                                <AccordionButton
                                    onClick={() => changeAccordionKey(SidebarItemKeys.perfil)}
                                    icon={user?.foto || IconPerfil}
                                    name={user?.nome || ""}
                                    isActive={activeAccordionKey === SidebarItemKeys.perfil}
                                    isProfile
                                />
                                <Accordion.Collapse eventKey={SidebarItemKeys.perfil}>
                                    <NavItemBody isProfile>
                                        <li>
                                            <NavLink to="/perfil" activeClassName="isActive" exact>
                                                <FaAddressBook size={17} />
                                                Meu Perfil
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/usuarios" activeClassName="isActive" exact>
                                                <FaUsers size={17} />
                                                Outros Usuários
                                            </NavLink>
                                        </li>
                                        <li>
                                            <Link to="/login" onClick={logout}>
                                                <FaSignOutAlt size={17} />
                                                Sair
                                            </Link>
                                        </li>
                                    </NavItemBody>
                                </Accordion.Collapse>
                            </NavItem>

                            <NavItem>
                                <AccordionButton
                                    onClick={() => changeAccordionKey(SidebarItemKeys.censo)}
                                    icon={IconSenso}
                                    name="Censo Escolar"
                                    isActive={activeAccordionKey === SidebarItemKeys.censo}
                                />
                                <Accordion.Collapse eventKey={SidebarItemKeys.censo}>
                                    <NavItemBody>
                                        <li>
                                            <NavLink to="/censo" activeClassName="isActive" exact>
                                                Importar Base de Dados
                                            </NavLink>
                                        </li>
                                    </NavItemBody>
                                </Accordion.Collapse>
                            </NavItem>

                            <NavItem>
                                <AccordionButton
                                    onClick={() => changeAccordionKey(SidebarItemKeys.alunos)}
                                    icon={IconAlunos}
                                    name="Alunos"
                                    isActive={activeAccordionKey === SidebarItemKeys.alunos}
                                />
                                <Accordion.Collapse eventKey={SidebarItemKeys.alunos}>
                                    <NavItemBody>
                                        <li>
                                            <NavLink to="/alunos/cadastrar" activeClassName="isActive" exact>
                                                Cadastrar
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/alunos/gerenciar" activeClassName="isActive">
                                                Gerenciar
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/alunos/importar" activeClassName="isActive" exact>
                                                Importar de Planilha Eletrônica
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/alunos/visualizar" activeClassName="isActive" exact>
                                                Visualizar
                                            </NavLink>
                                        </li>
                                    </NavItemBody>
                                </Accordion.Collapse>
                            </NavItem>

                            <NavItem>
                                <AccordionButton
                                    onClick={() => changeAccordionKey(SidebarItemKeys.escolas)}
                                    icon={IconEscolas}
                                    name="Escolas"
                                    isActive={activeAccordionKey === SidebarItemKeys.escolas}
                                />
                                <Accordion.Collapse eventKey={SidebarItemKeys.escolas}>
                                    <NavItemBody>
                                        <li>
                                            <NavLink to="/escolas/cadastrar" activeClassName="isActive" exact>
                                                Cadastrar
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/escolas/gerenciar" activeClassName="isActive">
                                                Gerenciar
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/escolas/visualizar" activeClassName="isActive" exact>
                                                Visualizar
                                            </NavLink>
                                        </li>
                                    </NavItemBody>
                                </Accordion.Collapse>
                            </NavItem>

                            <NavItem>
                                <AccordionButton
                                    onClick={() => changeAccordionKey(SidebarItemKeys.motoristas)}
                                    icon={IconMotoristas}
                                    name="Motoristas"
                                    isActive={activeAccordionKey === SidebarItemKeys.motoristas}
                                />
                                <Accordion.Collapse eventKey={SidebarItemKeys.motoristas}>
                                    <NavItemBody>
                                        <li>
                                            <NavLink to="/motoristas/cadastrar" activeClassName="isActive" exact>
                                                Cadastrar
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/motoristas/gerenciar" activeClassName="isActive">
                                                Gerenciar
                                            </NavLink>
                                        </li>
                                    </NavItemBody>
                                </Accordion.Collapse>
                            </NavItem>

                            <NavItem>
                                <AccordionButton
                                    onClick={() => changeAccordionKey(SidebarItemKeys.monitores)}
                                    icon={IconMotoristas}
                                    name="Monitores"
                                    isActive={activeAccordionKey === SidebarItemKeys.monitores}
                                />
                                <Accordion.Collapse eventKey={SidebarItemKeys.monitores}>
                                    <NavItemBody>
                                        <li>
                                            <NavLink to="/monitores/cadastrar" activeClassName="isActive" exact>
                                                Cadastrar
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/monitores/gerenciar" activeClassName="isActive">
                                                Gerenciar
                                            </NavLink>
                                        </li>
                                    </NavItemBody>
                                </Accordion.Collapse>
                            </NavItem>

                            <NavItem>
                                <AccordionButton
                                    onClick={() => changeAccordionKey(SidebarItemKeys.frotas)}
                                    icon={IconFrotas}
                                    name="Frotas"
                                    isActive={activeAccordionKey === SidebarItemKeys.frotas}
                                />
                                <Accordion.Collapse eventKey={SidebarItemKeys.frotas}>
                                    <NavItemBody>
                                        <li>
                                            <NavLink to="/frotas/cadastrar" activeClassName="isActive" exact>
                                                Cadastrar
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/frotas/garagem" activeClassName="isActive" exact>
                                                Garagem
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/frotas/gerenciar" activeClassName="isActive">
                                                Gerenciar
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/frotas/servico" activeClassName="isActive" exact>
                                                Ordens de Serviço
                                            </NavLink>
                                        </li>
                                    </NavItemBody>
                                </Accordion.Collapse>
                            </NavItem>

                            <NavItem>
                                <AccordionButton
                                    onClick={() => changeAccordionKey(SidebarItemKeys.fornecedores)}
                                    icon={IconFornecedores}
                                    name="Fornecedores"
                                    isActive={activeAccordionKey === SidebarItemKeys.fornecedores}
                                />
                                <Accordion.Collapse eventKey={SidebarItemKeys.fornecedores}>
                                    <NavItemBody>
                                        <li>
                                            <NavLink to="/fornecedores/cadastrar" activeClassName="isActive" exact>
                                                Cadastrar
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/fornecedores/gerenciar" activeClassName="isActive">
                                                Gerenciar
                                            </NavLink>
                                        </li>
                                    </NavItemBody>
                                </Accordion.Collapse>
                            </NavItem>

                            <NavItem>
                                <AccordionButton
                                    onClick={() => changeAccordionKey(SidebarItemKeys.rotas)}
                                    icon={IconRotas}
                                    name="Rotas"
                                    isActive={activeAccordionKey === SidebarItemKeys.rotas}
                                />
                                <Accordion.Collapse eventKey={SidebarItemKeys.rotas}>
                                    <NavItemBody>
                                        <li>
                                            <NavLink to="/rotas/cadastrar" activeClassName="isActive" exact>
                                                Cadastrar
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/rotas/desenhar" activeClassName="isActive" exact>
                                                Desenhar
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/rotas/gerenciar" activeClassName="isActive" exact>
                                                Gerenciar
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/rotas/importar" activeClassName="isActive" exact>
                                                Importar
                                            </NavLink>
                                        </li>
                                    </NavItemBody>
                                </Accordion.Collapse>
                            </NavItem>

                            <NavItem>
                                <AccordionButton
                                    onClick={() => changeAccordionKey(SidebarItemKeys.relatorios)}
                                    icon={IconRelatorios}
                                    name="Relatórios"
                                    isActive={activeAccordionKey === SidebarItemKeys.relatorios}
                                />
                                <Accordion.Collapse eventKey={SidebarItemKeys.relatorios}>
                                    <NavItemBody>
                                        <li>
                                            <NavLink to="/relatorios/alunos" activeClassName="isActive" exact>
                                                Alunos
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/relatorios/escolas" activeClassName="isActive" exact>
                                                Escolas
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/relatorios/frotas" activeClassName="isActive" exact>
                                                Frotas
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/relatorios/rotas" activeClassName="isActive" exact>
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
