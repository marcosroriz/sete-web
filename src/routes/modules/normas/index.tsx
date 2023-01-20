import React from "react";

import AuthRoute from "routes/AuthRoute";

import Cadastrar from "pages/modules/normas/Cadastrar";
import Gerenciar from "pages/modules/normas/Gerenciar";

export default [
    <AuthRoute path="/normas/cadastrar" component={Cadastrar} permission="reader" key="cadastrar" isPrivate exact />,
    <AuthRoute path="/normas/gerenciar" component={Gerenciar} permission="reader" key="gerenciar/gerenciar" isPrivate exact />,
    <AuthRoute path="/normas/gerenciar/editar/:id" component={Cadastrar} permission="reader" key="gerenciar/editar/:id" isPrivate exact />,
];
