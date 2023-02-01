import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import md5 from "md5";

import { useNavCard } from "contexts/NavCard";
import { User } from "entities/User";
import { FileData } from "entities/FileData";
import { useError } from "hooks/Errors";
import { useAlertModal } from "hooks/AlertModal";
import { UsuariosService } from "services/Usuarios";

import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookInputNumberFormat from "components/micro/Inputs/ReactHookInputNumberFormat";
import ReactHookInputProfilePic from "components/micro/Inputs/ReactHookInputProfilePic";

import ModalPassword from "./ModalPassword";

import { Container, Form } from "./styles";

type UserData = [User | null, React.Dispatch<React.SetStateAction<User | null>>];

type FormValues = {
    foto: FileData;
    nome: string;
    telefone: string;
};

const DadosBasicos: React.FC = () => {
    const { createModal } = useAlertModal();
    const { errorHandler } = useError();
    const { aditionalData } = useNavCard();
    const [userData] = aditionalData?.userData as UserData;
    const [showModal, setShowModal] = React.useState(false);
    const methods = useForm<FormValues>();

    const handleFormSubmit = async (data: FormValues) => {
        try {
            if (!data.foto.file) {
                return;
            }
            createModal();
            const userId = userData?.id_usuario || 0;
            const codigo_cidade = userData?.codigo_cidade || 0;
            const usuariosService = new UsuariosService();

            const profileData = new FormData();
            profileData.set("picture", data.foto.file);
            await usuariosService.updateUserPicture(profileData, userId, codigo_cidade);
            createModal("success", { title: "Sucesso!", text: "Foto atualizada com sucesso" });
        } catch (err) {
            errorHandler(err, { title: "Erro ao atualizar imagem de perfil" });
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    React.useEffect(() => {
        if (userData) {
            const { setValue } = methods;
            const userFoto = {
                id: md5(userData?.foto || ""),
                url: userData?.foto || "",
            };
            setValue("foto", userFoto);
            setValue("nome", userData?.nome || "");
            setValue("telefone", userData?.telefone || "");
        }
    }, [userData]);

    return (
        <>
            <FormProvider {...methods}>
                <Form onSubmit={methods.handleSubmit(handleFormSubmit)}>
                    <Container>
                        <h2>
                            {userData?.cidade} - {userData?.estado}
                        </h2>
                        <ReactHookInputProfilePic name="foto" dimensions="200px" />
                        <div className="user-data">
                            <ReactHookInputText label="Nome:" name="nome" containerClassName="user-data-info" thinBorder isHorizontal />
                            <div className="user-data-info no-field">
                                <span className="user-data-label">CPF:</span>
                                <span className="user-data-value">{userData?.cpf}</span>
                            </div>
                            <ReactHookInputNumberFormat
                                label="Telefone:"
                                name="telefone"
                                format={["(##) ####-#####", "(##) #####-####"]}
                                containerClassName="user-data-info"
                                thinBorder
                                isHorizontal
                            />
                            <div className="user-data-info no-field">
                                <span className="user-data-label">Email:</span>
                                <span className="user-data-value">{userData?.email}</span>
                            </div>
                            <button className="user-data-password" type="button" onClick={handleOpenModal}>
                                Alterar Senha
                            </button>
                            <Button variant="warning" className="btn-fill" type="submit">
                                Salvar
                            </Button>
                        </div>
                    </Container>
                </Form>
            </FormProvider>
            <ModalPassword showModal={showModal} handleCloseModal={handleCloseModal} />
        </>
    );
};

export default DadosBasicos;
