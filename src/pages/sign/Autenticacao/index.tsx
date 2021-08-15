import React from "react";
import { FaSignInAlt, FaQuestionCircle, FaRegRegistered } from "react-icons/fa";

import { NavCardProvider, NavCardTab } from "contexts/NavCard";

import Login from "./Login";
import RecuperarSenha from "./RecuperarSenha";
import Registrar from "./Registrar";

const Autenticacao: React.FC = () => {
    return (
        <NavCardProvider>
            <NavCardTab name="Login" icon={<FaSignInAlt />}>
                <Login />
            </NavCardTab>

            <NavCardTab name="Recuperar Senha" icon={<FaQuestionCircle />}>
                <RecuperarSenha />
            </NavCardTab>

            <NavCardTab name="Registrar" icon={<FaRegRegistered />}>
                <Registrar />
            </NavCardTab>
        </NavCardProvider>
    );
};

export default Autenticacao;
