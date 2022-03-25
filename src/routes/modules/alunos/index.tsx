import React from "react";

import AuthRoute from "routes/AuthRoute";

import Cadastrar from "pages/modules/alunos/Cadastrar";
import Visualizar from "pages/modules/alunos/Visualizar";
import Gerenciar from "pages/modules/alunos/Gerenciar";
import Importar from "pages/modules/alunos/Importar";

export default [
    <AuthRoute path="/alunos/cadastrar" component={Cadastrar} permission="reader" key="cadastrar" isPrivate exact />,
    <AuthRoute path="/alunos/gerenciar" component={Gerenciar} permission="reader" key="gerenciar" isPrivate exact />,
    <AuthRoute path="/alunos/gerenciar/editar/:id" component={Cadastrar} permission="reader" key="gerenciar/editar/:id" isPrivate exact />,
    <AuthRoute path="/alunos/gerenciar/visualizar/:id" component={Visualizar} permission="reader" key="gerenciar/visualizar/:id" isPrivate exact />,
    <AuthRoute path="/alunos/importar" component={Importar} permission="reader" key="/alunos/importar" isPrivate exact />,
];
