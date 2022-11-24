import { parseNode } from "ol/xml";

interface Admin {
    id_admin?: string;
    nome: string;
    sexo: number;
    email?: string;
    cpf?: string;
    id_escola?: number;
    telefone?: string;
    senha?: string;
    papel_usuario?: string;
    _links?: {
        _self?: string;
    };
    result?: boolean;
}

interface AdminListObj {
    id_admin: number;
    cpf: string;
    email: string;
    telefone: string;
    papel_usuario: string;
    senha: string;
}

interface AdminTableField {
    id_admin: number;
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
    papel_usuario: string;
    senha: string;
}

interface AdminList {
    label: string;
    value: string;
}

export type { Admin, AdminListObj, AdminTableField, AdminList };
