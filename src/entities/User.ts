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

export type { User };
