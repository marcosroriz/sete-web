import React from "react";

import AuthRoute from "routes/AuthRoute";

import Cadastrar from "pages/modules/motoristas/Cadastrar";
import Gerenciar from "pages/modules/motoristas/Gerenciar";

export default [
    <AuthRoute path="/motoristas/cadastrar" key="cadastrar" component={Cadastrar} permission="reader" isPrivate exact />,
    <AuthRoute path="/motoristas/gerenciar" key="gerenciar" component={Gerenciar} permission="reader" isPrivate exact />,
];
