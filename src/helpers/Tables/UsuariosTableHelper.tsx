import React from "react";

import { UserListObj, UsersTableField } from "entities/User";
import { Link } from "react-router-dom";
import { FaEdit, FaRegTimesCircle, FaSearch, FaUserAlt } from "react-icons/fa";

type AdditionalOptions = {
    delete: (usuario: UserListObj) => Promise<void>;
};

const papelMap = {
    1: "Administrador",
    2: "Editor",
    3: "Leitor",
};

class UsuariosTableHelper {
    public treatData(data: UserListObj[], addOptions?: AdditionalOptions): UsersTableField[] {
        return data.map((usuarioObj) => ({
            nome: usuarioObj.nome,
            cpf: usuarioObj.cpf,
            email: usuarioObj.email,
            papel: papelMap[usuarioObj.tipo_permissao],
            acoes: this.acoesComponent(usuarioObj, addOptions),
        }));
    }

    public acoesComponent(usuarioObj: UserListObj, addOptions?: AdditionalOptions) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Link
                    to={`/usuarios/gerenciar/visualizar/${usuarioObj.id_usuario}`}
                    style={{
                        display: "block",
                        marginBottom: "-2px",
                        border: "none",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                    }}
                >
                    <FaSearch size={"16px"} color={"gray"} />
                </Link>
                <Link
                    to={`/usuarios/gerenciar/editar/${usuarioObj.id_usuario}`}
                    style={{
                        display: "block",
                        marginLeft: "6px",
                        border: "none",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                    }}
                >
                    <FaEdit size={"18px"} color={"orange"} />
                </Link>
                <button
                    style={{
                        border: "none",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                    }}
                    onClick={() => addOptions?.delete(usuarioObj)}
                >
                    <FaRegTimesCircle size={"17px"} color={"red"} />
                </button>
            </div>
        );
    }
}

const usuariosTableHelper = new UsuariosTableHelper();

export { usuariosTableHelper, UsuariosTableHelper };
