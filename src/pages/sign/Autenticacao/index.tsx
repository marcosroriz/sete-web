import React from "react";

import { NavCardProvider } from "hooks/NavCardContext";

import { FaSignInAlt, FaQuestionCircle, FaRegRegistered } from "react-icons/fa";

const NavCardTabs = [
    {
        name: "Login",
        component: <div>Olá Login</div>,
        icon: <FaSignInAlt />,
    },
    {
        name: "Recuperar Senha",
        component: <div>Olá Recuperar</div>,
        icon: <FaQuestionCircle />,
    },
    {
        name: "Registrar",
        component: <div>Olá Registrar</div>,
        icon: <FaRegRegistered />,
    },
    {
        name: "Proxy",
        component: <div>Olá Proxy</div>,
        icon: <FaRegRegistered />,
    },
];
export type NavCardTabNames = "Login" | "Recuperar Senha" | "Registrar";

const Autenticacao: React.FC = () => {
    return <NavCardProvider tabs={NavCardTabs} />;
};

export default Autenticacao;
