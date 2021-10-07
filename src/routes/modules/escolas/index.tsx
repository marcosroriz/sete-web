import React from "react";

import AuthRoute from "routes/AuthRoute";

import Cadastro from "pages/modules/escolas/Cadastro";
import Edicao from "pages/modules/escolas/Edicao";
import Gerenciar from "pages/modules/escolas/Gerenciar";

export default [
    <AuthRoute path="/escolas/cadastrar" component={Cadastro} permission="reader" key="cadastrar" isPrivate exact />,
    <AuthRoute path="/escolas/gerenciar/" component={Gerenciar} permission="reader" key="gerenciar" isPrivate exact />,
    <AuthRoute path="/escolas/gerenciar/:id" component={Edicao} permission="reader" key="gerenciar/:id" isPrivate exact />,
];
