import React from "react";

import AuthRoute from "routes/AuthRoute";

import Cadastro from "pages/modules/frotas/Cadastro";
import Edicao from "pages/modules/frotas/Edicao";

export default [
    <AuthRoute path="/frotas/cadastrar" component={Cadastro} permission="reader" key="cadastrar" isPrivate exact />,
    <AuthRoute path="/frotas/editar/:id" component={Edicao} permission="reader" key="editar/:id" isPrivate exact />,
];
