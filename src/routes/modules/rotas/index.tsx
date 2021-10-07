import React from "react";

import AuthRoute from "routes/AuthRoute";

import Cadastro from "pages/modules/rotas/Cadastro";
// import Edicao from "pages/modules/rotas/Edicao";

export default [
    <AuthRoute path="/rotas/cadastrar" component={Cadastro} permission="reader" key="cadastrar" isPrivate exact />,
    // <AuthRoute path="/rotas/gerenciar/:id" component={Edicao} permission="reader" key="gerenciar/:id" isPrivate exact />,
];
