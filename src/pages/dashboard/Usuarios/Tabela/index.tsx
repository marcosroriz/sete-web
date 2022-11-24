import React from "react";
import { useAuth } from "contexts/Auth";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useAdminsTable } from "tables/AdminTable/context";
import { useReactHookNavCard } from "contexts/ReactHookNavCard";

import SeteTable from "components/micro/SeteTable";
import ButtonsContainer from "components/micro/Buttons/ButtonsContainer";

import { Container } from "./styles";

const Usuarios: React.FC = () => {
    const { user } = useAuth();
    const codigo_cidade = user?.codigo_cidade || 0;
    const { tableData, columns, handleSelectedData, handleDeleteSelectedAdmins } = useAdminsTable();
    return (
        <Container>
            <SeteTable columns={columns} name="Usuários habilitados para acesso neste município" data={tableData} onSelectedDataChange={handleSelectedData} />
            <ButtonsContainer containerClassName="btn-group">
                <Button variant="danger" className="btn-fill" onClick={handleDeleteSelectedAdmins}>
                    Remover Usuários
                </Button>
                <Link to={`/usuarios/editar/${codigo_cidade}`}>
                    <Button variant="add" className="btn-fill btn-info">
                        Adicionar Usuários
                    </Button>
                </Link>
            </ButtonsContainer>
        </Container>
    );
};

export default Usuarios;
