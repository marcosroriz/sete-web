import React from "react";
import { FaSignInAlt, FaQuestionCircle, FaRegRegistered } from "react-icons/fa";

import { NavCardProvider } from "hooks/NavCardContext";

import Login from "./Login";
import RecuperarSenha from "./RecuperarSenha";
import Registrar from "./Registrar";

const NavCardTabs = [
    {
        name: "Login",
        component: <Login />,
        icon: <FaSignInAlt />,
    },
    {
        name: "Recuperar Senha",
        component: <RecuperarSenha />,
        icon: <FaQuestionCircle />,
    },
    {
        name: "Registrar",
        component: <Registrar />,
        icon: <FaRegRegistered />,
    },
];
export type NavCardTabNames = "Login" | "Recuperar Senha" | "Registrar" | "Proxy";

const Autenticacao: React.FC = () => {
    return <NavCardProvider tabs={NavCardTabs} />;
};

export default Autenticacao;
