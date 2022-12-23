import { parseNode } from "ol/xml";

interface Admin {
    id_admin?: string;
    nome: string;
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
    nome: string;
    email: string;
    telefone: string;
    papel_usuario: string;
    senha: string;
}

enum PapeisUsuariosEnum {
    Administrador = 0,
    Editor = 1,
    Leitor = 2,
}
const PapeisUsuariosLabel = new Map<PapeisUsuariosEnum, string>([
    [PapeisUsuariosEnum.Administrador, "Administrador (realiza qualquer operação)"],
    [PapeisUsuariosEnum.Editor, "Editor (pode ler, inserir, remover e atualizar dados)"],
    [PapeisUsuariosEnum.Leitor, "Leitor (apenas visualiza dados)"],
]);

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

export { PapeisUsuariosEnum, PapeisUsuariosLabel };
export type { Admin, AdminListObj, AdminTableField, AdminList };
