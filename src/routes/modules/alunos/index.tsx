import React from "react";

import AuthRoute from "routes/AuthRoute";

import Cadastro from "pages/modules/alunos/Cadastro";
import Edicao from "pages/modules/alunos/Edicao";

export default [
    <AuthRoute path="/alunos/cadastrar" component={Cadastro} permission="reader" key="cadastrar" isPrivate exact />,
    <AuthRoute path="/alunos/gerenciar/:id" component={Edicao} permission="reader" key="gerenciar/:id" isPrivate exact />,
];
