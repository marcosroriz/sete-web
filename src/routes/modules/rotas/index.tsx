import React from "react";

import AuthRoute from "routes/AuthRoute";

import Cadastrar from "pages/modules/rotas/Cadastrar";
import Gerencidar from "pages/modules/rotas/Gerenciar";

export default [
    <AuthRoute path="/rotas/cadastrar" component={Cadastrar} permission="reader" key="cadastrar" isPrivate exact />,
    <AuthRoute path="/rotas/gerenciar" component={Gerencidar} permission="reader" key="gerenciar/gerenciar" isPrivate exact />,
];
