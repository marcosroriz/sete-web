import { Permission } from "./Permission";

interface User {
    id_usuario?: number;
    nome?: string;
    cpf?: string;
    telefone?: string;
    email?: string;
    password?: string;
    tipo_permissao?: Permission;
    cidade?: string;
    codigo_cidade?: number;
    estado?: string;
    foto?: string;
}

interface UsersTableField {
    nome: string;
    cpf: string;
    email: string;
    papel: Permission;
}

interface UserListObj {
    id_usuario: number;
    nome: string;
    cpf: string;
    telefone: string;
    email: string;
    password: string;
    tipo_permissao: Permission;
    cidade: string;
    codigo_cidade: number;
    estado: string;
    foto: string;
}

export type { User, UsersTableField, UserListObj };
