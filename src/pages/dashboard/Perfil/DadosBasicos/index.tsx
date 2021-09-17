import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "react-bootstrap";

import { useNavCard } from "contexts/NavCard";
import { User } from "entities/User";
import { FileData } from "entities/FileData";

import ReactHookInputText from "components/micro/Inputs/ReactHookInputText";
import ReactHookInputNumberFormat from "components/micro/Inputs/ReactHookInputNumberFormat";
import ReactHookInputProfilePic from "components/micro/Inputs/ReactHookInputProfilePic";

import ModalPassword from "./ModalPassword";

import { Container, Form } from "./styles";

type UserData = [User | null, React.Dispatch<React.SetStateAction<User | null>>];

type FormValues = {
    profile: FileData;
    nome: string;
    telefone: string;
};

const DadosBasicos: React.FC = () => {
    const { aditionalData } = useNavCard();
    const [userData] = aditionalData?.userData as UserData;
    const [showModal, setShowModal] = React.useState(false);
    const methods = useForm<FormValues>();

    const handleFormSubmit = async (data: FormValues) => {
        console.log(data);
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
            const userEntriesArr = Object.entries(userData);
            userEntriesArr.forEach(([key, value]) => {
                setValue(key as keyof FormValues, value);
            });
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
                        <ReactHookInputProfilePic name="profile" dimensions="200px" />
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
                            <Button variant="warning" className="btn-fill" type="password">
                                Salvar Alterações
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
