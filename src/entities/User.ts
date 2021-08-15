import { Permission } from "./Permission";

interface User {
    nome?: string;
    cpf?: string;
    telefone?: string;
    email?: string;
    password?: string;
    tipo_permissao?: Permission;
}

export type { User };
