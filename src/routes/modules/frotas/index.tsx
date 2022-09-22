import React from "react";

import AuthRoute from "routes/AuthRoute";

import Cadastrar from "pages/modules/frotas/Cadastrar";
import Gerenciar from "pages/modules/frotas/Gerenciar";
import Visualizar from "pages/modules/frotas/Visualizar";
import Garagem from "pages/modules/frotas/Garagem";

export default [
    <AuthRoute path="/frotas/cadastrar" component={Cadastrar} permission="reader" key="cadastrar" isPrivate exact />,
    <AuthRoute path="/frotas/gerenciar/editar/:id" component={Cadastrar} permission="reader" key="gerenciar/editar/:id" isPrivate exact />,
    <AuthRoute path="/frotas/gerenciar/visualizar/:id" component={Visualizar} permission="reader" key="/gerenciar/visualizar/:id" isPrivate exact />,
    <AuthRoute path="/frotas/gerenciar" component={Gerenciar} permission="reader" key="gerenciar" isPrivate exact />,
    <AuthRoute path="/frotas/garagem" component={Garagem} permission="reader" key="garagem" isPrivate exact />,
];
