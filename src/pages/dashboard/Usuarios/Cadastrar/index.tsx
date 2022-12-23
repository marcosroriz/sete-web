import React from "react";
import { useParams } from "react-router-dom";

import { useAlertModal } from "hooks/AlertModal";
import { useError } from "hooks/Errors";

import { useAuth } from "contexts/Auth";
import { ReactHookNavCardProvider, ReactHookNavCardTab } from "contexts/ReactHookNavCard";
import { dadosUsuarioSchema } from "forms/AdminsForm";

import { AdminsService } from "services/Admins";
import { Admin } from "entities/Admins";
import Usuario from "./Usuario";

import IconUsuarios from "assets/icons/alunos/alunos-cadastro.svg";

import PageTitle from "components/micro/PageTitle";

type FormData = {
    id_admin: string;
    email: string;
    nome: string;
    telefone: string;
    cpf: string;
    senha: string;
    papel_usuario: string;
};

const formData = {
    id_admin: "",
    email: "",
    nome: "",
    telefone: "",
    cpf: "",
    senha: "",
    papel_usuario: "",
};

const Cadastrar: React.FC = () => {
    const { id: adminId } = useParams<{ id: string }>();
    const { user } = useAuth();
    const { errorHandler } = useError();
    const { createModal, clearModal } = useAlertModal();

    const [adminData, setAdminData] = React.useState<Admin | null>(null);

    const handleSubmit = async (data: FormData) => {
        try {
            createModal();
            const adminsService = new AdminsService();
            const codigo_cidade = user?.codigo_cidade || 0;

            const body = {
                id_admin: data.id_admin,
                nome: data.nome,
                email: data.email,
                telefone: data.telefone,
                cpf: data.cpf,
                senha: data.senha,
                papel_usuario: data.papel_usuario,
            };
            if (!!adminId) {
                const adminsResponse = await adminsService.updateAdmin(body, adminId, codigo_cidade);
                if (!adminsResponse.result) {
                    throw { ...adminsResponse };
                }
                createModal("success", { title: "Sucesso", html: "Usuário editado com sucesso" });
            } else {
                const adminsResponse = await adminsService.createAdmin(body, codigo_cidade);
                if (!adminsResponse.result) {
                    throw { ...adminsResponse };
                }
                createModal("success", { title: "Sucesso", html: "Usuário cadastrado com sucesso" });
            }
        } catch (err) {
            errorHandler(err, { title: "Erro ao cadastrar usuário" });
        }
    };

    return (
        <>
            <PageTitle message="Cadastro de Usuário" icon={IconUsuarios} />
            <ReactHookNavCardProvider<FormData>
                mode="onSubmit"
                defaultValues={formData as FormData}
                reValidateMode="onChange"
                onSubmit={handleSubmit}
                aditionalData={{
                    adminData: [adminData, setAdminData],
                }}
            >
                <ReactHookNavCardTab name="" icon="" validationSchema={dadosUsuarioSchema}>
                    <Usuario />
                </ReactHookNavCardTab>
            </ReactHookNavCardProvider>
        </>
    );
};

export default Cadastrar;
