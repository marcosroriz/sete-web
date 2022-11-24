import React from "react";
import { useParams } from "react-router-dom";

import { useAlertModal } from "hooks/AlertModal";
import { useError } from "hooks/Errors";

import { useAuth } from "contexts/Auth";
import { ReactHookNavCardProvider } from "contexts/ReactHookNavCard";

import { AdminsService } from "services/Admins";
import { Admin } from "entities/Admins";

import IconUsuarios from "assets/icons/alunos/alunos-cadastro.svg";

import PageTitle from "components/micro/PageTitle";
import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookFormItemCard from "components/micro/Cards/ReactHookFormItemCard";

import { Container, mediaQuery } from "./styles";

type FormData = {
    id_admin: string;
    email: string;
    nome: string;
    sexo: number;
    telefone: string;
    cpf: string;
    senha: string;
    papel_usuario: string;
};

const formData = {
    id_admin: "",
    email: "",
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
                sexo: data.sexo,
                email: data.email,
                telefone: data.telefone,
                cpf: data.cpf,
                senha: data.senha,
                papel_usuario: data.papel_usuario,
            };

            if (!!adminId) {
                const response = await adminsService.updateAdmin(body, Number(adminId), codigo_cidade);
                if (!response.result) {
                    throw { ...response };
                }
                createModal("success", { title: "Sucesso", html: "Usuário editado com sucesso" });
            } else {
                const response = await adminsService.createAdmin(body, codigo_cidade);

                if (!response.result) {
                    throw { ...response };
                }
                createModal("success", { title: "Sucesso", html: "Usuário cadastrado com sucesso" });
            }
        } catch (err) {
            if (!!adminId) {
                errorHandler(err, { title: "Erro ao editar dados do usuário" });
            } else {
                errorHandler(err, { title: "Erro ao cadastrar usuário" });
            }
        }
    };

    return (
        <Container>
            <PageTitle message="Cadastro de Usuário" icon={IconUsuarios} />
            <ReactHookNavCardProvider<FormData>
                mode="onSubmit"
                defaultValues={formData as unknown as FormData}
                reValidateMode="onChange"
                onSubmit={handleSubmit}
            >
                <ReactHookFormItemCard>
                    <ReactHookInputText
                        label="TÍTULO DA NORMA: *"
                        name="titulo_norma"
                        placeholder="Exemplo: RESOLUÇÃO ABC de 20XX"
                        isHorizontal={mediaQuery.desktop}
                    />
                </ReactHookFormItemCard>
            </ReactHookNavCardProvider>
        </Container>
    );
};

export default Cadastrar;
