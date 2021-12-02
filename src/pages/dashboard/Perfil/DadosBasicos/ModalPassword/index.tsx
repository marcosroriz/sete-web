import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import md5 from "md5";

import { useAlertModal } from "hooks/AlertModal";
import { useError } from "hooks/Errors";
import { useAuth } from "contexts/Auth";
import { UsuariosService } from "services/Usuarios";
import { updatePasswordSchema } from "validators/dashboard/user";

import ReactHookInputPassword from "components/micro/Inputs/ReactHookInputPassword";

import { Form } from "./styles";

type FormValues = {
    senha_atual: string;
    nova_senha: string;
};

type ModalPasswordProps = {
    showModal: boolean;
    handleCloseModal(): void;
};

const ModalPassword: React.FC<ModalPasswordProps> = ({ showModal, handleCloseModal }) => {
    const { user } = useAuth();
    const { createModal } = useAlertModal();
    const { errorHandler } = useError();
    const methods = useForm<FormValues>({
        resolver: yupResolver(updatePasswordSchema),
    });

    const handleFormSubmit = async (data: FormValues) => {
        try {
            createModal();
            const usuariosService = new UsuariosService();
            const id_usuario = user?.id_usuario || 0;
            const codigo_cidade = user?.codigo_cidade || 0;
            const body = {
                id_usuario: id_usuario,
                senha_atual: md5(data.senha_atual),
                nova_senha: md5(data.nova_senha),
            };
            const passwordResponse = await usuariosService.updateUserPassword(body, codigo_cidade);
            createModal("success", { title: "Sucesso", text: passwordResponse.messages });
            methods.reset();
            handleCloseModal();
        } catch (err) {
            errorHandler(err, { title: "Erro ao modificar senha" });
        }
    };

    return (
        <Modal show={showModal} onHide={handleCloseModal} dialogClassName="modal-md">
            <FormProvider {...methods}>
                <Form onSubmit={methods.handleSubmit(handleFormSubmit)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Alterar Senha</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ReactHookInputPassword label="Senha Atual" name="senha_atual" placeholder="Digitar Senha Atual" thinBorder />
                        <ReactHookInputPassword label="Nova Senha" name="nova_senha" placeholder="Digitar Nova Senha" thinBorder />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" className="btn-fill" type="button" onClick={handleCloseModal}>
                            Fechar
                        </Button>
                        <Button variant="primary" className="btn-fill" type="submit">
                            Alterar Senha
                        </Button>
                    </Modal.Footer>
                </Form>
            </FormProvider>
        </Modal>
    );
};

export default ModalPassword;
