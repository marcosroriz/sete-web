import React from "react";
import { Link } from "react-router-dom";

import { FaEdit, FaRegTimesCircle } from "react-icons/fa";

import { AdminListObj, AdminTableField } from "entities/Admins";

type AdditionalOptions = {
    delete: (administrador: AdminListObj) => Promise<void>;
};

class AdminsTableHelper {
    public treatData(data: AdminListObj[], addOptions?: AdditionalOptions): AdminTableField[] {
        return data.map((adminObj) => ({
            id_admin: adminObj.id_admin,
            nome: adminObj.nome,
            cpf: adminObj.cpf,
            email: adminObj.email,
            telefone: adminObj.telefone,
            papel_usuario: adminObj.papel_usuario,
            senha: adminObj.senha,
            acoes: this.acoesComponent(adminObj, addOptions),
        }));
    }

    public acoesComponent(adminObj: AdminListObj, addOptions?: AdditionalOptions) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Link
                    to={`/usuarios/editar/${adminObj.id_admin}`}
                    style={{
                        display: "block",
                        marginBottom: "-2px",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                    }}
                >
                    <FaEdit size={"18px"} color={"orange"} />
                </Link>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        addOptions?.delete(adminObj);
                    }}
                    style={{
                        border: "none",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                    }}
                >
                    <FaRegTimesCircle size={"18px"} color={"red"} />
                </button>
            </div>
        );
    }

    public treatDataAdminsAtendidos(data: any[]): any[] {
        return data.map((adminObj) => ({
            id_admin: adminObj.id_admin,
            nome: adminObj.nome,
            cpf: adminObj.cpf,
            telefone: adminObj.telefone,
        }));
    }
}

const adminsTableHelper = new AdminsTableHelper();

export { adminsTableHelper, AdminsTableHelper };
