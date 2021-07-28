import React from "react";
import { FaSignInAlt, FaQuestionCircle, FaRegRegistered } from "react-icons/fa";

import { NavCardProvider, NavCardTab } from "hooks/NavCardContext";

import Login from "./Login";
import RecuperarSenha from "./RecuperarSenha";
import Registrar from "./Registrar";

const Autenticacao: React.FC = () => {
    return (
        <NavCardProvider>
            <NavCardTab name="Login" icon={<FaSignInAlt />}>
                <Login />
            </NavCardTab>

            <NavCardTab name="Reacuperar Senha" icon={<FaQuestionCircle />}>
                <RecuperarSenha />
            </NavCardTab>

            <NavCardTab name="Registrar" icon={<FaRegRegistered />}>
                <Registrar />
            </NavCardTab>
        </NavCardProvider>
    );
};

export default Autenticacao;
