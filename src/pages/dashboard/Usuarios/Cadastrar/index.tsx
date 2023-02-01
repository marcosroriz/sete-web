import React from "react";
import { FaLock } from "react-icons/fa";

import { NavCardProvider, NavCardTab } from "contexts/NavCard";
import { useAlertModal } from "hooks/AlertModal";
import { useError } from "hooks/Errors";
import { UsuariosService } from "services/Usuarios";
import { User } from "entities/User";

import PageTitle from "components/micro/PageTitle";
import DadosBasicos from "./DadosBasicos";

import UsuarioCadastroIcon from "assets/icons/usuarios/usuario-cadastro.svg";

const Cadastrar: React.FC = () => {
    const { createModal, clearModal } = useAlertModal();
    const { errorHandler } = useError();
    const [userData, setUserData] = React.useState<User | null>(null);

    React.useEffect(() => {
        const fetchUserData = async () => {
            try {
                createModal();
                const usuarioService = new UsuariosService();
                const userInfo = await usuarioService.getUserInfo();
                if (userInfo) {
                    setUserData(userInfo.data);
                    if (!userInfo.result) throw { ...userInfo };
                }
                clearModal();
            } catch (err) {
                errorHandler(err, { title: "Falha ao carregar informações do Usuário" });
            }
        };
        fetchUserData();
    }, []);

    return (
        <>
            <PageTitle message="Cadastrar Usuário" icon={UsuarioCadastroIcon} />
            <NavCardProvider
                aditionalData={{
                    userData: [userData, setUserData],
                }}
            >
                <NavCardTab name="Dados Básicos" icon={<FaLock color="#464a56" />}>
                    <DadosBasicos />
                </NavCardTab>
            </NavCardProvider>
        </>
    );
};

export default Cadastrar;
