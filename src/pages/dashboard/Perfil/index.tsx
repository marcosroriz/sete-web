import React from "react";
import { FaUserCircle, FaLock } from "react-icons/fa";

import { NavCardProvider, NavCardTab } from "contexts/NavCard";

import DadosBasicos from "./DadosBasicos";
import DadosAcesso from "./DadosAcesso";

const Perfil: React.FC = () => {
    return (
        <>
            <NavCardProvider>
                <NavCardTab name="Dados Básicos" icon={<FaUserCircle color="#464a56" />}>
                    <DadosBasicos />
                </NavCardTab>
                <NavCardTab name="Dados de Acesso" icon={<FaLock color="#464a56" />}>
                    <DadosAcesso />
                </NavCardTab>
            </NavCardProvider>
        </>
    );
};

export default Perfil;
